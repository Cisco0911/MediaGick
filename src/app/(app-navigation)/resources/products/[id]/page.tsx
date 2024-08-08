import Products from "@features/ressources/products/Products";
import {Product} from "@app/_lib/interfaces";
import clsx from "clsx";
import {Chip} from "@nextui-org/chip";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import NextUiSelectCustm from "@features/ui/components/NextUiSelectCustm";
import {enumToArray} from "@app/_lib/function_lib";
import {CurrencyEnum, OfferNatureEnum, TypeProductEnum} from "@app/_lib/enums";
import NextUiTextAreaCustm from "@features/ui/components/NextUiTextAreaCustm";
import React from "react";
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@heroicons/react/24/outline";
import LogoImage from "@features/ui/components/LogoImage";
import DescriptiveImageDropZone from "@features/ui/components/DescriptiveImageDropZone";
import Image from "next/image";
import {useWatch} from "react-hook-form";
import {CheckBadgeIcon, CheckCircleIcon} from "@heroicons/react/24/solid";
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