// "use client"

import Products from "@features/ressources/products/Products";
import {getProducts} from "@app/_lib/actions/fetchData";
import React, {Suspense} from "react";
import {ProductSchema} from "@app/_lib/schemas";
import {z} from "zod";
import {Product} from "@app/_lib/interfaces";
import Filters from "@features/ui/components/Filters";
import Loading from "@features/ui/components/Loading";
import {TypeProduct} from "@app/_lib/enums";




type ProductsPageProps = {
	searchParams: {
		sq?: string,
		f?: string | string[]
	}
}

const filters = Object.keys(TypeProduct)


export default function ProductsPage({ searchParams }: ProductsPageProps) {

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
				<Products filters={selectedFilters}/>
			</Suspense>

		</div>
	)
}

