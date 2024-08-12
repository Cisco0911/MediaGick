import NewImageContent from "@features/workshop/image-content/NewImageContent";
import {getProduct} from "@app/_lib/actions/fetchData";
import React from "react";
import {Product} from "@app/_lib/interfaces";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import {getService} from "@app/(app-navigation)/resources/services/actions";
import {getModels} from "@app/(app-navigation)/workshop/actions";








type NewContentPageProps = {
	params: {
		resourceType: "product" | "service"
		id: string
	}
}


export default async function NewContentPage({ params }: NewContentPageProps) {

	console.log(params)

	let res : {   ok: false, error: string } | {   ok: true, data: Product | Service }
	if (params.resourceType === "product") {
		res = await getProduct(Number(params.id))
	}
	else {
		res = await getService(Number(params.id))
	}


	if (!res.ok){
		return (
			<div>
				<h1>Resource not found</h1>
			</div>
		)
	}
	const resource = res.data

	const models = await getModels()

	if (!models.ok){
		return (
			<div>
				<h1>Models not found</h1>
			</div>
		)
	}

	return (
		<div className="w-full h-full">
			<NewImageContent resource={resource} models={models.data} />
		</div>
	)
}



