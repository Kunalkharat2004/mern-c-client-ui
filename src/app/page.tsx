import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <h1>Welcome to Next.js</h1>
      <Button variant="outline">Button</Button>
      <div className="w-96">
        <Input type="email" placeholder="Email"/>
        <Input type="password" placeholder="Password"/>
      </div>
    </>
  );
}
