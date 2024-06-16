import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return (
      err.errors[0]?.message ??
      "An unknown error occurred. Please try again later."
    );
  } else if (isClerkAPIResponseError(err)) {
    return (
      err.errors[0]?.longMessage ??
      "An unknown error occurred. Please try again later."
    );
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return "An unknown error occurred. Please try again later.";
  }
}
