// EnhancedFinancialToolsSection.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, BarChart, GraduationCap, Target } from "lucide-react";

export default function FinancialToolsSection() {
  const toolsData = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Financial Product Comparison",
      description: "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
      tags: ["Loans", "Credit Cards", "Insurance"]
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Personalized Recommendations",
      description: "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
      tags: ["Custom Analysis", "Best Matches", "Risk Assessment"]
    },
    {
      icon: <BarChart className="h-8 w-8 text-purple-600" />,
      title: "Credit Score Tracking",
      description: "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
      tags: ["Score Updates", "Credit Report", "Improvement Tips"]
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-amber-600" />,
      title: "Educational Resources",
      description: "Easily compare loans, credit cards, and insurance products to find the best deals tailored to your needs.",
      tags: ["Articles", "Videos", "Calculators"]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Services Header with Enhanced Styling */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <Badge 
            variant="outline" 
            className="mb-2 px-4 py-1 text-green-600 font-medium border-green-500"
          >
            Our Services
          </Badge>
          <div className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-green-500"></div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mt-6">Smart Financial Tools for You</h2>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto">Discover the perfect financial solutions designed to help you build wealth and secure your future.</p>
      </div>

      {/* View Toggle Tabs */}
      <Tabs defaultValue="grid" className="mb-8">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>

        {/* Grid View Content */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolsData.map((tool, index) => (
              <Card key={index} className="bg-gray-50 hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">{tool.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 group-hover:text-green-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-green-600 group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* List View Content */}
        <TabsContent value="list">
          <div className="space-y-4">
            {toolsData.map((tool, index) => (
              <Card key={index} className="bg-gray-50 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">{tool.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{tool.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* CTA Section */}
      <div className="mt-12 text-center">
        <Button className="bg-green-600 hover:bg-green-700">
          Explore All Financial Tools
        </Button>
      </div>
    </div>
  );
}