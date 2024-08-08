"use server"


import {Product} from "@app/_lib/interfaces";
import {getUserSession} from "@app/_lib/actions/auth";
import {ZodError, ZodType, z} from "zod";
import {ProductSchema} from "@app/_lib/schemas";
import {redirect} from "next/navigation";
import {action, validateResponse, ClientError} from "@app/_lib/actions/funcs";




const API_BASE_URL = process.env.API_BASE_URL









export async function getFilters(url: string): Promise<string[]> {

	return new Promise(resolve => {
		setTimeout(() => resolve(
			[
				"Électronique et Électroménager",
				"Vêtements et Accessoires",
				"Alimentation",
				"Jouets et Jeux",
				"Livres",
				"Beauté et Santé",
				"Maison et Jardin",
				"Sports et Loisirs",
				"Automobile",
				"Informatique",
				"Bricolage",
				"Musique et Instruments",
				"Art et Décoration",
				"Bébés et Enfants",
				"Animaux"
			]
		), 5000)
	})

}


export const getProducts = action(async (): Promise<Product[]> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/produits`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userSession.access_token}`
			},
		})
	}
	catch (err) {
		console.log("Something went wrong", err)
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log('Erreur', JSON.stringify(content));
		throw new ClientError(`${content.detail}`)
	}

	const products = validateResponse<Product[]>(content, z.array(ProductSchema))

	if (products) {
		return products
	}
	else {
		throw new Error('Unmatched Schema')
	}

})

export const addProduct = action(async (data: FormData): Promise<Product> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		// console.log(userSession)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/produits`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${userSession.access_token}`
			},
			body: data
		})
	}
	catch (err) {
		console.log("Something went wrong", JSON.stringify(err), err)
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}

	const products = validateResponse<Product>(content, ProductSchema)

	if (products) {
		redirect('/resources/products')
		return products
	}
	else {
		throw new Error('Unmatched Schema')
	}

})
export const autoAddProduct = action(async (data: FormData): Promise<Product> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		// console.log(userSession)

		data.append("createur_id", `${userSession.user.id}`)

		res = await fetch(`${API_BASE_URL}/api/v1/utils/auto-add/produits/url`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${userSession.access_token}`
			},
			body: data
		})
	}
	catch (err) {
		console.log("Something went wrong", JSON.stringify(err), err)
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}

	const products = validateResponse<Product>(content, ProductSchema)

	if (products) {
		redirect('/resources/products')
		return products
	}
	else {
		throw new Error('Unmatched Schema')
	}

})

export const getProduct = action(async (id: number): Promise<Product> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/produits/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userSession.access_token}`
			},
		})
	}
	catch (err) {
		console.log("Something went wrong", err)
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log('Erreur', JSON.stringify(content));
		throw new ClientError(`${content.detail}`)
	}

	const product = validateResponse<Product>(content, ProductSchema)

	if (product) {
		return product
	}
	else {
		throw new Error('Unmatched Schema')
	}

})

export const updateProduct = action(async (id: number, data: any): Promise<Product> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		// console.log(userSession)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/produits/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${userSession.access_token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
	catch (err) {
		console.log("Something went wrong", JSON.stringify(err), err)
		throw new Error('Something went wrong')
	}

	const content: any = await res.json()

	if (!res.ok) {
		console.log(JSON.stringify(content))
		throw new ClientError(`${content.detail}`)
	}

	const products = validateResponse<Product>(content, ProductSchema)

	if (products) {
		redirect('/resources/products')
		return products
	}
	else {
		throw new Error('Unmatched Schema')
	}

})


