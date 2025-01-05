import { Separator } from "../atoms/Separator";
import { ModeToggle } from "../molecules/ModeToggle";
import { Binary } from "lucide-react";

export function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Binary />
            <span className="text-xl font-semibold">Game of Life</span>
          </div>
          <nav>
            <div className="flex items-center space-x-4">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
      <Separator />
    </header>
  );
}
