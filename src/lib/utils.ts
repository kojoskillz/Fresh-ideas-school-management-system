import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError(
  error: unknown,
  fallback = {
    title: "Something went wrong",
    description: "Please try again laster",
  }
) {
  console.error("API Error:", error);

  const title = fallback.title;

  let description = fallback.description;

  if (error instanceof AxiosError) {
    description = error.response?.data?.message || description;
  }

  toast.error(title, {
    description: description,
  });
}

export const validatePhone = (value: string) => {
  if (!value) return false;

  if (
    (/^234\d{10}$/.test(value) && value.length === 13) ||
    (/^\+234\d{10}$/.test(value) && value.length === 14) ||
    (/^(?!234|(\+234))\d{11}$/.test(value) && value.length === 11)
  ) {
    return value;
  }
};

export function getInitial(name: string) {
  const displayName = name ? name : "N/A";

  return displayName.split(" ").length > 1
    ? displayName.split(" ")[0][0] + displayName.split(" ")[1][0]
    : displayName.slice(0, 3);
}
