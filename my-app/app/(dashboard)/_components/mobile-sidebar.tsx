import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacit-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 bg-white" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
