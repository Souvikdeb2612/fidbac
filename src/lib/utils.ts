import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function currency(value: string){
  if (value==='Dollar'){
    return '$'
  }
  if (value==='Euro'){
    return '€'
  }
  if (value==='Rupee'){
    return '₹'
  }
}