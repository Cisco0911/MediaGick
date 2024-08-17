import Button from "@features/ui/components/Button";
import React from "react";
import Link from "next/link";


export default function NewVideoContentByScriptPage() {
	return (
		<div className={"w-full h-full flex flex-col justify-center items-center"}>

			<span>
				Entrez votre script
			</span>
			<div className={"flex-grow"}>

			</div>
			<Link className={"w-full"} href={"/workshop/video-content/new/settings"}>
				<Button className={"w-full px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
				        variant={"primary"}
					// onClick={submit}
					// state={submitState}
					// busyIcon={BusyIcon}
				>
					Valider
				</Button>
			</Link>

		</div>
	)
}