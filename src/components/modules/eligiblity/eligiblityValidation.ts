import { z } from "zod";

export const eligiblityValidationSchema = z.object({
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  profession: z.enum(["SALARIED", "BUSINESS", "OTHERS"], {
    required_error: "Profession is required",
  }),
  jobLocation: z.enum(["DHAKA", "CHITTAGONG", "OTHER"], {
    required_error: "Job location is required",
  }),
  monthlyIncome: z.number().min(1, "Monthly income is required"),
  loanTenure: z.number().min(1, "Loan tenure is required"),
  hasExistingLoan: z.boolean(),
  hasCreditCard: z.boolean(),
  numberOfLoans: z.number().optional(),
  loanType: z.string().optional(),
  outstandingAmount: z.number().optional(),
  emiAmount: z.number().optional(),
  interestRate: z.number().optional(),
  numberOfCards: z.number().optional(),
  cardLimit: z.number().optional(),
  cardType: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})