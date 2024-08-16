"use client";

import {io, Socket} from "socket.io-client";
import {getWsURL} from "@app/_lib/actions/auth";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {UserInfo} from "@app/_lib/interfaces";
import {cookies} from "next/headers";

export const socket: Promise<Socket<DefaultEventsMap, DefaultEventsMap>> = new Promise(async (resolve) => {

	const url = await getWsURL()
	resolve(io(url, {autoConnect: true, transports: ["websocket"]}));
})

// const session: {
// 	access_token: string;
// 	user: UserInfo;
// } = JSON.parse(cookies().get("session")!.value);
// const endpoint = "/ws/create_contenu_image";
// const url = `ws://mediagick-api-d8a99c6c2bd2.herokuapp.com${endpoint}/${session.user.id}?token=${session.access_token}`
//
// export const socket = io(url, {autoConnect: true, transports: ["websocket"]})