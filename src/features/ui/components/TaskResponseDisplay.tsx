"use client"


import toast from "react-hot-toast";
import {useEffect} from "react";
import {TaskStatus} from "@app/_lib/interfaces";
import {useRouter} from "next/navigation";


interface TaskResponseDisplayProps {
	wsUrl: string
}

export default function TaskResponseDisplay({wsUrl}: TaskResponseDisplayProps) {

	const router = useRouter()

	useEffect(() => {
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
				router.refresh()
			}
		};

		return () => {
			console.log("Closed");
			// ws.close();
		};
	}, []);

	// useEffect(() => {
	// 	// console.log("TaskResponseDisplay")
	// 	const createContentSubscription = CreateContent.subscribe( value => {
	// 		// console.log(value, "TaskResponseDisplay");
	// 		if (value.status === "failed") {
	// 			// console.log("failed", value.error)
	// 			toast.error(value.error.message)
	// 		}
	// 		else {
	// 			toast.success("Contenu ajoute avec succes !!")
	// 		}
	// 	} )
	//
	// 	return () => {
	// 		createContentSubscription.unsubscribe()
	// 	}
	// }, []);

	return null
}