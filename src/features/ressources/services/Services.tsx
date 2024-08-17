import ResourceCard from "@features/ressources/components/ResourceCard";
import React from "react";
import {getServices} from "@app/(app-navigation)/resources/services/actions";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import {isEmpty} from "@nextui-org/shared-utils";
import {TypeService} from "@app/(app-navigation)/resources/services/enums";


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

	if (isEmpty(services)){
		return (
			<div className={"w-full h-full flex justify-center items-center"}>
				<p>Aucun service ajouté</p>
			</div>
		)
	}

	if (filters && filters.length > 0) {
		const numericFilters = filters.map(filter => TypeService[filter]);
		services = services.filter(service => numericFilters.includes(service.type))
		// console.log(filters, numericFilters, products)
	}

	return (
		<div className={"grid-container"}>

			{services.map(product => (
				<ResourceCard key={product.id} resource={product} type={"service"} />
			))}

		</div>
	)
}