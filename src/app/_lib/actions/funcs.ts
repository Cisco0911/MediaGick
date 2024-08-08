import {ZodError, ZodType} from "zod";


export class ClientError extends Error {}


export function action<T extends any[], U>(
	fn: (...args: T) => Promise<U>,
): (...args: T) => Promise<{ ok: true, data: U } | { ok: false; error: string }> {
	return async (...args: T) => {
		try {
			return { ok: true, data: await fn(...args) };
		} catch (err: unknown) {
			if (err instanceof ClientError) return {ok: false, error: err.message };
			throw err;
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


function formDataToJson(formData: FormData): object {
	const formDataObj: { [key: string]: any } = {};

	formData.forEach((value, key) => {
		formDataObj[key] = value;
		console.log(value)
	});

	return formDataObj;
}