import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// lib/error-handling.ts
export function logError(error: unknown) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error monitoring service
    console.error('Production Error:', error)
  } else {
    console.error('Development Error:', error)
  }
}