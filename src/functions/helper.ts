import { diffYear } from "../types";

/**
 * Calculates the future value of an amount based on inflation rate and target year.
 * @param amount - Initial amount as a string (converted to number).
 * @param interest - Interest rate as a string (converted to number).
 * @param date - Target date in YYYY-MM-DD format.
 * @returns Future value as a number.
 */
export function findInterest(amount: string, interest: string, date: string): number {
    const presentAmount = amount.trim() === '' ? 0 : Number(amount);
    const interestRate = interest.trim() === '' ? 0 : Number(interest) / 100;
    const today = new Date();
    const inputDate = date.trim() === '' ? today : new Date(date);

    // Calculate difference in years
    const diffTime = inputDate.getTime() - today.getTime();
    const numberOfYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    // Future Value Calculation
    const futureValue = presentAmount * Math.pow(1 + interestRate / 365.25, 365.25 * numberOfYears);

    return futureValue;
}

/**
 * Calculates the historical value of an amount based on past inflation rate.
 * @param amount - Present amount as a string (converted to number).
 * @param interest - Inflation rate as a string (converted to number).
 * @param date - Historical target date in YYYY-MM-DD format.
 * @returns Past value as a number.
 */
export function findPastValue(amount: string, interest: string, date: string): number {
    const presentAmount = amount.trim() === '' ? 0 : Number(amount);
    const interestRate = interest.trim() === '' ? 0 : Number(interest) / 100;
    const today = new Date();
    const inputDate = date.trim() === '' ? today : new Date(date);

    // Calculate difference in years (negative for past values)
    const diffTime = today.getTime() - inputDate.getTime();
    const numberOfYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    // Past Value Calculation (Reverse Compound Interest)
    const pastValue = presentAmount / Math.pow(1 + interestRate / 365.25, 365.25 * numberOfYears);

    return pastValue;
}

/**
 * Calculates the difference in years between an input date and today's date.
 * @param inputDate - The target date in YYYY-MM-DD format.
 * @returns An object with year difference and whether the date is in the future.
 */
export function calculateYearDifference(inputDate: string): diffYear {
    const today = new Date();
    const givenDate = new Date(inputDate);

    // Calculate difference in milliseconds
    const differenceInMilliseconds = givenDate.getTime() - today.getTime();
    
    // Convert milliseconds to years (rounded for accuracy)
    const differenceInYears = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

    return {
        difference: Math.abs(differenceInYears), // Absolute difference in years
        isFuture: givenDate > today // True if input date is in the future
    };
}
