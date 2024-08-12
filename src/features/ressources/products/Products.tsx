import {Product} from "@app/_lib/interfaces";
import {getProducts} from "@app/_lib/actions/fetchData";
import ResourceCard from "@features/ressources/components/ResourceCard";
import React from "react";


type ProductsProps = {
 // products: ProductForm[]

	filters?: string[]
}


export default async function Products({ filters }: ProductsProps) {

	const res = await getProducts()

	let products: Product[] = []
	if (res && res.ok) {
		products = res.data
	}

	if (!products){
		products = []
	}

	return (
		<div className={"grid-container"}>

			{/*{JSON.stringify(filters)}*/}

			{products.map(product => (
				<ResourceCard key={product.id} resource={product} />
			))}

			{/*<div className={"w-52 h-[700px] flex-shrink-0 bg-blue-500"}/>*/}
			{/*<div className={"w-52 h-96 flex-shrink-0 bg-pink-500"}/>*/}
		</div>
	)
}