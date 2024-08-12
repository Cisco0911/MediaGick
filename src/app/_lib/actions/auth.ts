"use server"



import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "../enums";
import {parseToUser, parseToUserSession} from "@app/_lib/parsers";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {UserInfo} from "@app/_lib/interfaces";
import {isEmpty} from "@nextui-org/shared-utils";


const API_BASE_URL = process.env.API_BASE_URL



class ClientError extends Error {}

function action<T extends any[], U>(
	fn: (...args: T) => Promise<U>,
): (
	...args: T
) => Promise<{ ok: true, data?: U } | { ok: false; error: string }> {
	return async (...args: T) => {
		try {
			return { ok: true, data: await fn(...args) };
		} catch (err: unknown) {
			if (err instanceof ClientError) return {ok: false, error: err.message };
			throw err;
		}
	};
}


export async function secondsFromNow(inputDate: string): Promise<number> {

	const targetDate = new Date(inputDate);

	return (targetDate.getTime() - Date.now()) / 1000;
}


export const login = action(async (email: string, password: string) => {

	let res: Response

	try {
		res = await fetch(`${API_BASE_URL}/api/v1/auth/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				mot_de_passe: password
			}),
		})

	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(`${content.detail}`)
	}

	const userSession  = parseToUserSession(content)

	cookies().set("session", JSON.stringify(userSession.sessionData), {
		httpOnly: true,
		secure: true,
		maxAge: await secondsFromNow(userSession.access_expiration),
		path: '/',
	})

	cookies().set("refresh", JSON.stringify(userSession.refresh_token), {
		httpOnly: true,
		secure: true,
		maxAge: await secondsFromNow(userSession.refresh_expiration),
		path: '/',
	})

	redirect("/dashboard")

	return;

})

export const getMe = action(async (accessToken: string = "") => {

	if (isEmpty(accessToken)) {
		const userSession = (await getUserSession())
		accessToken = userSession.access_token
	}

	let res: Response

	try {
		res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}



	return parseToUser(content);

})

type signUpSchema = {
	nom?: string;
	prenom?: string;
	email?: string;
	age?: number;
	sexe?: SexeEnum;
	mot_de_passe?: string;
	objectif_principal?: string;
	secteur_activite?: string;
	type_contenu_prefere?: TypeContenuPrefereEnum;
	publics_cibles: {libelle: PublicsCiblesEnum}[];
}
export const signUp = action(async (user: signUpSchema)=> {

	let res : Response

	const user1 = {
		"nom": "string",
		"prenom": "string",
		"email": "gyo@mail.com",
		"age": 1,
		"sexe": 1,
		"mot_de_passe": "stringst",
		"objectif_principal": "string",
		"secteur_activite": "string",
		"type_contenu_prefere": 1,
		"publics_cibles": [
			{
				"libelle": 1
			}
		]
	}

	try {
		console.log(JSON.stringify(user1))
		console.log(JSON.stringify(user))
		res = await fetch(`${API_BASE_URL}/api/v1/auth/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})

	}
	catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}

	redirect("/login")

	return ""

})

export async function getUserSession(){

	const session: {
		access_token: string;
		user: UserInfo;
	} = JSON.parse(cookies().get("session")!.value);

	return session
}

export const getNewAccessToken = action(async (refreshToken: string) => {
	let res: Response
	try {
		console.log("trying refreshing token")
		res = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token?refresh_token=${refreshToken}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (err) {
		console.log("failed refreshing token-unknown error", err)

		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log("failed refreshing token", content, cookies().toString())

		throw new ClientError(`${content.detail}`)
	}

	// console.log(content)
	const {access_token, access_expiration, refresh_token, refresh_expiration} = content;

	let user: any

	try {
		user = await getMe(access_token)
	}
	catch (err) {
		console.log("failed refreshing token", err)
		throw new Error('Something went wrong')
	}

	if (user.ok){
		return {
			access_token,
			access_expiration,
			refresh_token,
			refresh_expiration,
			user: user.data
		}
	}
	else {
		throw new ClientError(`${user.error}`)
	}
})

export const logout = action(async () => {

	let res: Response

	try {
		const accessToken = (await getUserSession()).access_token;

		res = await fetch(`${API_BASE_URL}/api/v1/auth/revoke-token?refresh_token=${accessToken}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}
	else {
		cookies().delete("session");
		cookies().delete("refresh");

		redirect("/login")

		return ""
	}

})

export const changePwd = action(async (oldPwd: string, newPwd: string) => {

	let res: Response

	try {
		const userSession = (await getUserSession());

		console.log("userSession", userSession.user.id)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/change-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userSession.access_token}`
			},
			body: JSON.stringify({
				current_password: oldPwd,
				new_password: newPwd
			}),
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}

	await logout()

	return;

})

export const updateInfo = action(async (data) => {

	let res: Response

	const userSession = (await getUserSession());

	try {

		console.log("userSession", userSession.user.id)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userSession.access_token}`
			},
			body: JSON.stringify(data),
		})
	} catch (err) {
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}

	// const meRes = await getMe(userSession.access_token)
	//
	// if (!meRes.ok){
	// 	throw new ClientError(`${meRes.error}`)
	// }
	//
	// const user = meRes.data
	//
	// cookies().delete("session");
	//
	// const newUserSession = {
	// 	access_token: userSession.access_token,
	// 	user
	// }
	//
	// cookies().set("session", JSON.stringify(newUserSession), {
	// 	httpOnly: true,
	// 	secure: true,
	// 	maxAge: await secondsFromNow(userSession.access_expiration),
	// 	path: '/',
	// })


	return;

})

