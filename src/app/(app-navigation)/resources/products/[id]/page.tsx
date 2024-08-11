import React from "react";
import {getProduct} from "@app/_lib/actions/fetchData";
import ProductForm from "@features/ressources/products/components/ProductForm";





type ProductsPageProps = {
	params: {
		id: string
	}
}

export default async function ProductDetailPage({ params }: ProductsPageProps) {

	const res = await getProduct(Number(params.id))

	if (!res.ok){
		return (
			<div>
				<h1>Product not found</h1>
			</div>
		)
	}

	const product = res.data
	// console.log(product)

	return (
		<>
			<ProductForm product={product} isDisabled={true} />
		</>
	)
}