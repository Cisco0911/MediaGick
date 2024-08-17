"use client"

import {Product} from "@app/_lib/interfaces";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import clsx from "clsx";
import ResourceDetailCard from "@features/ressources/components/ResourceDetailCard";
import {ModelContenu} from "@app/(app-navigation)/workshop/interfaces";
import NextUiSelectCustm from "@features/ui/components/NextUiSelectCustm";
import React from "react";
import {FieldErrors, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddImageContentFormSchema} from "@app/(app-navigation)/workshop/image-content/new/schemas";
import {
	AddImageContentForm,
	AddImageContentPostData
} from "@app/(app-navigation)/workshop/image-content/new/interfaces";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import Button from "@features/ui/components/Button";
import {ArrowLongLeftIcon} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import {addProduct} from "@app/_lib/actions/fetchData";
import {addImageContent} from "@app/(app-navigation)/workshop/image-content/actions";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {isValidURL} from "@app/_lib/actions/funcs";
import Link from "next/link";
import {ListenCreateContent} from "@app/_lib/taskSubjects";
import {AddVideoContent, AddVideoContentSettingForm} from "@app/(app-navigation)/workshop/video-content/interfaces";
import {AddVideoContentSettingSchema} from "@app/(app-navigation)/workshop/video-content/schemas";
import {addVideoContent} from "@app/(app-navigation)/workshop/video-content/actions";
import {PositionFiligrane, qualities} from "@app/(app-navigation)/workshop/video-content/new/enums";


type NewVideoContentSettingProps = {
	models: ModelContenu[]
}


export default function NewVideoContentSetting({models}: NewVideoContentSettingProps) {

	// console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<AddVideoContentSettingForm>({
		resolver: zodResolver(AddVideoContentSettingSchema),
	});

	const router = useRouter()

	// console.log(models[2])

	const modelsOptions = models.reduce((acc, model) => {
		acc[model.nom] = model.id;
		return acc;
	}, {} as { [key: string]: string });
	const selectedModelId = useWatch({
		control,
		name: "id_modele",
		defaultValue: ""
	})
	const selectedModel = models.find( model => model.id === selectedModelId );

	async function onValid(data: AddVideoContentSettingForm) {
		const postData: AddVideoContent = {
			...data,
			script: "",
			call_to_action: ""
		}
		console.log(postData)
		// return

		let toastId = ""

		try {

			// setBusy(true);
			toastId = toast.loading('Ajout du contenu...');

			const res = await addVideoContent(postData);

			console.log(res)
			if (res && !res.ok){

				toast.error(`${res.error}`);

				toast.dismiss(toastId)
				// setBusy(false);
			}
			// else {
			//
			// 	toast.dismiss(toastId)
			// 	toast("Creation du contenu en cours...")
			// 	ListenCreateContent.next()
			// 	console.log(res)
			//
			// 	// setTimeout(() => {
			// 	// 	router.push("/workshop/image-content")
			// 	// }, 1000)
			// 	// setBusy(false);
			// }
		}
		catch (err) {
			toast.dismiss(toastId)
			console.log(err)
			toast.error(`${err}`);

			// setBusy(false);
		}
	}
	function onInvalid(errors: FieldErrors<AddVideoContentSettingForm>) {
		console.log(errors)
	}

	return (
		<div className={clsx(
			"w-full h-full p-10 rounded-3xl bg-tertiary",
			"flex justify-center items-center space-x-10"
		)}>
			<form onSubmit={handleSubmit(onValid, onInvalid)}
			      className={"flex-grow px-2 h-full overflow-auto flex flex-col space-y-10"}
				// style={{
				//   overflowX: "visible",
				// }}
			>

				<Link href={"/workshop/video-content/new"} className={"w-fit flex items-center space-x-2.5"}>
					<ArrowLongLeftIcon className={"size-6 fill-custom_white"}/>
					<span className={"text-xl"}>
						Paramètres
					</span>
				</Link>

				<div className={"w-full"}>
					<NextUiSelectCustm label={"Choix du modele"}
					                   placeholder={"Template"}
					                   itemArray={modelsOptions}
					                   error={errors?.id_modele?.message}
					                   {...register("id_modele")}
					/>
				</div>

				<div className={"w-full flex flex-col space-y-1.5"}>
					<span>
						Apercu du Modèle
					</span>
					<div className={clsx(
						"relative rounded-xl bg-secondary/50 text-custom_white/50",
						"flex justify-center items-center overflow-hidden",
					)}
					     style={{
						     width: `${(selectedModel?.largeur || 20 * 54) * 19 / (54 * 19)}rem`,
						     aspectRatio: (selectedModel?.largeur || 1.5) / (selectedModel?.longueur || 1)
					     }}
					>
						{
							selectedModel && isValidURL(selectedModel.vignette) ?
								<Image src={selectedModel.vignette}
								       alt={"Apercu du Modèle"}
								       fill
								       className={"object-cover"}
								/> : "Apercu"
						}
					</div>
				</div>

				<div className={"w-full"}>
					<NextUiSelectCustm label={"Qualité de sortie"}
					                   placeholder={"Choix qualité"}
					                   itemArray={qualities}
					                   error={errors?.qualite?.message}
					                   {...register("qualite")}
					/>
				</div>

				<div>
					<NextUiInputCustm type={"text"}
					                  label={"Filigrane (Optionnel)"}
					                  placeholder={"Entrez un texte qui sera utilisé pour protéger votre vidéo"}
					                  error={errors?.filigrane?.message}
					                  {...register("filigrane")}
					/>
				</div>

				<div>
					<NextUiSelectCustm label={"Position du filigrane"}
					                   placeholder={"Aucune"}
					                   itemArray={PositionFiligrane}
					                   error={errors?.position_filigrane?.message}
					                   {...register("position_filigrane")}
					/>
				</div>

				<div className={"w-full flex justify-center"}>
					<Button type={"submit"}
					        variant={"primary"}
					        className={"w-[18rem] px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
					>
						Valider
					</Button>
				</div>

			</form>

		</div>
	)
}