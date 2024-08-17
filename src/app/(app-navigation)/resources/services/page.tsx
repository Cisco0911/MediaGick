// "use client"

import React, {Suspense} from "react";
import Filters from "@features/ui/components/Filters";
import Loading from "@features/ui/components/Loading";
import Services from "@features/ressources/services/Services";
import {TypeService} from "@app/(app-navigation)/resources/services/enums";



// async function getProducts(): Promise<ProductForm[]> {
// 	return []
// }
type ProductsPageProps = {
	searchParams: {
		sq?: string,
		f?: string | string[]
	}
}

const filters = Object.keys(TypeService)


export default function ServicesPage({ searchParams }: ProductsPageProps) {

	// const res = await getProducts()
	//
	// let products: ProductForm[] = []
	// if (res && res.ok) {
	// 	products = res.data
	// }

	// console.log(z.infer<typeof ProductSchema>, "lol")

	let selectedFilters = searchParams.f ?? []

	if (typeof selectedFilters === 'string') {
		selectedFilters = [decodeURIComponent(selectedFilters)];
	} else if (Array.isArray(selectedFilters)) {
		selectedFilters = selectedFilters.map(filter => decodeURIComponent(filter));
	}

	return (
		<div className={"w-full h-full flex flex-col space-y-4"}>

			<div className={"w-full flex-shrink-0"}>
				<Filters filters={filters}/>
			</div>

			<Suspense fallback={<Loading/>}>
				<Services filters={selectedFilters}/>
			</Suspense>

		</div>
	)
}

