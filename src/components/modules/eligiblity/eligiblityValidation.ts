import { z } from "zod"

export const formSchema = z.object({
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select a date of birth.",
  }),
  profession: z.string({
    required_error: "Please select a profession.",
  }),
  // Only relevant for business owners; left optional
  businessOwnerType: z.string().optional(),
  businessType: z.string().optional(),
  sharePortion: z
    .string()
    .optional()
    .refine(
      (val) => {
        // If user is a business owner, sharePortion should not be empty
        // But to keep it simple, we only do numeric validation if it's present
        if (val === undefined || val === "") {
          return true // no strict check
        }
        const num = parseFloat(val)
        return !isNaN(num) && num >= 0 && num <= 100
      },
      { message: "Share portion must be between 0% and 100%" }
    ),
  tradeLicenseAge: z.string().optional(),
  monthlyIncome: z
    .string({
      required_error: "Please enter your monthly income.",
    })
    .min(1, { message: "Monthly income must be greater than 0." }),
  loanTenure: z
    .string({
      required_error: "Please enter the loan tenure.",
    })
    .min(1, { message: "Loan tenure must be greater than 0." }),
  hasLoan: z.string().optional(),
  numberOfLoans: z.string().optional(),
  loanType: z.string().optional(),
  hasCreditCard: z.string().optional(),
  numberOfCards: z.string().optional(),
  cardType: z.string().optional(),
  hasRentalIncome: z.string().optional(),
  rentalArea: z.string().optional(),
  rentalIncome: z.string().optional(),

  // Contact Info
  name: z.string({
    required_error: "Please enter your name.",
  }),
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  phone: z.string({
    required_error: "Please enter your phone number.",
  }),
  termsAccepted: z
    .boolean({
      required_error: "You must accept the terms and conditions.",
    })
    .refine((value) => value === true, {
      message: "You must accept the terms and conditions.",
    }),
})
