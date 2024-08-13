"use server"


import {action, ClientError, validateData} from "@app/_lib/actions/funcs";
import {getUserSession} from "@app/_lib/actions/auth";
import {ModelContenu} from "@app/(app-navigation)/workshop/interfaces";
import {z} from "zod"
import {ModelContenuSchema} from "@app/(app-navigation)/workshop/schemas";




const API_BASE_URL = process.env.API_BASE_URL


export const getModels = action(async () : Promise<ModelContenu[]> => {

	const userSession = (await getUserSession());

	const res = await fetch(`${API_BASE_URL}/api/v1/modeles-contenus`, {
		method: 'GET',
		headers: {
			// 'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
	})

	const content: any = await res.json()

	if (!res.ok) {
		console.log('Erreur', JSON.stringify(content));
		throw new ClientError(`${content.detail}`)
	}
	else {
		const models = await validateData<ModelContenu[]>(z.array(ModelContenuSchema), content)

		if (!models) {
			throw new Error('Unmatched Schema')
		}

		return models
	}

})

export const getModel = action(async (id: number) : Promise<ModelContenu> => {

	const userSession = (await getUserSession());

	const res = await fetch(`${API_BASE_URL}/api/v1/modeles-contenus/${id}`, {
		method: 'GET',
		headers: {
			// 'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
	})

	const content: any = await res.json()

	if (!res.ok) {
		console.log('Erreur', JSON.stringify(content));
		throw new ClientError(`${content.detail}`)
	}

	return await validateData<ModelContenu>(ModelContenuSchema, content)
})