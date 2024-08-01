import exp from "node:constants";


export function emailValidityFn(email: any): boolean {
	if (email === null || email === undefined || typeof email !== 'string') {
		return false;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function passwordValidityFn(password: any): boolean {
	if (password === null || password === undefined || typeof password !== 'string') {
		return false;
	}

	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	// return regex.test(password);
	return true;
}