
import React from "react";
import {getProduct} from "@app/_lib/actions/fetchData";
import ProductForm from "@features/ressources/products/components/ProductForm";
import {getService} from "@app/(app-navigation)/resources/services/actions";
import ServiceForm from "@features/ressources/services/components/ServiceForm";





type ProductsPageProps = {
	params: {
		id: string
	}
}

export default async function ServiceDetailPage({ params }: ProductsPageProps) {

	const res = await getService(Number(params.id))

	if (!res.ok){
		return (
			<div>
				<h1>Service not found</h1>
			</div>
		)
	}

	const service = res.data
	// console.log(service)

	return (
		<>
			<ServiceForm service={service} isUpdate={true} />
		</>
	)
}