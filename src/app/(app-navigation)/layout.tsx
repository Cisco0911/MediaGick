// 'use client'


import SideBar from "@features/ui/components/SideBar";
import React from "react";
import TaskResponseDisplay from "@features/ui/components/TaskResponseDisplay";
import {getWsURL} from "@app/_lib/actions/auth";
import TaskListenning from "@features/ui/components/TaskListenning";


export default async function Layout({ children, }: { children: React.ReactNode }) {

	const url = await getWsURL()

	return (
		<div className={"w-screen min-h-[500px] h-screen flex overflow-hidden"}>

			<SideBar />

			<div className={"relative z-10 h-screen flex-grow p-7 flex overflow-hidden"}>

				{children}

				<TaskResponseDisplay wsUrl={url} />

			</div>

		</div>
	)
}
