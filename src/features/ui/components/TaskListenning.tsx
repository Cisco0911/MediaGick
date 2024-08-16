import toast from "react-hot-toast";
import {useEffect} from "react";
import {TaskStatus} from "@app/_lib/interfaces";
import {getWsURL} from "@app/_lib/actions/auth";
import {ListenCreateContent} from "@app/_lib/taskSubjects";






// async function listenCreateContent(){
//
// 	const wsUrl = (await getWsURL())
//
// 	console.log("open")
// 	const ws = new WebSocket(wsUrl);
// 	ws.onopen = () => {
// 		console.log("Connected");
// 	};
// 	ws.onclose = () => {
// 		console.log("Disconnected");
// 	};
// 	ws.onerror = () => {
// 		console.log("Error");
// 	};
//
// 	ws.onmessage = (event) => {
// 		console.log(event.data);
//
// 		const createContentRes: TaskStatus = JSON.parse(event.data)
//
// 		if (createContentRes.status === "failed") {
// 			// console.log("failed", value.error)
// 			toast.error(createContentRes.error.message)
// 		} else {
// 			toast.success("Contenu ajoute avec succes !!")
// 		}
// 	};
// }





interface TaskListenningProps {

}

export default async function TaskListenning({}: TaskListenningProps) {

	const wsUrl = (await getWsURL())

	console.log("open")
	const ws = new WebSocket(wsUrl);
	ws.onopen = () => {
		console.log("Connected");
	};
	ws.onclose = () => {
		console.log("Disconnected");
	};
	ws.onerror = () => {
		console.log("Error");
	};

	ws.onmessage = (event) => {
		console.log(event.data);

		const createContentRes: TaskStatus = JSON.parse(event.data)

		if (createContentRes.status === "failed") {
			// console.log("failed", value.error)
			toast.error(createContentRes.error.message)
		} else {
			toast.success("Contenu ajoute avec succes !!")
		}
	};


	return null
}