import NextUiTextAreaCustm from "@features/ui/components/NextUiTextAreaCustm";
import React from "react";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import Button from "@features/ui/components/Button";


export default function NewVideoContentByIdeaPage() {



	return (
		<div className={"w-full h-full flex flex-col space-y-20"}>

			<NextUiTextAreaCustm type={"text"}
			                     label={"Idée général de la vidéo"}
			                     placeholder={"Parler de votre idée de vidéo..."}
			                     isRequired
			                     maxLength={120}
			                     disableAutosize
			                     customInputClass={"h-40"}
			/>

			<NextUiInputCustm type={"text"}
			                  label={"Appel à l'action (OPTIONNEL)"}
			                  placeholder={"Encourager les spectateurs à poser une action"}
			/>

			<NextUiInputCustm type={"text"}
			                  label={"Ajouter une ressource (OPTIONNEL)"}
			                  placeholder={"Ajouter des références ou des idées en plus"}
			/>

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