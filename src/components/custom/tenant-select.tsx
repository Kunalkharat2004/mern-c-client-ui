"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect, useCallback, useTransition } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import { Tenant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

const TenantSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [initializing, setInitializing] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3200";

  const fetchTenants = useCallback(
    async (query = "", limit = 5) => {
      setLoading(true);
      try {
        const url = query
          ? `${BACKEND_URL}/api/auth/tenant?q=${encodeURIComponent(
              query
            )}&page=1&limit=${limit}`
          : `${BACKEND_URL}/api/auth/tenant?page=1&limit=${limit}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch tenants");
        const result = await res.json();
        setTenants(result.data || []);
      } catch (err) {
        console.error(err);
        setTenants([]);
      } finally {
        setLoading(false);
      }
    },
    [BACKEND_URL]
  );

  const fetchTenantById = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/tenant/${id}`);
        const result = await res.json();
        console.log("fetchTenantById result:", result);
        return result.data || result.tenant || result;
      } catch (err) {
        console.error("Error fetching tenant by ID:", err);
        return null;
      }
    },
    [BACKEND_URL]
  );

  const debouncedFetch = useCallback(
    debounce((q: string) => fetchTenants(q, 20), 500),
    [fetchTenants]
  );

  // Initialize selection from URL or localStorage
  useEffect(() => {
    const id = searchParams.get("restaurantId");
    if (id) {
      // if a matching tenant in localStorage, use it immediately
      const saved = localStorage.getItem("selectedTenant");
      if (saved) {
        try {
          const parsed: Tenant = JSON.parse(saved);
          if (parsed.id === id) {
            setSelectedTenant(parsed);
            setInitializing(false);
            return;
          }
        } catch {}
      }
      // otherwise fetch from backend
      setLoading(true);
      fetchTenantById(id).then((tenant) => {
        if (tenant) {
          setSelectedTenant(tenant);
          localStorage.setItem("selectedTenant", JSON.stringify(tenant));
        } else {
          setSelectedTenant(null);
          localStorage.removeItem("selectedTenant");
        }
        setLoading(false);
        setInitializing(false);
      });
    } else {
      // No ID in URL: try to load from localStorage
      const saved = localStorage.getItem("selectedTenant");
      if (saved) {
        try {
          const parsed: Tenant = JSON.parse(saved);
          setSelectedTenant(parsed);
        } catch {
          setSelectedTenant(null);
        }
      }
      setInitializing(false);
    }
  }, [searchParams, fetchTenantById]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  useEffect(() => {
    if (searchQuery) debouncedFetch(searchQuery);
    else fetchTenants();
  }, [searchQuery, debouncedFetch, fetchTenants]);

  const handleSelect = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    localStorage.setItem("selectedTenant", JSON.stringify(tenant));
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("restaurantId", tenant.id);
      router.push(`/?${params.toString()}`);
    });
    setOpen(false);
    setSearchQuery("");
  };

  const getButtonContent = () => {
    if (initializing) {
      return "Select Restaurant...";
    }
    if (loading || isPending) {
      return (
        <>
          <Spinner />
          Loading…
        </>
      );
    }
    return selectedTenant?.name ?? "Select Restaurant...";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={initializing || isPending}
          className={cn(
            "w-[200px] justify-between",
            (initializing || isPending) && "opacity-50"
          )}
        >
          {getButtonContent()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search restaurant..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {loading ? (
              <CommandEmpty>
                <Spinner />
              </CommandEmpty>
            ) : tenants.length === 0 && searchQuery ? (
              <CommandEmpty>No results for “{searchQuery}”.</CommandEmpty>
            ) : tenants.length === 0 ? (
              <CommandEmpty>No restaurants available.</CommandEmpty>
            ) : null}
            <CommandGroup>
              {tenants.map((t) => (
                <CommandItem
                  key={t.id}
                  value={t.id}
                  onSelect={() => handleSelect(t)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTenant?.id === t.id
                        ? "opacity-100 text-primary"
                        : "opacity-0"
                    )}
                  />
                  {t.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TenantSelect;
