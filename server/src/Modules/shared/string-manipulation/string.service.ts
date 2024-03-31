import { Injectable } from "@nestjs/common";
import exp from "constants";

@Injectable()
export class StringService {
    /**
     * @description - Capitalizes the first letter of a string
     * @param {string} str - The string to capitalize
     * @returns {string} - The capitalized string
     */
    capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * @description - Capitalizes the first letter of each word in a string
     * @param {string} str - The string to capitalize
     * @returns {string} - The capitalized string
     */
    capitalizeWords(str: string): string {
        return str
            .split(" ")
            .map((word) => this.capitalize(word))
            .join(" ");
    }

    /**
     * @description - Converts a string to lowercase
     * @param {string} str - The string to convert
     * @returns {string} - The lowercase string
     */
    trim(str: string): string {
        return str.trim();
    }

    /**
     * @description - Converts a string to lowercase
     * @param {string} str - The string to convert
     * @returns {string} - The lowercase string
     */
    toLowerCase(str: string): string {
        return str.toLowerCase();
    }

    /**
     * @description - Converts a string to uppercase
     * @param {string} str - The string to convert
     * @returns {string} - The uppercase string
     */
    toUpperCase(str: string): string {
        return str.toUpperCase();
    }
}