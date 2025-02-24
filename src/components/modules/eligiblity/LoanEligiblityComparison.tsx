"use client"

import {  useState } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"


// Format number to BDT format
const formatBDT = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount)
}

export default function LoanEligiblityComparison({submissionData}: {submissionData: any}) {
    const [loanAmount, setLoanAmount] = useState(500000)
    const [profitRate, setProfitRate] = useState(12)
    const [selectedBanks, setSelectedBanks] = useState<string[]>([])
    const [wishlist, setWishlist] = useState<number[]>([])
    const router = useRouter()


    // console.log({ loanAmount }, { profitRate }, { selectedBanks }, { wishlist })
    console.log(submissionData)

    const banks = [
        "Standard Chartered",
        "The City Bank",
        "Eastern Bank LTD",
        "Brac Bank",
        "Islami Bank Bangladesh",
        "Lanka Bangla Finance",
        "IDLC Finance",
        "Al Arafah Islamic Bank",
    ]

    const handleWishlist = (id: number) => {
        setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }


    const handelApplication = (ApplyId: string) =>{
            console.log(ApplyId)

            router.push(`/user/loan-application?applicationId=${ApplyId}`)
    }

    return (
        <div className="bg-[#F8F9FA]">
            <div className="flex flex-col container  mx-auto  md:flex-row gap-6 p-4 md:p-6 bg-[#F8F9FA]">
                {/* Filter Sidebar */}
                <div className="w-full md:w-64 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Filter</h2>
                        <button
                            className="text-sm text-muted-foreground hover:text-primary"
                            onClick={() => {
                                setLoanAmount(500000)
                                setProfitRate(12)
                                setSelectedBanks([])
                            }}
                        >
                            Reset
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Loan Amount</label>
                            <Slider
                                value={[loanAmount]}
                                onValueChange={(value) => setLoanAmount(value[0])}
                                max={500000}
                                step={1000}
                                className="w-full"
                            />
                            <input
                                type="number"
                                className="w-full rounded-md border px-3 py-2"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Profit Rate</label>
                            <Slider
                                value={[profitRate]}
                                onValueChange={(value) => setProfitRate(value[0])}
                                max={30}
                                min={5}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm">
                                <span>5%</span>
                                <span className="bg-primary text-primary-foreground px-2 py-1 rounded">{profitRate}%</span>
                                <span>30%</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bank</label>
                            <div className="space-y-2">
                                {banks.slice(0, 6).map((bank) => (
                                    <div key={bank} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={bank}
                                            checked={selectedBanks.includes(bank)}
                                            onCheckedChange={(checked) => {
                                                setSelectedBanks((prev) => (checked ? [...prev, bank] : prev.filter((item) => item !== bank)))
                                            }}
                                        />
                                        <label htmlFor={bank} className="text-sm leading-none">
                                            {bank}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button className="text-sm text-primary hover:underline">View More</button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-[#E8F8F0] text-primary border-transparent cursor-pointer">
                            Lowest Interest Rate
                        </Badge>
                        <Badge variant="outline" className="hover:bg-[#E8F8F0] hover:text-primary cursor-pointer">
                            Highest Interest Rate
                        </Badge>
                        <Badge variant="outline" className="hover:bg-[#E8F8F0] hover:text-primary cursor-pointer">
                            Highest Loan Amount
                        </Badge>
                        <Badge variant="outline" className="hover:bg-[#E8F8F0] hover:text-primary cursor-pointer">
                            Lowest Loan Amount
                        </Badge>
                    </div>

                    <div className="text-sm">We found 17 Personal Loans</div>

                    {/* Loan Cards */}
                    <div className="space-y-4">
                        {[1].map((index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1T5QxVZh0r9yLl8dQ136F8FxMh8T8e.png"
                                                        alt="Standard Chartered Bank Logo"
                                                        width={80}
                                                        height={80}
                                                        className="rounded"
                                                        priority
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold">Standard chartered Personal Loan</h3>
                                                        <div className="flex gap-2 mt-2">
                                                            <Badge variant="secondary" className="bg-[#E8F8F0] text-primary border-transparent">
                                                                100% Paperless Approval
                                                            </Badge>
                                                            <Badge variant="secondary" className="text-[#FF6634] bg-orange-50 border-transparent">
                                                                30% Cashback on Interest Rate
                                                            </Badge>
                                                        </div>
                                                    </div> 
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleWishlist(index)}
                                                    className={wishlist.includes(index) ? "text-primary" : ""}
                                                >
                                                    <Heart className="w-5 h-5" fill={wishlist.includes(index) ? "currentColor" : "none"} />
                                                </Button>
                                            </div>

                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Amount:</div>
                                                    <div className="font-semibold">BDT {formatBDT(500000)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Interest Rate:</div>
                                                    <div className="font-semibold">11.75%</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Period (Months):</div>
                                                    <div className="font-semibold">36 Months</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Monthly EMI:</div>
                                                    <div className="font-semibold">BDT {formatBDT(20000)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Processing Fee:</div>
                                                    <div className="font-semibold">2.00%</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Total Amount:</div>
                                                    <div className="font-semibold">BDT {formatBDT(520000)}</div>
                                                </div>
                                            </div>

                                            <Tabs defaultValue="features">
                                                <TabsList className="bg-transparent border-b h-auto p-0 gap-6">
                                                    <TabsTrigger
                                                        value="features"
                                                        className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                                                    >
                                                        Features
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="eligibility"
                                                        className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                                                    >
                                                        Eligibility
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="fees"
                                                        className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent"
                                                    >
                                                        Fees & Charges
                                                    </TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="features" className="space-y-2 mt-4">
                                                    <div className="font-medium">Features</div>
                                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                                        <li>Loan Amount:</li>
                                                        <li>
                                                            Minimum: BDT {formatBDT(50000)}-Maximum: BDT {formatBDT(2000000)}
                                                        </li>
                                                        <li>Loan Tenure:</li>
                                                        <li>Minimum 1 Year-Maximum 5 Years</li>
                                                    </ul>
                                                </TabsContent>
                                                <TabsContent value="eligibility" className="mt-4">
                                                    <div className="font-medium">Eligibility Criteria</div>
                                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                                        <li>Loan Amount:</li>
                                                        <li>
                                                            Minimum: BDT {formatBDT(50000)}-Maximum: BDT {formatBDT(2000000)}
                                                        </li>
                                                        <li>Loan Tenure:</li>
                                                        <li>Minimum 1 Year-Maximum 5 Years</li>
                                                    </ul>
                                                </TabsContent>
                                                <TabsContent value="fees" className="mt-4">
                                                    <div className="font-medium">Fees & Charges</div>
                                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                                        <li>Loan Amount:</li>
                                                        <li>
                                                            Minimum: BDT {formatBDT(50000)}-Maximum: BDT {formatBDT(2000000)}
                                                        </li>
                                                        <li>Loan Tenure:</li>
                                                        <li>Minimum 1 Year-Maximum 5 Years</li>
                                                    </ul>
                                                </TabsContent>
                                            </Tabs>
                                        </div>

                                        <div className="lg:w-64 space-y-4">
                                            <div className="p-4 bg-[#E8F8F0] rounded-lg">
                                                <div className="text-sm">Eligible Loan</div>
                                                <div className="text-xl font-bold">BDT {formatBDT(2000000)}</div>
                                            </div>
                                                <Button onClick={() => handelApplication("1")} className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
                                            <Button
                                                variant="outline"
                                                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                                            >
                                                Compare Now
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

