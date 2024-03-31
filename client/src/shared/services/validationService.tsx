import { APPLICATION } from "../constants/application";

type ValidationRules = "isRequired" | "isEmail" | "minLen" | "maxLen" | "isPassword";

export class ValidationService {
  private static minLen = (min: number) => (value: string) => {
    return value.length >= min;
  };

  private static maxLen = (max: number) => (value: string) => {
    return value.length <= max;
  };

  private static isEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  private static isPassword = (value: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s\S]{8,}$/.test(value);
  };

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
