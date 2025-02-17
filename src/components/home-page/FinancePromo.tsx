'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FinancePromo() {
  return (
    <section className="bg-green-900 text-white py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2">
        <p className="text-orange-400 font-semibold mb-2">Promotion</p>
        <h2 className="text-4xl font-bold mb-4">
          Ready to Take Control of Your <span className="text-orange-500">Finances?</span>
        </h2>
        <p className="text-lg mb-4">
          Join thousands of Bangladeshis who are making smarter financial decisions.
        </p>
        <Link href="#" className="text-green-300 underline mb-4 inline-block">
          Terms and disclosures applied
        </Link>
        <div>
          <Link
            href="#"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition duration-300"
          >
            <span>Register Now</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <Image
          src="/finance-promo.png"
          alt="Financial Promo"
          width={400}
          height={400}
          className="drop-shadow-lg"
        />
      </div>
    </section>
  );
}