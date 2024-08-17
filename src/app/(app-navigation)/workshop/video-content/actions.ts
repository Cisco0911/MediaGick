"use server"


import {action, ClientError, validateData} from "@app/_lib/actions/funcs";
import {AddImageContentPostData} from "@app/(app-navigation)/workshop/image-content/new/interfaces";
import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import {getUserSession} from "@app/_lib/actions/auth";
import {ImageContentSchema} from "@app/(app-navigation)/workshop/image-content/schemas";
import {z} from "zod"
import {VideoContentSchema} from "@app/(app-navigation)/workshop/video-content/schemas";
import {AddVideoContent, VideoContent} from "@app/(app-navigation)/workshop/video-content/interfaces";


const API_BASE_URL = process.env.API_BASE_URL



export const getVideoContents = action(async () : Promise<VideoContent[]> => {

	const userSession = await getUserSession()

	const res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/contenus/videos`, {
		method: 'GET',
		headers: {
			// 'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
	})

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(content.detail)
	}

	return await validateData<VideoContent[]>(z.array(VideoContentSchema), content)

})

export const getVideoContent = action(async (id: number) : Promise<ImageContent> => {

	const userSession = await getUserSession()

	const res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/contenus/images/${id}`, {
		method: 'GET',
		headers: {
			// 'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
	})

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(content.detail)
	}

	return await validateData<ImageContent>(ImageContentSchema, content)

})

export const addVideoContent = action(async (data: AddVideoContent) : Promise<void> => {

	const userSession = await getUserSession()

	const res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/contenus/videos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
		body: JSON.stringify(data)
	})

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(content.detail)
	}

	return content
})

export const updateVideoContent = action(async (prompt: string, id: number) : Promise<ImageContent> => {

	const userSession = await getUserSession()

	const res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/contenus/images/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
		body: JSON.stringify({ message_edition: prompt })
	})

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(content.detail)
	}

	return await validateData<ImageContent>(ImageContentSchema, content)

})

export const resetVideoContent = action(async (id: number) : Promise<ImageContent> => {

	const userSession = await getUserSession()

	const res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/contenus/images/${id}/reset`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
	})

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(JSON.stringify(content.detail))
	}

	return await validateData<ImageContent>(ImageContentSchema, content)

})

export const deleteVideoContentById = action(async (id: number) : Promise<void> => {

	const userSession = await getUserSession()

	const res = await fetch(`${API_BASE_URL}/api/v1/createurs/${userSession.user.id}/contenus/images/${id}`, {
		method: 'DELETE',
		headers: {
			// 'Content-Type': 'application/json',
			'Authorization': `Bearer ${userSession.access_token}`
		},
	})

	const content: any = await res.json()

	if (!res.ok) {
		throw new ClientError(content.detail)
	}

	return

})

