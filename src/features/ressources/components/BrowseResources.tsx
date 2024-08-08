"use client"

import SearchResource from "@features/ressources/components/SearchResource";
import {forwardRef, ReactNode, Suspense} from "react";
import GetFilters from "@features/ui/components/GetFilters";
import {usePathname, useRouter} from "next/navigation";
import {Button, ButtonGroup} from "@nextui-org/button";
import clsx from "clsx";
import {useUrlQuery} from "@app/_lib/hooks/hooks";
import {PlusIcon} from "@heroicons/react/24/outline";



type CustButtonProps = {
	children: ReactNode,
	href: string
}
const CustButton = forwardRef<HTMLButtonElement, CustButtonProps>(({children, href}: CustButtonProps, ref) => {

	const pathname = usePathname()
	const router = useRouter()

	return(
		<Button ref={ref}
		        className={clsx(
					"px-8 py-6 bg-secondary text-custom_white text-center text-xl",
					{"text-tertiary font-bold": pathname === href},
			        pathname === href && (pathname === "/resources/products" ? "bg-primary" : "bg-red-500"),
				)}
		        onClick={ () =>  router.push(href) }
		>
			{children}
		</Button>
	)
})


export default function BrowseResources() {

	const urlQuery = useUrlQuery()

	return (
		<div className={"w-full flex flex-col justify-center space-y-5"}>

			<div className={"w-full"}>
				<SearchResource />
			</div>

			<div className={"w-full flex justify-between"}>

				<ButtonGroup>
					<CustButton href={"/resources/products"}>Produits</CustButton>
					<CustButton href={"/resources/services"}>Services</CustButton>
				</ButtonGroup>

				<Button isIconOnly
				        radius={"full"}
				        size={"sm"}
				        className={"text-primary ring-1 ring-primary bg-transparent"}
				        onClick={() => urlQuery.router.push(`${urlQuery.pathname}/new`) }
				>
					<PlusIcon className={"size-8 stroke-primary"}/>
				</Button>

			</div>


		</div>
	)

}