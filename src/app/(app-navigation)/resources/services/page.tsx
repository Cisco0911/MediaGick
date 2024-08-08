// "use client"

import React, {Suspense} from "react";
import Filters from "@features/ui/components/Filters";
import Loading from "@features/ui/components/Loading";
import Services from "@features/ressources/services/Services";



// async function getProducts(): Promise<ProductForm[]> {
// 	return []
// }
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

