'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Globe, LogIn, LogOut, Package, Bookmark, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/AuthService";
import { protechedRoute } from "@/contants";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "./navberConstant";
import { TUser } from "@/types/user";





export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const router = useRouter()
  const { user, setIsLoading } = useUser()


useEffect(() => {
  setIsLoading(true)
}, [])


  const handleLogOut = () => {
    logout()
    setIsLoading(true)
    if (protechedRoute.some(route => pathname.match(route))) {
      router.push('/')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-12">
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
          {/* dextop navber */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setHoveredMenu(item.title)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    {item.title}
                    {item.items && (
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.items && (
                    <div className={`absolute left-0 top-full w-48 bg-white border border-gray-100 shadow-lg rounded-lg transition-all duration-300 origin-top
                      ${hoveredMenu === item.title ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-green-50 transition-colors duration-200 group/subitem"
                        >
                          {subItem.icon && (
                            <subItem.icon className="w-5 h-5 text-green-600 group-hover/subitem:text-green-700" />
                          )}
                          <div>
                            <span className="block text-sm">{subItem.name}</span>
                            {subItem.description && (
                              <span className="block text-xs text-gray-500 mt-0.5">
                                {subItem.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex gap-2" asChild>
              <Link href="/track-application">
                <Globe className="h-4 w-4" />
                Track Application
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center justify-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    <h2 className="font-bold">{user.name}</h2>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" />
                    My Application
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Saved Products
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href='/user/profile'>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer bg-red-600 text-white"
                    onClick={handleLogOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {navItems.map((item) => (
                    <div key={item.title} className="space-y-2">
                      <Link
                        href={item.href}
                        className="font-medium text-gray-900 hover:text-green-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                      <div className="ml-2 space-y-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-gray-700 hover:text-green-600"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 gap-2" asChild>
                    <Link href="/track-application">
                      <Globe className="h-4 w-4" />
                      Track Application
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}