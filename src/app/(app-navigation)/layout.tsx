'use client'


import SideBar from "@features/ui/components/SideBar";
import React from "react";


export default function Layout({ children, }: { children: React.ReactNode }) {
	return (
		<div className={"w-screen min-h-[500px] h-screen flex backdrop-blur-md bg-black/50 overflow-hidden"}>

			<SideBar />

			<div className={"relative z-10 h-full flex-grow p-7 flex overflow-hidden"}>

				<div className={"w-full h-full p-12 rounded-[1.875rem] bg-[#0c1214]"}>
					<div className={"w-full h-full rounded-3xl overflow-hidden bg-transparent"}>
						{children}
					</div>
				</div>

			</div>

		</div>
	)
}
