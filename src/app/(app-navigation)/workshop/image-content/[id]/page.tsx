import React from "react";
import {getImageContent} from "@app/(app-navigation)/workshop/image-content/actions";
import ImageContentEdit from "@features/workshop/image-content/components/ImageContentEdit";






type ImageContentPageProps = {
	params: {
		id: number
	}
}


export default async function ImageContentPage({params}: ImageContentPageProps) {

	const res = await getImageContent(params.id)

	if (!res.ok){
		return (
			<div>
				<h1>Image content not found</h1>
			</div>
		)
	}

	const imageContent = res.data

	// console.log(imageContent)

	return (

		<div className={"w-full h-full"}>
			<ImageContentEdit imageContent={imageContent} />
		</div>
	)
}