import twMergeIconifyIcon from "@achamaro/tailwindcss-iconify-icon/tailwind-merge-plugin";
import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge(twMergeIconifyIcon());

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
