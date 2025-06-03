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
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import { Tenant } from "@/lib/types";

const TenantSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Use NEXT_PUBLIC_ for client-side environment variables
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3200";

  // Function to fetch tenants with optional search query and limit
  const fetchTenants = useCallback(
    async (query = "", limit = 5) => {
      setLoading(true);
      try {
        const url = query
          ? `${BACKEND_URL}/api/auth/tenant?q=${encodeURIComponent(
              query
            )}&page=1&limit=${limit}`
          : `${BACKEND_URL}/api/auth/tenant?page=1&limit=${limit}`;

        const data = await fetch(url, {
            next: { revalidate: 300 }, // Revalidate every 5 minutes
        });

        if (!data.ok) {
          throw new Error("Failed to fetch tenants data");
        }
        const result = await data.json();
        setTenants(result.data);
      } catch (error) {
        console.error("Error fetching tenants:", error);
        setTenants([]);
      } finally {
        setLoading(false);
      }
    },
    [BACKEND_URL]
    );
    
    console.log("Tenants fetched:", tenants); // Debugging log to see fetched tenants

  // Debounced version of fetchTenants for search input
  // Fetch more results for search (e.g., limit=20 or higher, depending on how many you want to display for search)
  const debouncedFetchTenants = useCallback(
    debounce((query: string) => fetchTenants(query, 20), 500),
    [fetchTenants]
  );

  // Effect for initial load (when component mounts)
  useEffect(() => {
    fetchTenants("", 5); // Load initial 5 tenants
  }, [fetchTenants]);

  // Effect for handling search query changes
  useEffect(() => {
    if (searchQuery) {
      debouncedFetchTenants(searchQuery);
    } else {
      // If search query is cleared, re-fetch initial 5
      fetchTenants("", 5);
    }
  }, [searchQuery, debouncedFetchTenants, fetchTenants]);

  // Optional: Function to fetch a single tenant by ID (if additional details are needed after selection)
  // You might call this if `selectedTenant` needs more properties than what's in the initial list.
//   const fetchTenantById = useCallback(
//     async (id: string) => {
//       try {
//         const data = await fetch(`${BACKEND_URL}/api/auth/tenant/${id}`, {
//           cache: "no-store",
//         });
//         if (!data.ok) {
//           throw new Error(`Failed to fetch tenant with ID: ${id}`);
//         }
//         const tenant = await data.json();
//         console.log("Fetched tenant by ID:", tenant);
//         // If needed, update selectedTenant with the full data from this specific fetch
//         // setSelectedTenant(tenant.data);
//       } catch (error) {
//         console.error("Error fetching tenant by ID:", error);
//       }
//     },
//     [BACKEND_URL]
//   );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedTenant ? selectedTenant.name : "Select Restaurant..."}
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
                <Spinner /> {/* Display spinner while loading */}
              </CommandEmpty>
            ) : tenants.length === 0 && searchQuery ? (
              <CommandEmpty>No results found for `{searchQuery}`.</CommandEmpty>
            ) : tenants.length === 0 && !searchQuery ? (
              <CommandEmpty>No restaurants available.</CommandEmpty>
            ) : null}

            <CommandGroup>
              {tenants.map((tenant) => (
                <CommandItem
                  key={tenant.id}
                  value={tenant.id}
                  onSelect={() => {
                    setSelectedTenant(tenant);
                    // fetchTenantById(tenant.id); // Optional: fetch full details
                    setOpen(false); // Close popover
                    setSearchQuery(""); // Clear search query after selection
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTenant?.id === tenant.id
                        ? "opacity-100 text-primary"
                        : "opacity-0"
                    )}
                  />
                  {tenant.name}
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
