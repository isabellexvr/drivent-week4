import { ApplicationError } from "@/protocols";

export function noVacancyError() {
  return {
    name: "NoVacancyError",
    message: "There are no vacancies left for booking on this room."
  };
}
