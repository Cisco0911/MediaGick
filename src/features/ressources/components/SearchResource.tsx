"use client"

import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import {useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";



type SearchResourceProps = {

}

export default function SearchResource({}: SearchResourceProps) {

	const [searchProduct, setSearchProduct] = useState("")

	return (
		<div className={"w-full flex justify-center"}>
			<InputFieldDefault id={"searchProduct"}
			                   type={"text"}
			                   name={"searchProduct"}
			                   value={searchProduct}
			                   onChange={(e) => setSearchProduct(e.target.value)}
			                   placeholder={"Rechercher un produit"}
			                   className={"w-full max-w-[27rem] aspect-[522/60] rounded-xl bg-secondary text-medium"}
			                   Icon={MagnifyingGlassIcon}
			/>
		</div>
	)
}