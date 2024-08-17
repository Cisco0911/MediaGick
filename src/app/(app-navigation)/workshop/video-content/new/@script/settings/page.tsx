import React from "react";
import {getModels} from "@app/(app-navigation)/workshop/actions";
import NewVideoContentSetting from "@features/workshop/video-content/NewVideoContentSetting";


export default async function SettingsPage() {

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
			<NewVideoContentSetting models={models.data}/>

			{/*<TaskResponseDisplay />*/}
		</div>
	)

}