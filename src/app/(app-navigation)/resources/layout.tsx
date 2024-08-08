"use client"

import BrowseResources from "@features/ressources/components/BrowseResources";
import {usePathname} from "next/navigation";
import {useEffect, useRef} from "react";
import {useComputeSimblingSize} from "@app/_lib/hooks/hooks";



type LayoutProps = {
	children: React.ReactNode,
	// products: React.ReactNode,
	// services: React.ReactNode,
}


export default function Layout({ children }: LayoutProps) {

	const pathname = usePathname()

	// const cptSize = useComputeSimblingSize("1rem")

	return (
		<div className={"w-full h-full flex flex-col space-y-4"}>

			{
				(pathname === "/resources/products" ||
					pathname === "/resources/services") &&
                <div>
                    <BrowseResources/>
                </div>
			}

			<div
			     className={"w-full flex-grow overflow-hidden"}>
				{children}
			</div>

		</div>
	)
}