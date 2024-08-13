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


type NewImageContentProps = {
	resource: Product | Service,
	resource_type: string,
	models: ModelContenu[]
}


export default function NewImageContent({resource, resource_type, models}: NewImageContentProps) {

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<AddImageContentForm>({
		resolver: zodResolver(AddImageContentFormSchema),
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

	async function onValid(data: AddImageContentForm) {
		const postData: AddImageContentPostData = {
			...data,
			id_offre: resource.id,
			type_offre: resource_type === "product" ? 1 : 2,
		}
		console.log(postData)

		let toastId = ""

		try {

			// setBusy(true);
			toastId = toast.loading('Ajout du contenu...');

			const res = await addImageContent(postData);

			if (res && !res.ok){

				toast.error(`${res.error}`);

				toast.dismiss(toastId)
				// setBusy(false);
			}
			else {

				toast.dismiss(toastId)
				toast.success("Contenu ajouté avec succes")
				console.log(res)

				// setTimeout(() => {
				// 	router.push("/workshop/image-content")
				// }, 1000)
				// setBusy(false);
			}
		}
		catch (err) {
			toast.dismiss(toastId)
			console.log(err)
			toast.error(`${err}`);

			// setBusy(false);
		}
	}
	function onInvalid(errors: FieldErrors<AddImageContentForm>) {
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

				<Link href={"/workshop/image-content"} className={"flex items-center space-x-2.5"}>
					<ArrowLongLeftIcon className={"size-6 fill-custom_white"}/>
					<span className={"text-xl"}>
						Création d&apos;image
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
					<span >
						Apercu du Modèle
					</span>
					<div className={clsx(
							"relative rounded-xl bg-secondary/50 text-custom_white/50",
							"flex justify-center items-center overflow-hidden",
						)}
					     style={{
							 width: `${(selectedModel?.largeur || 20*54)*19/(54*19)}rem`,
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

				<div className={"w-full flex space-x-10"}>

					<NextUiInputCustm type={"number"}
					                  label={"Longeur"}
					                  placeholder={"1080"}
					                  error={errors?.hauteur?.message}
					                  {...register("hauteur", {valueAsNumber: true})}
					/>
					<NextUiInputCustm type={"text"}
					                  label={"Largeur"}
					                  placeholder={"1080"}
					                  error={errors?.largeur?.message}
					                  {...register("largeur", {valueAsNumber: true})}
					/>

				</div>

				<div className={"w-full flex justify-center"}>
					<Button type={"submit"}
					        variant={"primary"}
					        className={"w-[18rem] px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
					>
						Créer le contenu
					</Button>
				</div>

			</form>

			<div className={"flex-shrink-0 h-full"}>
				<ResourceDetailCard resource={resource}/>
			</div>
		</div>
	)
}