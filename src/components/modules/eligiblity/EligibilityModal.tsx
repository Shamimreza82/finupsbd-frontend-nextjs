"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { eligiblityValidationSchema } from "./eligiblityValidation"
import { useRouter } from "next/navigation"

// Update the Zod schema to include all required fields


type EligibilityFormData = z.infer<typeof eligiblityValidationSchema>

export function EligibilityModal({
  open,
  onOpenChange,
  loanType,
}: {
  open: boolean
  onOpenChange: (val: boolean) => void
  loanType: string
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligiblityValidationSchema),
    defaultValues: {
      hasExistingLoan: false,
      hasCreditCard: false,
    },
  })


  const router = useRouter()

  const handleNext = async () => {
    let isValid = false
    switch (currentStep) {
      case 1:
        isValid = await trigger([
          "gender",
          "dateOfBirth",
          "profession",
          "jobLocation",
          "monthlyIncome",
          "loanTenure"
        ], { shouldFocus: true })
        break
      case 2:
        const fields = ["hasExistingLoan", "hasCreditCard"]
        if (watch("hasExistingLoan")) fields.push("numberOfLoans", "loanType", "outstandingAmount", "emiAmount", "interestRate")
        if (watch("hasCreditCard")) fields.push("numberOfCards", "cardLimit", "cardType")
        isValid = await trigger(fields as any, { shouldFocus: true })
        break
      case 3:
        isValid = await trigger(["name", "email"], { shouldFocus: true })
        break
    }
    if (isValid) setCurrentStep(prev => prev + 1)
  }

  const onSubmit = async (data: EligibilityFormData) => {
    setIsSubmitting(true)

    try {
      const submissionData = {
        ...data,
        dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
        loanType,
      }
      console.log(submissionData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast.success("Application submitted successfully!")
      sessionStorage.setItem('eligibilityData', JSON.stringify(submissionData));
      router.push('/eligiblity');

      onOpenChange(false)
      setCurrentStep(1)
      reset()

    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => currentStep > 1 ? setCurrentStep(prev => prev - 1) : onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Find the best {loanType} for you</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 mt-4">
              <Progress value={(currentStep / 3) * 100} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStep} of 3</span>
                <span>{loanType} Application</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1 - Personal Information */}
          {currentStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    onValueChange={v => setValue("gender", v as any)}
                    value={watch("gender")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Your Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <div className="text-sm text-red-500">{errors.gender.message}</div>}
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          errors.dateOfBirth && "border-red-500",
                          !watch("dateOfBirth") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch("dateOfBirth") ? (
                          format(watch("dateOfBirth"), "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={watch("dateOfBirth")}
                        onSelect={(date) => {
                          if (date) {
                            setValue("dateOfBirth", date)
                            trigger("dateOfBirth")
                            setCalendarOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.dateOfBirth && <div className="text-sm text-red-500">{errors.dateOfBirth.message}</div>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profession</Label>
                  <Select
                    onValueChange={v => setValue("profession", v as any)}
                    value={watch("profession")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Profession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SALARIED">Salaried</SelectItem>
                      <SelectItem value="BUSINESS">Business</SelectItem>
                      <SelectItem value="OTHERS">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.profession && <div className="text-sm text-red-500">{errors.profession.message}</div>}
                </div>

                <div className="space-y-2">
                  <Label>Job Location</Label>
                  <Select
                    onValueChange={v => setValue("jobLocation", v as any)}
                    value={watch("jobLocation")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DHAKA">Dhaka</SelectItem>
                      <SelectItem value="CHITTAGONG">Chittagong</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.jobLocation && <div className="text-sm text-red-500">{errors.jobLocation.message}</div>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Income (BDT)</Label>
                  <Input
                    type="number"
                    placeholder="00"
                    {...register("monthlyIncome", { valueAsNumber: true })}
                    onChange={e => setValue("monthlyIncome", Number(e.target.value))}
                  />
                  {errors.monthlyIncome && <div className="text-sm text-red-500">{errors.monthlyIncome.message}</div>}
                </div>

                <div className="space-y-2">
                  <Label>Loan Tenure (Months)</Label>
                  <Input
                    type="number"
                    placeholder="00"
                    {...register("loanTenure", { valueAsNumber: true })}
                    onChange={e => setValue("loanTenure", Number(e.target.value))}
                  />
                  {errors.loanTenure && <div className="text-sm text-red-500">{errors.loanTenure.message}</div>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Financial Information */}
          {currentStep === 2 && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-4">
                  <RadioGroup
                    value={watch("hasExistingLoan")?.toString()}
                    onValueChange={v => setValue("hasExistingLoan", v === "true")}
                  >
                    <Label className="text-base">Do you have any existing loan?</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="loan-yes" />
                        <Label htmlFor="loan-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="loan-no" />
                        <Label htmlFor="loan-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {watch("hasExistingLoan") && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Number of Loan*</Label>
                        <Input
                          type="number"
                          {...register("numberOfLoans", { valueAsNumber: true })}
                        />
                        {errors.numberOfLoans && <div className="text-sm text-red-500">{errors.numberOfLoans.message}</div>}
                      </div>
                      <div className="space-y-2">
                        <Label>Loan Type*</Label>
                        <Select
                          onValueChange={v => setValue("loanType", v)}
                          value={watch("loanType")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Loan</SelectItem>
                            <SelectItem value="home">Home Loan</SelectItem>
                            <SelectItem value="car">Car Loan</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.loanType && <div className="text-sm text-red-500">{errors.loanType.message}</div>}
                      </div>
                      <div className="space-y-2">
                        <Label>Loan Outstanding*</Label>
                        <Input
                          type="number"
                          {...register("outstandingAmount", { valueAsNumber: true })}
                        />
                        {errors.outstandingAmount && <div className="text-sm text-red-500">{errors.outstandingAmount.message}</div>}
                      </div>
                      <div className="space-y-2">
                        <Label>EMI Amount (BDT)*</Label>
                        <Input
                          type="number"
                          {...register("emiAmount", { valueAsNumber: true })}
                        />
                        {errors.emiAmount && <div className="text-sm text-red-500">{errors.emiAmount.message}</div>}
                      </div>
                      <div className="space-y-2">
                        <Label>Interest Rate*</Label>
                        <Input
                          type="number"
                          step="0.1"
                          {...register("interestRate", { valueAsNumber: true })}
                        />
                        {errors.interestRate && <div className="text-sm text-red-500">{errors.interestRate.message}</div>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <RadioGroup
                    value={watch("hasCreditCard")?.toString()}
                    onValueChange={v => setValue("hasCreditCard", v === "true")}
                  >
                    <Label className="text-base">Do you have any Credit Card?</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="card-yes" />
                        <Label htmlFor="card-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="card-no" />
                        <Label htmlFor="card-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {watch("hasCreditCard") && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Number of Cards*</Label>
                        <Input
                          type="number"
                          {...register("numberOfCards", { valueAsNumber: true })}
                        />
                        {errors.numberOfCards && <div className="text-sm text-red-500">{errors.numberOfCards.message}</div>}
                      </div>
                      <div className="space-y-2">
                        <Label>Card Limit (BDT)*</Label>
                        <Input
                          type="number"
                          {...register("cardLimit", { valueAsNumber: true })}
                        />
                        {errors.cardLimit && <div className="text-sm text-red-500">{errors.cardLimit.message}</div>}
                      </div>
                      <div className="space-y-2">
                        <Label>Card Type*</Label>
                        <Select
                          onValueChange={v => setValue("cardType", v)}
                          value={watch("cardType")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visa">Visa</SelectItem>
                            <SelectItem value="mastercard">Mastercard</SelectItem>
                            <SelectItem value="amex">American Express</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.cardType && <div className="text-sm text-red-500">{errors.cardType.message}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Email & Review */}
          {currentStep === 3 && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && <div className="text-sm text-red-500">{errors.name.message}</div>}
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                />
                {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              type="button"
              disabled={isSubmitting}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              type={currentStep === 3 ? "submit" : "button"}
              onClick={currentStep === 3 ? undefined : handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </div>
              ) : currentStep === 3 ? "Submit Application" : "Next"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}