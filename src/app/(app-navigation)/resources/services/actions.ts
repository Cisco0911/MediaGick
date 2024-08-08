"use server"


import {Product} from "@app/_lib/interfaces";
import {getUserSession} from "@app/_lib/actions/auth";
import {z} from "zod";
import {action, validateResponse, ClientError} from "@app/_lib/actions/funcs";
import {ServiceSchema} from "@app/(app-navigation)/resources/services/schemas";
import {ProductSchema} from "@app/_lib/schemas";
import {redirect} from "next/navigation";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";



const API_BASE_URL = process.env.API_BASE_URL





export const getServices = action(async (): Promise<Service[]> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/services`, {
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

	const services = validateResponse<Service[]>(content, z.array(ServiceSchema))

	if (services) {
		return services
	}
	else {
		throw new Error('Unmatched Schema')
	}

})

export const addService = action(async (data: FormData): Promise<Service> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		// console.log(userSession)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/services`, {
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

	const service = validateResponse<Service>(content, ServiceSchema)

	if (service) {
		redirect('/resources/services')
		return service
	}
	else {
		throw new Error('Unmatched Schema')
	}

})
// export const autoAddProduct = action(async (data: FormData): Promise<Product> => {
// 	let res: Response
// 	try {
// 		const userSession = (await getUserSession());
//
// 		// console.log(userSession)
//
// 		data.append("createur_id", `${userSession.user.id}`)
//
// 		res = await fetch(`${API_BASE_URL}/api/v1/utils/auto-add/produits/url`, {
// 			method: 'POST',
// 			headers: {
// 				'Authorization': `Bearer ${userSession.access_token}`
// 			},
// 			body: data
// 		})
// 	}
// 	catch (err) {
// 		console.log("Something went wrong", JSON.stringify(err), err)
// 		throw new Error('Something went wrong')
// 	}
//
// 	const content: any = await res.json()
//
// 	if (!res.ok) {
// 		console.log(JSON.stringify(content))
// 		throw new ClientError(`${content.detail}`)
// 	}
//
// 	const products = validateResponse<Product>(content, ProductSchema)
//
// 	if (products) {
// 		redirect('/resources/products')
// 		return products
// 	}
// 	else {
// 		throw new Error('Unmatched Schema')
// 	}
//
// })

export const getService = action(async (id: number): Promise<Service> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/services/${id}`, {
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

	const product = validateResponse<Product>(content, ServiceSchema)

	if (product) {
		return product
	}
	else {
		throw new Error('Unmatched Schema')
	}

})

export const updateService = action(async (id: number, data: any): Promise<Service> => {
	let res: Response
	try {
		const userSession = (await getUserSession());

		// console.log(userSession)

		res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/services/${id}`, {
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

	const service = validateResponse<Product>(content, ServiceSchema)

	if (service) {
		redirect('/resources/services')
		return service
	}
	else {
		throw new Error('Unmatched Schema')
	}

})