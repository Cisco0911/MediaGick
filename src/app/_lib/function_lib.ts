
import { useState } from 'react';


/**
 * Converts an enum to an array of objects, each containing an `id` and `label`.
 *
 * This function filters out any numeric keys from the enum, as they are usually
 * not part of the enum values themselves. It then maps the remaining keys to
 * objects with their corresponding string values from the enum.
 *
 * @param enumObj The enum object to convert.
 * @returns An array of objects, each with an `id` (string) and `label` (string).
 */
export function enumToArray<T extends object>(enumObj: T): { id: string; label: string }[] {
	return Object.keys(enumObj)
		.filter((key) => isNaN(Number(key))) // Filter out numeric keys
		.map((key) => ({
			id: key,
			label: enumObj[key as keyof typeof enumObj] as string
		}));
}


/**
 * Custom hook to manage a numeric value within a bounded range.
 *
 * This hook provides a state variable, increment, decrement, and set functions
 * to manage a numeric value within a specified range. The value will wrap around
 * when reaching the boundaries of the range.
 *
 * @param initialValue The initial value of the bounded variable.
 * @param n The upper bound of the range (inclusive).
 * @returns An array containing:
 *   - The current value.
 *   - A function to increment the value.
 *   - A function to decrement the value.
 *   - A function to set the value directly.
 */
export const useBoundedValue = (initialValue: number, n: number): [
	number,
	() => void,
	() => void,
	(newValue: number) => void
] => {
	// State to store the variable value
	const [value, setValue] = useState<number>(initialValue);

	// Function to increment the variable value
	const increment = () => {
		// Increment by 1 and wrap around to initialValue when reaching n
		setValue((prev) => (prev + 1) % (n - initialValue + 1) + initialValue);
		//console.log(value) // Remove this if unnecessary
	};

	// Function to decrement the variable value
	const decrement = () => {
		// Decrement by 1 and wrap around to n when reaching initialValue
		setValue((prev) => (prev - 1 + (n - initialValue + 1)) % (n - initialValue + 1) + initialValue);
	};

	// Function to set the variable value directly
	const set = (newValue: number) => {
		// Clamp the value between initialValue and n
		setValue(Math.max(initialValue, Math.min(n, newValue)));
	};

	// Return the value and the functions to modify it as an array
	return [value, increment, decrement, set];
};


/**
 * Toggles the presence of a value in a list. If the value exists, it is removed; otherwise, it is added.
 *
 * @param list The list of values to modify.
 * @param value The value to toggle.
 * @param comparer An optional function to compare two values in the list.
 *                 If not provided, the default comparison operators will be used.
 * @returns A new list with the value toggled.
 */
export function toggleValueInList<T>(list: T[], value: T, comparer?: (a: T, b: T) => boolean): T[] {
	// If no comparer function is provided, use the default comparison operators.
	const compare = comparer || ((a: T, b: T) => a === b);

	// Check if the value exists in the list using the provided or default comparer.
	const exists = list.some(item => compare(item, value));

	// Use the ternary operator for concise conditional logic.
	return exists
		// If the value is found, use filter to create a new array without the value.
		? list.filter(item => !compare(item, value))
		// If the value is not found, use the spread operator and array concatenation to add the value to the end of the list.
		: [...list, value];
}