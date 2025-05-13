import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomNumBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
