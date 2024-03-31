import { APPLICATION } from "../constants/application";

type ValidationRules = "isRequired" | "isEmail" | "minLen" | "maxLen" | "isPassword";

/**
 * Validation Service
 * @class
 * @description Service for validating user input - e.g. email, password
 *
 * @method validate - Validates the input based on the rules provided - rules are type of ValidationRules and are passed as an array
 * @param value - The value to be validated
 * @param rules - The rules to be applied to the value
 * @returns Promise - Resolves if the value is valid, rejects with an error message if the value is invalid - the error can be caught in a try-catch block
 */

export class ValidationService {

  // Curried functions for validation - first function takes the length and returns a function that takes the value to be validated
  private static minLen = (min: number) => (value: string) => {
    return value.length >= min;
  };

  private static maxLen = (max: number) => (value: string) => {
    return value.length <= max;
  };

  // Regular expressions for email and password validation
  private static isEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  private static isPassword = (value: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s\S]{8,}$/.test(value);
  };

  // Function to check if the value is not empty
  private static isRequired = (value: string) => {
    return value.trim().length > 0;
  };

  public static validate = (value: string, rules: ValidationRules[]) => {
    return new Promise((resolve, reject) => {
      for (const rule of rules) {
        switch (rule) {
          case "isRequired":
            if (!ValidationService.isRequired(value)) {
              return reject(new Error("Dieses Feld ist erforderlich"));
            }
            break;
          case "isEmail":
            if (!ValidationService.isEmail(value)) {
              return reject(new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein"));
            }
            break;
          case "minLen":
            if (!ValidationService.minLen(APPLICATION.PASSWORD_MIN_LEN)(value)) {
              return reject(
                new Error(
                  `Das Passwort muss mindestens ${APPLICATION.PASSWORD_MIN_LEN} Zeichen lang sein`
                )
              );
            }
            break;
          case "maxLen":
            if (!ValidationService.maxLen(APPLICATION.PASSWORD_MAX_LEN)(value)) {
              return reject(
                new Error(
                  `Das Passwort darf maximal ${APPLICATION.PASSWORD_MAX_LEN} Zeichen lang sein`
                )
              );
            }
            break;
          case "isPassword":
            if (!ValidationService.isPassword(value)) {
              return reject(
                new Error(
                  "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten"
                )
              );
            }
            break;
          default:
            break;
        }
      }
      resolve(true);
    });
  };
}
