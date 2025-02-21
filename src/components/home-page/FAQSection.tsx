
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Is FinsUp BD free to use?",
    answer: "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online.",
  },
  {
    question: "How do I check my credit score?",
    answer: "You can check your credit score by signing up on our platform and following the credit score check process.",
  },
  {
    question: "Is my data secure with FinsUp BD?",
    answer: "Yes, we use industry-standard security measures to protect your data and privacy.",
  },
  {
    question: "Can I track my loan application status?",
    answer: "Yes, you can track your loan application status through your account dashboard on our platform.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-green-900 lg:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-4"
          >
            <div className="flex items-center gap-3 text-green-700">
              <span className="text-2xl">❓</span>
              <p className="text-lg font-medium">Need further support?</p>
            </div>
            <button
              className="mt-2 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors duration-200"
              onClick={() => window.location.href = '/contact'}
            >
              <span>Contact Us</span>
              <span className="text-xl">↗</span>
            </button>
          </motion.div>
        </div>

        {/* FAQ List */}
        <div className="lg:w-1/2">
          <dl className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <dt>
                  <button
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full flex justify-between items-center p-5 text-left bg-green-50 hover:bg-green-100 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg font-semibold text-green-900">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-600" />
                    )}
                  </button>
                </dt>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.dd
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      id={`faq-answer-${index}`}
                      className="bg-white text-green-800 overflow-hidden"
                      role="region"
                    >
                      <div className="p-5 border-t border-green-50">
                        {faq.answer}
                      </div>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}