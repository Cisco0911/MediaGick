// "use client"

import Products from "@features/ressources/products/Products";
import {getProducts} from "@app/_lib/actions/fetchData";
import React, {Suspense} from "react";
import {ProductSchema} from "@app/_lib/schemas";
import {z} from "zod";
import {Product} from "@app/_lib/interfaces";
import Filters from "@features/ui/components/Filters";
import Loading from "@features/ui/components/Loading";




type ProductsPageProps = {
	searchParams: {
		sq?: string,
		f?: string | string[]
	}
}

const filters = [
	"Électronique et Électroménager",
	"Vêtements et Accessoires",
	"Alimentation",
	"Jouets et Jeux",
	"Livres",
	"Beauté et Santé",
	"Maison et Jardin",
	"Sports et Loisirs",
	"Automobile",
	"Informatique",
	"Bricolage",
	"Musique et Instruments",
	"Art et Décoration",
	"Bébés et Enfants",
	"Animaux"
]


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

