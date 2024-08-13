import {ZodError, ZodSchema, ZodType} from "zod";


export class ClientError extends Error {}


export function action<T extends any[], U>(
	fn: (...args: T) => Promise<U>,
): (...args: T) => Promise<{ ok: true, data: U } | { ok: false; error: string }> {
	return async (...args: T) => {
		try {
			return { ok: true, data: await fn(...args) };
		} catch (err: unknown) {
			if (err instanceof ClientError) return {ok: false, error: err.message };
			else return { ok: false, error: 'Une erreur est survenue' };
		}
	};
}


export async function validateResponse<T>(res: any, DataSchema: ZodType) {
	try {
		console.log('Validation');
		// Validation de la réponse avec le schéma Zod
		const validatedData = DataSchema.parse(res);
		console.log('Validation réussie');
		return validatedData;
	} catch (error) {
		console.log('Echec de la validation');
		if (error instanceof ZodError) {
			console.error('Validation échouée:', error.errors);
		} else {
			console.error('Erreur inconnue:', error);
		}
		return null;
	}
}
export async function validateData<T>(schema: ZodSchema<T>, data: unknown): Promise<T> {
	const result = schema.safeParse(data);
	if (result.success) {
		console.log('Validation réussie');
		return result.data; // Return the validated and typed data
	} else {
		console.error('Validation échouée:', result.error.errors);
		throw new Error("Validation echouée")// Throw error if validation fails
	}
}


function formDataToJson(formData: FormData): object {
	const formDataObj: { [key: string]: any } = {};

	formData.forEach((value, key) => {
		formDataObj[key] = value;
		console.log(value)
	});

	return formDataObj;
}


export function formatDateLabel(dateString: string): string {
	const now = new Date();
	const date = new Date(dateString);
	const diffMs = now.getTime() - date.getTime();
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHour = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHour / 24);
	const diffWeek = Math.floor(diffDay / 7);

	if (diffSec < 60) {
		return "À l'instant";
	} else if (diffMin < 60) {
		return `Il y a ${diffMin} minute(s)`;
	} else if (diffHour < 24) {
		return `Il y a ${diffHour} heure(s)`;
	} else if (diffDay === 1) {
		return "Hier";
	} else if (diffDay < 7) {
		return `Il y a ${diffDay} jour(s)`;
	} else if (diffWeek === 1) {
		return "Il y a une semaine";
	} else {
		// Format exact date as dd/mm/yyyy
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}
}



export function isValidURL(str: string): boolean {
	try {
		new URL(str);
		return true;
	} catch (_) {
		return false;
	}
}