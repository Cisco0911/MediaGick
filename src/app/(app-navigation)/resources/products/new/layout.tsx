"use client"

import clsx from "clsx";
import {Switch} from "@nextui-org/switch";
import {cn} from "@nextui-org/react";
import {useState} from "react";


export type LayoutProps = {
	children: React.ReactNode,
	manual: React.ReactNode
	assisted: React.ReactNode
}

export default function Layout({ children, manual, assisted }: LayoutProps) {

	const [assistMode, setAssistMode] = useState(false)

	return (
		<div className={"w-full h-full pt-6"}>

			<div className={clsx(
				"relative w-full h-full p-5 rounded-[1.6rem] bg-tertiary flex flex-col"
			)}>

				<Switch
						classNames={{
							base: cn(
								"px-3 py-1.5 rounded-3xl flex items-center space-x-2 bg-tertiary border border-secondary",
								"absolute z-10 -right-0 -top-6",
							),
							wrapper: "p-0 h-4 overflow-visible bg-secondary",
							thumb: cn("w-6 h-6 border-2 shadow-lg bg-custom_white",
								"group-data-[hover=true]:border-primary",
								//selected
								"group-data-[selected=true]:border-primary",
								"group-data-[selected=true]:ml-6",
								// pressed
								"group-data-[pressed=true]:w-7",
								"group-data-[selected]:group-data-[pressed]:ml-4",
							),
						}}
				        onValueChange={setAssistMode}
				>
					<div className={"text-custom_white"}>
						{
							assistMode ?
								<span> Ajout d'offre assisté </span> :
								<span> Ajout d'offre manuel </span>
						}
					</div>
				</Switch>

				<div className={"w-full h-full"}> {assistMode ? assisted : manual} </div>

			</div>

		</div>
	)
}