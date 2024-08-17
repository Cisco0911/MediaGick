"use client"

import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import {useEffect, useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useUrlQuery} from "@app/_lib/hooks/hooks";
import {isEmpty} from "@nextui-org/shared-utils";
import {Product} from "@app/_lib/interfaces";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import {getProducts} from "@app/_lib/actions/fetchData";
import {getServices} from "@app/(app-navigation)/resources/services/actions";
import clsx from "clsx";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";


interface HighlightMatchProps {
	text: string,
	highlight: string
}

export function HighlightMatch({text, highlight}: HighlightMatchProps) {
	if (!highlight) {
		return text;
	}

	const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

	return (
		<span>
            {parts.map((part, index) =>
	            part.toLowerCase() === highlight.toLowerCase() ? (
		            <span key={index} className={"text-primary font-black"}>
                        {part}
                    </span>
	            ) : (
		            part
	            )
            )}
        </span>
	);
}


export default function SearchResource() {

	const urlQuery = useUrlQuery()

	const [resources, setResources] = useState<Product[] | Service[]>([])

	const [searchKeyWord, setSearchKeyWord] = useState("")

	useEffect(() => {
		if (urlQuery.pathname === "/resources/products") {
			getProducts()
				.then(res => {
					if (res && res.ok) {
						setResources(res.data)
					}
				})
				.catch(err => {
					console.log(err)
				})
		} else if (urlQuery.pathname === "/resources/services") {
			getServices()
				.then(res => {
					if (res && res.ok) {
						setResources(res.data)
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, []);

	const matchResources = resources.filter((resource) => {
		return resource.libelle.toLowerCase().includes(searchKeyWord.toLowerCase())
	})

	return (
		<div className={"relative w-full flex flex-col justify-center items-center space-y-2.5"}>
			<InputFieldDefault id={"searchKeyWord"}
			                   type={"text"}
			                   name={"searchKeyWord"}
			                   value={searchKeyWord}
			                   onChange={(e) => setSearchKeyWord(e.target.value)}
			                   placeholder={"Rechercher un produit"}
			                   className={"w-full max-w-[27rem] aspect-[522/60] rounded-xl bg-secondary text-medium"}
			                   Icon={MagnifyingGlassIcon}
			/>

			{
				!isEmpty(searchKeyWord) &&
                <div
                    className={"absolute z-10 top-[100%] max-w-[27rem] w-full h-auto p-5 rounded-xl bg-secondary/50 backdrop-blur-md"}>

					{
						matchResources.length > 0 ?
							matchResources.map((resource, index) => {

								return (
									<Link
										key={index}
										href={`${urlQuery.pathname}/${resource.id}`}
										className={"w-full flex justify-between items-center rounded-lg bg-tertiary/60 p-2.5"}
										// onClick={() => setSearchResource("")}
									>
										<HighlightMatch text={resource.libelle} highlight={searchKeyWord}/>
										<div className={"flex items-center space-x-1"}>
											<span className={clsx(
												"text-medium font-medium",
												(resource.est_disponible ? "text-green-500" : "text-red-500"),
											)}>
												{resource.est_disponible ? "Disponible" : "Indisponible"}
											</span>
											{
												resource.est_disponible
													? <CheckCircleIcon className={"size-4 fill-green-500"}/>
													: <CheckCircleIcon className={"size-4 fill-red-500"}/>
											}
										</div>
									</Link>
								)
							}) :
							<div className={"text-center text-tertiary"}>Aucun résultat</div>
					}

                </div>
			}
		</div>
	)
}