"use client"
import React, { useState } from "react"
// (Below imports assume you have these shadcn (or Radix-based) components set up in a non-Next.js project)
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { EligibilityModal } from "@/components/modules/eligiblity/EligibilityModal"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Terminal } from "lucide-react"

function LoanPage() {
    // Track the selected loan type
    const [loanType, setLoanType] = useState("")
    const [openEligibility, setOpenEligibility] = useState(false)
    const [error, setError] = useState(false)

    console.log(loanType)
    // Send data to backend (Compare Loan)
    async function handleCompareLoan() {
        try {
            const response = await fetch("http://localhost:4000/api/loans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ loanType }),
            })

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`)
            }

            const data = await response.json()
            console.log("Compare Loan response:", data)
            alert(`Compare Loan success! Server says: ${JSON.stringify(data)}`)
        } catch (error) {
            console.error(error)
            alert("Error while comparing loan.")
        }
    }

    // Send data to backend (Check Eligibility)
    async function handleCheckEligibility() {
        if (loanType == "") {
            setError(true)
            return toast.error("Select any loan")
        }
        setOpenEligibility(true)
    }

    return (
        <div className="p-6">
            {/* Outer container */}
            <div className="bg-green-100 flex justify-center items-center py-11">
                <Tabs defaultValue="loans" >
                    {/* Tabs List */}
                    <div className="flex justify-center">
                        <TabsList  className="md:space-x-12">
                        <TabsTrigger value="loans">Loans</TabsTrigger>
                        <TabsTrigger value="cards">Cards</TabsTrigger>
                        <TabsTrigger value="investment">Investment</TabsTrigger>
                        <TabsTrigger value="insurance">Bima/Insurance</TabsTrigger>
                    </TabsList>
                    </div>

                    {/* Loans tab content */}
                    <div className="bg-gray-50 md:px-40 py-4 -m-4 pt-8 rounded-lg">
                        <TabsContent value="loans">
                            {error ? <Alert variant="destructive" className="mb-4">
                                <Terminal className="h-4 w-4 " />
                                <AlertDescription>
                                    Please Select any loan option !!
                                </AlertDescription>
                            </Alert> : null}
                            <div className="flex flex-col space-y-4">
                                {/* Radio buttons for loan types */}
                                <RadioGroup
                                    value={loanType}
                                    onValueChange={setLoanType}   // track changes
                                    className="flex flex-row items-center space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="PEOSONAL_LOAN" value="PEOSONAL_LOAN" />
                                        <Label htmlFor="personal-loan">Personal Loan</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="HOME_LOAN" value="HOME_LOAN" />
                                        <Label htmlFor="home-loan">Home Loan</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="CAR_LOAN" value="CAR_LOAN" />
                                        <Label htmlFor="car-loan">Car Loan</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="SME_LOAN" value="SME_LOAN" />
                                        <Label htmlFor="sme-loan">SME Loan</Label>
                                    </div>
                                </RadioGroup>

                                {/* Action buttons */}
                                <div className="flex space-x-4">
                                    <Button
                                        variant="default"
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={handleCompareLoan}
                                    >
                                        Compare Loan
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-green-600 text-green-600"
                                        onClick={handleCheckEligibility}
                                    >
                                        Check Eligibility
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Other tabs: Cards, Investment, Bima/Insurance */}
                        <TabsContent value="cards">
                            <div className="flex flex-col space-y-4">
                                {/* Radio buttons for loan types */}
                                <RadioGroup
                                    value={loanType}
                                    onValueChange={setLoanType}   // track changes
                                    className="flex flex-row items-center space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="PEOSONAL_LOAN" value="CREDIT_CARDS" />
                                        <Label htmlFor="personal-loan">Credit Card</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="HOME_LOAN" value="DEBIT_CARDS" />
                                        <Label htmlFor="home-loan">Debit Cards</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id="CAR_LOAN" value="PREPAID_CARDS" />
                                        <Label htmlFor="car-loan">Prepaid Cards</Label>
                                    </div>
                                </RadioGroup>

                                {/* Action buttons */}
                                <div className="flex space-x-4">
                                    <Button
                                        variant="default"
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={handleCompareLoan}
                                    >
                                        Compare Loan
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-green-600 text-green-600"
                                        onClick={handleCheckEligibility}
                                    >
                                        Check Eligibility
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="investment">
                            <div>Content for Investment...</div>
                        </TabsContent>
                        <TabsContent value="insurance">
                            <div>Content for Bima/Insurance...</div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <EligibilityModal
                open={openEligibility}
                onOpenChange={setOpenEligibility} // pass setState so the modal can close itself
                loanType={loanType}
            />
        </div>
    )
}

export default LoanPage
