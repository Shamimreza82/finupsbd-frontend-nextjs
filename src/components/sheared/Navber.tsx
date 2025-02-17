'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Globe, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  {
    title: "Loans",
    items: ["Personal Loan", "Home Loan", "Education Loan", "Business Loan"],
  },
  {
    title: "Cards",
    items: ["Credit Cards", "Debit Cards", "Prepaid Cards"],
  },
  {
    title: "Other Products",
    items: ["Insurance", "Investment", "Savings Accounts"],
  },
  {
    title: "FinUps Islamic",
    items: ["Islamic Banking", "Shariah-Compliant Loans", "Zakat Calculator"],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Finups BD Logo"
            width={40}
            height={40}
            className="h-8 w-8"
          />
          <span className="text-2xl font-semibold">
            Finups <span className="text-green-600">bd</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <DropdownMenu key={item.title}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600 focus-visible:outline-none">
                {item.title} ▼
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {item.items.map((subItem) => (
                  <DropdownMenuItem key={subItem} asChild>
                    <Link href="#" className="cursor-pointer">
                      {subItem}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex gap-2">
            <Globe className="h-4 w-4" />
            Track Application
          </Button>

          <Button asChild>
            <Link href="/login" className="gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="ml-2 space-y-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem}
                          href="#"
                          className="block text-sm text-gray-700 hover:text-green-600"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Globe className="h-4 w-4" />
                  Track Application
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}