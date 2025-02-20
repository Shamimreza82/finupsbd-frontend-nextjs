import { z } from "zod";

export const eligiblityValidationSchema = z.object({
  // Step 1
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" }),
  dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
  profession: z.enum(["SALARIED", "BUSINESS", "OTHERS"], { required_error: "Profession is required" }),
  jobLocation: z.enum(["DHAKA", "CHITTAGONG", "OTHER"], { required_error: "Location is required" }),
  monthlyIncome: z.number().min(30000, "Income must be at least ৳ 30,000"),
  loanTenure: z.number().min(36, "Minimum tenure is 36 month").max(60, "Maximum tenure is 60 months"),

  // Step 2
  hasExistingLoan: z.boolean(),
  numberOfLoans: z.number().optional(),
  loanType: z.string().optional(),
  outstandingAmount: z.number().optional(),
  emiAmount: z.number().optional(),
  interestRate: z.number().optional(),
  
  hasCreditCard: z.boolean(),
  numberOfCards: z.number().optional(),
  cardLimit: z.number().optional(),
  cardType: z.string().optional(),

  // Step 3
  email: z.string().email("Invalid email address"),
  name: z.string(),
  phone: z.string()
})
