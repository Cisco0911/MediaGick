"use client"

import clsx from "clsx";
import {Switch} from "@nextui-org/switch";
import {cn} from "@nextui-org/react";
import StoreProvider from "@app/StoreProvider";
import {useAppDispatch, useAppSelector, useAppStore} from "@app/_lib/hooks/redux-custom-hooks";
import {selectScriptMode, setScriptMode} from "@app/_lib/reduxSlices/addVideoContentSlice";
import {useRef} from "react";


export type LayoutProps = {
	children: React.ReactNode,
	idea: React.ReactNode
	script: React.ReactNode
}

export default function Layout({ children, idea, script }: LayoutProps) {

	// const store = useAppStore()
	// const initialized = useRef(false)
	// if (!initialized.current) {
	// 	initialized.current = true
	// }

	const dispatch = useAppDispatch();
	const scriptMode = useAppSelector(selectScriptMode)

	console.log(scriptMode)

	return (
		<div className={"w-full h-full pt-6"}>

			<div className={clsx(
				"relative w-full h-full p-10 rounded-[1.6rem] bg-tertiary flex flex-col"
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
					onValueChange={val => dispatch(setScriptMode(val))}
				>
					<div className={"w-20 flex justify-center"}>
						{
							scriptMode ?
								<span> Script </span> :
								<span> Idée </span>
						}
					</div>
				</Switch>

				<div className={"w-full h-full"}> {scriptMode ? script : idea} </div>

			</div>

		</div>
	)
}