"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowUp, ArrowDown, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import { useUser } from "@/context/UserContext";


const faqs = [
    {
        step: 1,
        question: "Check Your Credit Score for Free",
        answer: "Sign up and get instant access to your credit score and insights on improving it.",
    },
    {
        step: 2,
        question: "Compare the Best Financial Products",
        answer: "You can check your credit score by signing up on our platform and following the credit score check process.",
    },
    {
        step: 3,
        question: "Apply and Track Your Applications",
        answer: "Yes, we use industry-standard security measures to protect your data and privacy.",
    },
];

export default function HowItWorksWithSignup() {

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const {user} = useUser()

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-16 items-center">
            {/* Left Column - How It Works */}
            <div className="flex-1">
                <div className="inline-block text-green-700 font-medium mb-4">How It Works</div>

                <h2 className="text-3xl font-bold text-gray-800 mb-10 max-w-md">
                    Simplifying Your Financial Decisions in 3 Easy Steps
                </h2>

                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="">
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
                                                <span className="bg-green-300 px-3 py-2 rounded-full">{faq.step}</span>  {faq.question}
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

               { user ? null : <Link href='/register'>
                    <Button className="mt-12 bg-green-600 hover:bg-green-700 transition-colors">
                        Get Started Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>}
            </div>

            {/* Right Column - Signup Form */}
            <div className="flex-1 bg-gray-50 p-8 rounded-xl">
                <Card className="w-full max-w-md mx-auto overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Create your FinApp account</h3>
                            <p className="text-sm text-gray-600">
                                Already have an account? <span className="text-green-600 font-medium">Log in</span>
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-700 mb-2">You are registering as:</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 border rounded-md py-2 px-4 bg-green-50 border-green-500">
                                    <Checkbox id="personal" className="text-green-600" defaultChecked />
                                    <label htmlFor="personal" className="text-sm font-medium">Personal</label>
                                </div>
                                <div className="flex items-center gap-2 border rounded-md py-2 px-4">
                                    <Checkbox id="business" />
                                    <label htmlFor="business" className="text-sm font-medium">Business</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600 block mb-1">Full name</label>
                                <Input
                                    placeholder="What's your full name"
                                    className="border-gray-300 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 block mb-1">Email address</label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="border-gray-300 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 block mb-1">Password</label>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="border-gray-300 focus:border-green-500 pr-10"
                                    />
                                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full mt-6 bg-green-500 hover:bg-green-600">
                            Register
                        </Button>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500 mb-4">OR</p>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" size="icon" className="rounded-full border-gray-300 h-10 w-10">
                                    <img src="/api/placeholder/24/24" alt="Google logo" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full border-gray-300 h-10 w-10">
                                    <img src="/api/placeholder/24/24" alt="Facebook logo" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full border-gray-300 h-10 w-10">
                                    <img src="/api/placeholder/24/24" alt="Apple logo" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}