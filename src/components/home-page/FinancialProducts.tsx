import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, CreditCard, DollarSign, Heart, Car, Building, Home, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinancialProducts() {
    const products = [
        {
            icon: <CreditCard className="h-6 w-6" />,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "Credit Cards",
            description: "From 50+ Options, Choose a card matching your lifestyle & needs",
            badge: "Popular",
            badgeVariant: "bg-amber-100 text-amber-800",
            buttonColor: "text-blue-600 hover:text-blue-700"
        },
        {
            icon: <DollarSign className="h-6 w-6" />,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "Personal Loans",
            description: "From 50+ Options, Choose a card matching your lifestyle & needs",
            badge: "Low Interest",
            badgeVariant: "bg-green-100 text-green-800",
            buttonColor: "text-green-600 hover:text-green-700"
        },
        {
            icon: <Heart className="h-6 w-6" />,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            title: "Life Insurance",
            description: "From 50+ Options, Choose a card matching your lifestyle & needs",
            badge: "Family",
            badgeVariant: "bg-red-100 text-red-800",
            buttonColor: "text-red-600 hover:text-red-700"
        },
        {
            icon: <Car className="h-6 w-6" />,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            title: "Car Insurance",
            description: "From 50+ Options, Choose a card matching your lifestyle & needs",
            badge: "Savings",
            badgeVariant: "bg-yellow-100 text-yellow-800",
            buttonColor: "text-yellow-600 hover:text-yellow-700"
        },
        {
            icon: <Building className="h-6 w-6" />,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "SME Loan",
            description: "From 50+ Options, Choose a card matching your lifestyle & needs",
            badge: "Business",
            badgeVariant: "bg-purple-100 text-purple-800",
            buttonColor: "text-purple-600 hover:text-purple-700"
        },
        {
            icon: <Home className="h-6 w-6" />,
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600",
            title: "Home Loan",
            description: "From 50+ Options, Choose a card matching your lifestyle & needs",
            badge: "Low EMI",
            badgeVariant: "bg-teal-100 text-teal-800",
            buttonColor: "text-teal-600 hover:text-teal-700"
        },
    ];

    return (
        <TooltipProvider>
            <div className="bg-[#FFFCF5]">
                <div className="w-full max-w-7xl mx-auto px-4 py-16 ">
                    {/* Enhanced Header Section */}
                    <div className="text-center mb-12">
                        <div className="inline-block relative mb-2">
                            <Badge
                                variant="outline"
                                className="mb-2 px-4 py-1 text-green-600 font-medium border-green-500"
                            >
                                Featured Products
                            </Badge>
                            <div className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 border-green-500"></div>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-3">Popular Financial Products</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Compare and choose from our curated selection of financial products tailored to your needs</p>
                    </div>

                    {/* Enhanced Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <Card key={index} className="border border-gray-200 bg-white group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                <div className="absolute top-3 right-3">
                                    <Badge className={cn("font-medium", product.badgeVariant)}>
                                        {product.badge}
                                    </Badge>
                                </div>

                                <CardContent className="p-6 pt-8">
                                    <div className={cn("p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6", product.iconBg)}>
                                        <div className={product.iconColor}>
                                            {product.icon}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                                    <Info className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-64">Compare {product.title.toLowerCase()} from top providers with exclusive online deals</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>

                                    <p className="text-gray-600 text-sm">{product.description}</p>
                                </CardContent>

                                <CardFooter className="p-6 pt-2 flex justify-between items-center border-t border-gray-100 mt-4">
                                    <div className="text-xs text-gray-500">50+ options available</div>
                                    <Button
                                        variant="ghost"
                                        className={cn("font-medium p-0 h-auto flex items-center gap-1 group-hover:underline", product.buttonColor)}
                                    >
                                        Compare Now
                                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* See All Products Button */}
                    <div className="mt-12 text-center">
                        <Button className="bg-green-600 hover:bg-green-700 px-6 py-2">
                            View All Financial Products
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}