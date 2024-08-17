"use client"

import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import {useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import {VideoContent} from "@app/(app-navigation)/workshop/video-content/interfaces";
import {isEmpty} from "@nextui-org/shared-utils";
import Link from "next/link";
import clsx from "clsx";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import {HighlightMatch} from "@features/ressources/components/SearchResource";


interface SearchImageContentProps {
	items: ImageContent[] | VideoContent[]
}

export default function SearchContent({items}: SearchImageContentProps) {

	const [searchKeyWord, setSearchKeyWord] = useState("")

	const matchingItems = items.filter((item) => {
		return item.titre.toLowerCase().includes(searchKeyWord.toLowerCase())
	})

	return (
		<div className={"relative w-full flex flex-col justify-center items-center space-y-2.5"}>
			<InputFieldDefault id={"searchImageContent"}
			                   type={"text"}
			                   name={"searchImageContent"}
			                   value={searchKeyWord}
			                   onChange={(e) => setSearchKeyWord(e.target.value)}
			                   placeholder={"Rechercher"}
			                   className={"w-full max-w-[27rem] aspect-[522/60] rounded-xl bg-secondary text-medium"}
			                   Icon={MagnifyingGlassIcon}
			/>
			{
				!isEmpty(searchKeyWord) &&
                <div
                    className={"absolute z-10 top-[100%] max-w-[27rem] w-full h-auto p-5 rounded-xl bg-secondary/50 backdrop-blur-md"}>

					{
						matchingItems.length > 0 ?
							matchingItems.map((item, index) => {

								return (
									<div
										key={index}
										className={"w-full flex justify-between items-center rounded-lg bg-tertiary/60 p-2.5"}
										// onClick={() => setSearchResource("")}
									>
										<HighlightMatch text={item.titre} highlight={searchKeyWord}/>
										{/*<div className={"flex items-center space-x-1"}>*/}
										{/*	<span className={clsx(*/}
										{/*		"text-medium font-medium",*/}
										{/*		(item.est_disponible ? "text-green-500" : "text-red-500"),*/}
										{/*	)}>*/}
										{/*		{item.est_disponible ? "Disponible" : "Indisponible"}*/}
										{/*	</span>*/}
										{/*	{*/}
										{/*		item.est_disponible*/}
										{/*			? <CheckCircleIcon className={"size-4 fill-green-500"}/>*/}
										{/*			: <CheckCircleIcon className={"size-4 fill-red-500"}/>*/}
										{/*	}*/}
										{/*</div>*/}
									</div>
								)
							}) :
							<div className={"text-center text-tertiary"}>Aucun résultat</div>
					}

                </div>
			}
		</div>
	)
}