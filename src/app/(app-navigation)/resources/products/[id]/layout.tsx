// "use client"


import clsx from "clsx";
import {Chip} from "@nextui-org/chip";

type LayoutProps = {
	children: React.ReactNode,
}

export default function Layout({children}: LayoutProps) {



	return (
		<div className={"w-full h-full pt-6"}>

			<div className={clsx(
				"relative w-full h-full p-5 rounded-[1.6rem] bg-tertiary"
			)}>

					<div className={"w-full h-full"}> {children} </div>

			</div>

		</div>
	)
}

