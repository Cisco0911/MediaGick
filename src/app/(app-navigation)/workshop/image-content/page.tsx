import {getImageContents} from "@app/(app-navigation)/workshop/image-content/actions";
import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import ImageContentCard from "@features/workshop/image-content/components/ImageContentCard";
import ImageContents from "@features/workshop/image-content/ImageContents";
import {getModel} from "@app/(app-navigation)/workshop/actions";


export default async function ImageContentPage() {

	const res = await getImageContents()

	// console.log(res)

	if(!res || !res.ok) {
		return (
			<div>
				<h1>An error occurred</h1>
			</div>
		)
	}

	const imageContents = res.data

	return (
		<div className={"w-full h-full"}>

			<ImageContents imageContents={imageContents} />

		</div>
	)
}