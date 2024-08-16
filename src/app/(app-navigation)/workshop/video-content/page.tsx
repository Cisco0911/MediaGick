import VideoContents from "@features/workshop/video-content/VideoContents";
import {getVideoContents} from "@app/(app-navigation)/workshop/video-content/actions";






export default async function VideoContentPage() {

	const res = await getVideoContents()

	// console.log(res)

	if(!res || !res.ok) {
		return (
			<div>
				<h1>An error occurred</h1>
			</div>
		)
	}

	const videoContents = res.data



	return (
		<div className={"w-full h-full"}>

			<VideoContents videoContents={videoContents}/>

		</div>
	)
}