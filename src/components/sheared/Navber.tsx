'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Finups BD Logo" className="h-8" />
        <span className="text-2xl font-semibold text-gray-800">Finups <span className="text-green-500">bd</span></span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        <div className="relative group">
          <button className="hover:text-blue-600">Loans ▼</button>
          {/* Dropdown */}
          <div className="absolute left-0 mt-2 hidden w-48 bg-white shadow-md rounded-md group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Personal Loan</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Home Loan</a>
          </div>
        </div>

        <div className="relative group">
          <button className="hover:text-blue-600">Cards ▼</button>
          <div className="absolute left-0 mt-2 hidden w-48 bg-white shadow-md rounded-md group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Credit Cards</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Debit Cards</a>
          </div>
        </div>

        <div className="relative group">
          <button className="hover:text-blue-600">Other Products ▼</button>
          <div className="absolute left-0 mt-2 hidden w-48 bg-white shadow-md rounded-md group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Insurance</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Investment</a>
          </div>
        </div>

        <div className="relative group">
          <button className="hover:text-blue-600">FinUps Islamic ▼</button>
          <div className="absolute left-0 mt-2 hidden w-48 bg-white shadow-md rounded-md group-hover:block">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Islamic Banking</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Shariah-Compliant Loans</a>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">
          🌐 Track Application
        </a>
        <Button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Sign in</Button>
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}