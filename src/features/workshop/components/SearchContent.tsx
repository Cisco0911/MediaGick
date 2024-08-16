"use client"

import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import {useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import {VideoContent} from "@app/(app-navigation)/workshop/video-content/interfaces";


interface SearchImageContentProps {
	items?: ImageContent[] | VideoContent[]
}

export default function SearchContent({items}: SearchImageContentProps) {

	const [searchKeyWord, setSearchKeyWord] = useState("")

	return (
		<div className={"w-full flex justify-center"}>
			<InputFieldDefault id={"searchImageContent"}
			                   type={"text"}
			                   name={"searchImageContent"}
			                   value={searchKeyWord}
			                   onChange={(e) => setSearchKeyWord(e.target.value)}
			                   placeholder={"Rechercher"}
			                   className={"w-full max-w-[27rem] aspect-[522/60] rounded-xl bg-secondary text-medium"}
			                   Icon={MagnifyingGlassIcon}
			/>
		</div>
	)
}