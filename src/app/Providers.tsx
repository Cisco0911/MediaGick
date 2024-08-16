'use client'


import {NextUIProvider} from '@nextui-org/react'
import {useEffect, useState} from "react";
import {socket} from "@app/_lib/socket";
import {CreateContent} from "@app/_lib/taskSubjects";


interface ProvidersProps {
	children: React.ReactNode
	// wsUrl: string
}

export function Providers({children}: ProvidersProps) {

	// const [isConnected, setIsConnected] = useState(false);
	// const [transport, setTransport] = useState("N/A");
	//
	// useEffect(() => {
	// 	socket.then((socket) => {
	// 		if (socket.connected) {
	// 			onConnect();
	// 		}
	//
	// 		function onConnect() {
	// 			setIsConnected(true);
	// 			setTransport(socket.io.engine.transport.name);
	//
	// 			socket.io.engine.on("upgrade", (transport) => {
	// 				setTransport(transport.name);
	// 			});
	//
	// 			console.log(transport)
	//
	// 			socket.on()
	// 		}
	//
	// 		function onDisconnect() {
	// 			setIsConnected(false);
	// 			setTransport("N/A");
	// 		}
	//
	// 		socket.on("connect", onConnect);
	// 		socket.on("disconnect", onDisconnect);
	//
	// 		return () => {
	// 			socket.off("connect", onConnect);
	// 			socket.off("disconnect", onDisconnect);
	// 		};
	// 	})
	// }, []);

	return (
		<NextUIProvider>
			{children}
		</NextUIProvider>
	)
}