"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function EligibilityModal({ open, onOpenChange, loanType }: {open: any, onOpenChange: any, loanType: any}) {
  const [currentStep, setCurrentStep] = useState(1)

  // Example fields
  const [gender, setGender] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [profession, setProfession] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [loanTenure, setLoanTenure] = useState("")

  // Step 2 fields
  const [hasExistingLoan, setHasExistingLoan] = useState<string | null>(null)
  const [hasCreditCard, setHasCreditCard] = useState<string | null>(null)

  // Next step
  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step => send data to your server
      try {
        const body = {
          loanType,
          gender,
          dateOfBirth,
          profession,
          jobLocation,
          monthlyIncome,
          loanTenure,
          hasExistingLoan,
          hasCreditCard,
        }

        console.log(body)
        // const response = await fetch("http://localhost:4000/api/loans/eligibility", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(body),
        // })

        // if (!response.ok) {
        //   throw new Error(`Server error: ${response.status}`)
        // }

        // const data = await response.json()
        // console.log("Eligibility submission success:", data)
        // alert(`Submitted successfully! Server says: ${JSON.stringify(data)}`)

        // Close the modal
        onOpenChange(false)
      } catch (error) {
        console.error(error)
        alert("Error submitting eligibility data!")
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Find the best {loanType} for you
          </DialogTitle>
          <DialogDescription>
            {/* Steps indicator */}
            <div className="flex items-center space-x-4 mt-2">
              <div
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center",
                  currentStep >= 1 ? "bg-green-600 text-white" : "bg-gray-300"
                )}
              >
                1
              </div>
              <div
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center",
                  currentStep >= 2 ? "bg-green-600 text-white" : "bg-gray-300"
                )}
              >
                2
              </div>
              <div
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center",
                  currentStep >= 3 ? "bg-green-600 text-white" : "bg-gray-300"
                )}
              >
                3
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="gender">Gender*</Label>
              <select
                id="gender"
                className="block w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="dob">Date of Birth (DD/MM/YYYY)*</Label>
                <Input
                  id="dob"
                  placeholder="DD/MM/YYYY"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="profession">Your Profession*</Label>
                <select
                  id="profession"
                  className="block w-full"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                >
                  <option value="">Select Profession</option>
                  <option value="salaried">Salaried</option>
                  <option value="business">Business</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="location">Job Location*</Label>
                <select
                  id="location"
                  className="block w-full"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <Label htmlFor="income">Monthly Income (BDT)*</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="0"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tenure">Expected Loan Tenure (Month)*</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="0"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-4 mt-4">
            <div>
              <p>Do you have any Loan?</p>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasLoan"
                    value="yes"
                    checked={hasExistingLoan === "yes"}
                    onChange={() => setHasExistingLoan("yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasLoan"
                    value="no"
                    checked={hasExistingLoan === "no"}
                    onChange={() => setHasExistingLoan("no")}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div>
              <p>Do you have any Credit Card?</p>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasCard"
                    value="yes"
                    checked={hasCreditCard === "yes"}
                    onChange={() => setHasCreditCard("yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasCard"
                    value="no"
                    checked={hasCreditCard === "no"}
                    onChange={() => setHasCreditCard("no")}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
            <p><strong>Profession:</strong> {profession}</p>
            <p><strong>Job Location:</strong> {jobLocation}</p>
            <p><strong>Monthly Income (BDT):</strong> {monthlyIncome}</p>
            <p><strong>Expected Tenure:</strong> {loanTenure} months</p>
            <p><strong>Existing Loan:</strong> {hasExistingLoan || "N/A"}</p>
            <p><strong>Credit Card:</strong> {hasCreditCard || "N/A"}</p>
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-end">
          <Button variant="outline" onClick={handleBack}>
            {currentStep === 1 ? "Close" : "Back"}
          </Button>
          <Button onClick={handleNext}>
            {currentStep === 3 ? "Finish" : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
