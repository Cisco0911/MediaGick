'use client'


import SideBar from "@features/ui/components/SideBar";
import React from "react";


export default function Layout({ children, }: { children: React.ReactNode }) {
	return (
		<div className={"w-screen min-h-[500px] h-screen flex overflow-hidden"}>

			<SideBar />

			<div className={"relative z-10 h-screen flex-grow p-7 flex overflow-hidden"}>

				{children}

			</div>

		</div>
	)
}
