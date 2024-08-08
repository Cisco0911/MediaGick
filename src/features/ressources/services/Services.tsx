import ResourceCard from "@features/ressources/components/ResourceCard";
import React from "react";
import {getServices} from "@app/(app-navigation)/resources/services/actions";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";


type ProductsProps = {
 // products: ProductForm[]

	filters?: string[]
}


export default async function Services({ filters }: ProductsProps) {

	const res = await getServices()

	let services: Service[] = []
	if (res && res.ok) {
		services = res.data
	}

	return (
		<div className={"grid-container"}>

			{services.map(product => (
				<ResourceCard key={product.id} resource={product} type={"service"} />
			))}

		</div>
	)
}