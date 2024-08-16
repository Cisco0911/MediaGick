import Button from "@features/ui/components/Button";
import React from "react";


export default function NewVideoContentByScriptPage() {
	return (
		<div className={"w-full h-full flex flex-col justify-center items-center"}>

			<span>
				Entrez votre script
			</span>
			<div className={"flex-grow"}>

			</div>
			<Button className={"w-full px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
			        variant={"primary"}
				// onClick={submit}
				// state={submitState}
				// busyIcon={BusyIcon}
			>
				Valider
			</Button>

		</div>
	)
}