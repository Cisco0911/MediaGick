import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {

	return (
		<div className={"w-full h-full p-12 rounded-[1.875rem] bg-[#0c1214]"}>
			<div className={"w-full h-full rounded-3xl overflow-hidden bg-transparent"}>
				{children}
			</div>
		</div>
	)
}