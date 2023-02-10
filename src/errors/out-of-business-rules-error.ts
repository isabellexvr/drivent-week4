import { ApplicationError } from "@/protocols";

export function outOtBusinessRulesError(): ApplicationError {
  return {
    name: "OutOfBusinessRulesError",
    message: "You were forbidden to continue due to business rules non-compliance."
  };
}
