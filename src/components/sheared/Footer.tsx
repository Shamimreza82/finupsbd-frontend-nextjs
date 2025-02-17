'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-green-500">FinUps BD</h2>
          <p className="mt-2 text-gray-400">
            Brief info about FinsUp BD and its mission to empower financial decisions in Bangladesh.
          </p>
          <div className="flex mt-4 space-x-4">
            <Link href="#"><Facebook className="w-6 h-6 text-white hover:text-green-500" /></Link>
            <Link href="#"><Twitter className="w-6 h-6 text-white hover:text-green-500" /></Link>
            <Link href="#"><Instagram className="w-6 h-6 text-white hover:text-green-500" /></Link>
            <Link href="#"><Linkedin className="w-6 h-6 text-white hover:text-green-500" /></Link>
            <Link href="#"><Youtube className="w-6 h-6 text-white hover:text-green-500" /></Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Explore</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-green-500">Cards</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-green-500">Loans</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-green-500">Investments</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-green-500">Accounts</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-green-500">Bima/Insurances</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-green-500">FinsUp Islamic</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="mt-2 text-gray-400">Sector 4, Uttara, Dhaka, Bangladesh</p>
          <p className="mt-2 flex items-center text-gray-400"><Phone className="w-5 h-5 mr-2" /> +8809697480635</p>
          <p className="mt-2 flex items-center text-gray-400"><Mail className="w-5 h-5 mr-2" /> info@finupsbd.com</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400">
        <p>&copy; 2024 <span className="text-green-500">Finups BD</span>. All Rights Reserved</p>
        <div className="flex justify-center space-x-6 mt-2">
          <Link href="#" className="hover:text-green-500">Terms & Conditions</Link>
          <Link href="#" className="hover:text-green-500">ADM Policy</Link>
          <Link href="#" className="hover:text-green-500">EMI Policy</Link>
          <Link href="#" className="hover:text-green-500">FAQs</Link>
        </div>
      </div>
    </footer>
  );
}
