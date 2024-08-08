"use client"

import clsx from "clsx";
import {Chip} from "@nextui-org/chip";
import {Input} from "@nextui-org/input";
import {useForm, useWatch} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {AddProductSchema} from "@app/_lib/schemas";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import {Button} from "@nextui-org/button";
import NextUiSelectCustm from "@features/ui/components/NextUiSelectCustm";
import {enumToArray} from "@app/_lib/function_lib";
import {CurrencyEnum, OfferNatureEnum, TypeProductEnum} from "@app/_lib/enums";
import NextUiTextAreaCustm from "@features/ui/components/NextUiTextAreaCustm";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useRef, useState} from "react";
import React from "react";
import {isEmpty} from "@nextui-org/shared-utils";
import DescriptiveImageDropZone from "@features/ui/components/DescriptiveImageDropZone";
import LogoImage from "@features/ui/components/LogoImage";
import {z} from "zod";
import toast from "react-hot-toast";
import {addProduct} from "@app/_lib/actions/fetchData";
import {Image as Img} from "@nextui-org/image";
import Image from "next/image";
import {CheckBadgeIcon, CheckCircleIcon} from "@heroicons/react/24/solid";


export default function NewProductPage() {

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control,
	} = useForm({
		resolver: zodResolver(AddProductSchema),
	});

	const attributesOffreErrors : any = errors?.attributs_offres || []
	const [attOffreIndex, setAttOffreIndex] = useState<number[]>([0])

	// console.log(attributesOffreErrors, attOffreIndex)
	// console.log(errors)

	function addAtt()
	{
		// setAttOffreIndex([...attOffreIndex, attOffreIndex[attOffreIndex.length - 1] + 1])
		const currentAtt = getValues("attributs_offres")[attOffreIndex.length - 1]

		if (currentAtt && !isEmpty(currentAtt.nom) && !isEmpty(currentAtt.valeur))
		{
			setAttOffreIndex([...attOffreIndex, attOffreIndex[attOffreIndex.length - 1] + 1])
		}
	}


	const [logoImage, setLogoImage] = useState<File | null>(null)
	let descriptiveImages = useRef<File[]>([])

	const [isBusy, setBusy] = useState(false)

	async function submit(data: any)
	{
		let formData = new FormData();

		data = AddProductSchema.safeParse(data)

		// console.log(data)
		// return;

		if (data.success){

			data = data.data

			data.attributs_offres = data.attributs_offres.filter((attr: { nom: string; valeur: string; }) => attr.nom !== "" && attr.valeur !== "");

			for (let key in data) {
				if (key === 'attributs_offres') {
					// Append the stringified attributs_offres
					formData.append(key, JSON.stringify(data[key]));
				} else {
					// Append other properties
					formData.append(key, data[key]);
				}
			}
		}
		else {
			toast.error('Veuillez remplir tous les champs')
			return
		}

		if (logoImage)
		{
			formData.append('logo', logoImage)
		}
		else {
			toast.error('Veuillez ajouter une image de logo')
			return
		}

		if (descriptiveImages.current)
		{
			for (let i = 0; i < descriptiveImages.current.length; i++) {
				formData.append('descriptive_images', descriptiveImages.current[i])
			}
		}
		// else {
		// 	toast.error('Veuillez ajouter des images de description')
		// 	return
		// }

		// console.log(formData.get("attributs_offres"))

		try {

			setBusy(true);

			const res = await addProduct(formData);

			if (res && !res.ok){

				toast.error(`${res.error}`);

				setBusy(false);
			}
		}
		catch (err) {
			console.log(err)
			toast.error(`${err}`);

			setBusy(false);
		}


	}

	return (
		<div className={clsx(
			"w-full h-full flex justify-center items-center space-x-2.5"
		)}>

			<div className={"max-w-[35rem] h-full px-5 py-6 flex-grow overflow-auto"}>

				<div className={"w-full h-full flex flex-col space-y-7"}>

					<Chip
						size={"lg"}
						variant={"faded"}
						color={"primary"}
						classNames={{
							base: "bg-primary/[0.02] border-primary",
							content: "",
						}}
					>
						Produit
					</Chip>

					<form className={"w-full h-full px-2 flex flex-col space-y-7 overflow-auto"}
					      onSubmit={handleSubmit(submit)}
					>

						<div>
							<NextUiInputCustm type={"text"}
							                  label={"Nom Produit"}
							                  placeholder={"Produit"}
							                  error={errors?.libelle?.message}
							                  {...register("libelle")}
							/>
						</div>

						<div>
							<NextUiSelectCustm label={"Type de Produit"}
							                   placeholder={"Type"}
							                   itemArray={enumToArray(TypeProductEnum)}
							                   error={errors?.type?.message}
							                   {...register("type")}
							/>
						</div>

						<div>
							<NextUiSelectCustm label={"Nature du Produit"}
							                   placeholder={"ex: Combustible"}
							                   itemArray={enumToArray(OfferNatureEnum)}
							                   error={errors?.nature?.message}
							                   {...register("nature")}
							/>
						</div>

						<div>
							<NextUiTextAreaCustm type={"text"}
							                     label={"Description du Produit"}
							                     placeholder={"Description"}
							                     error={errors?.description?.message}
							                     {...register("description")}
							/>
						</div>

						<div className={"w-full flex justify-between items-center space-x-4"}>

							<NextUiInputCustm type={"number"}
							                  label={"Prix"}
							                  placeholder={"Prix"}
							                  error={errors?.prix?.message}
							                  {...register("prix", {valueAsNumber: true})}
							/>

							<NextUiSelectCustm label={"Devise"}
							                   placeholder={"Devise"}
							                   itemArray={enumToArray(CurrencyEnum)}
							                   error={errors?.devise_prix?.message}
							                   {...register("devise_prix")}
							/>

							<NextUiInputCustm type={"text"}
							                  label={"Prix Unitaire"}
							                  placeholder={"Par kg"}
							                  error={errors?.unite_prix?.message}
							                  {...register("unite_prix")}
							/>

						</div>

						<div>
							<NextUiInputCustm type={"number"}
							                  label={"Garantie"}
							                  placeholder={"Garantie"}
							                  error={errors?.nombre_jours_garantie?.message}
							                  {...register("nombre_jours_garantie", {valueAsNumber: true})}
							/>
						</div>

						<div>
							<NextUiInputCustm type={"number"}
							                  label={"Quantite Disponible"}
							                  placeholder={"ex: 1000"}
							                  error={errors?.qte_disponible?.message}
							                  {...register("qte_disponible", {valueAsNumber: true})}
							/>
						</div>

						<div>
							<NextUiInputCustm type={"text"}
							                  label={"Numero du marchand"}
							                  placeholder={"ex: +228 XX XX XX XX"}
							                  error={errors?.telephone_marchand?.message}
							                  {...register("telephone_marchand")}
							/>
						</div>

						<div className={"w-full flex flex-col"}>

							<div className={"w-full flex justify-between items-end space-x-4"}>

								{
									attOffreIndex.map((_, index) => (
										index === attOffreIndex.length - 1 &&
                                        <React.Fragment key={index}>
                                            <NextUiInputCustm type={"text"}
                                                              label={"Attribut Produit"}
                                                              placeholder={"Libelle attribut" + index}
                                                              error={attributesOffreErrors[index]?.nom?.message}
											                  {...register(`attributs_offres.${index}.nom`)}
                                            />

                                            <NextUiInputCustm type={"text"}
                                                              label={" "}
                                                              placeholder={"Valeur"}
                                                              error={attributesOffreErrors[index]?.valeur?.message}
											                  {...register(`attributs_offres.${index}.valeur`)}
                                            />
                                        </React.Fragment>
									))
								}

								<Button color={"primary"}
								        className={"text-tertiary font-semibold flex-shrink-0"}
								        endContent={<PlusIcon className={"size-4 stroke-tertiary"}/>}
									// disabled={attributesOffreErrors[attOffreIndex[attOffreIndex.length - 1]]?.nom || attributesOffreErrors[attOffreIndex[attOffreIndex.length - 1]]?.valeur}
									    onClick={addAtt}>
									Ajouter
								</Button>

							</div>

						</div>

						<div className={"w-full flex flex-col space-y-1"}>
							<span className={"text-foreground font-normal"}>Logo</span>
							<LogoImage onChange={files => setLogoImage(files[0])} />
						</div>

						<div className={"w-full flex flex-col space-y-1"}>
							<span className={"text-foreground font-normal"}>Image descriptives</span>
							<DescriptiveImageDropZone onChange={files => descriptiveImages.current = files} />
						</div>

						<div className={"w-full flex justify-center"}>
							<Button type={"submit"} isDisabled={isBusy}>Ajouter</Button>
						</div>

					</form>

				</div>

			</div>

			<div className={clsx(
				"aspect-[393/572] h-full w-fit px-5 py-6 rounded-[1.6rem] bg-primary/20",
				"flex-shrink-0 flex-col items-center space-y-5",
				"hidden xl:flex"
			)}>

				<div className={"relative w-full h-1/2 rounded-2xl object-cover overflow-hidden"}>
					{
						logoImage &&
						// <Img
						//     width={"100%"}
						//     alt="Produit Logo"
						//     src={URL.createObjectURL(logoImage)}
						// />
                        <Image src={URL.createObjectURL(logoImage)}
                               alt={"Produit Logo"}
                               fill
                        />
					}
				</div>

				<div className={"w-full flex-grow flex flex-col justify-between"}>

					<div className={"flex items-center py-1.5 space-x-2.5"}>
						<span className={"text-white text-2xl font-bold"}>
							{
								useWatch({
									control,
									name: "libelle",
									defaultValue: "_____",
								})
							}
						</span>
						<CheckBadgeIcon className={clsx(
							"size-7 fill-primary",
						)}/>
					</div>

					<div className={"flex flex-col space-y-0.5"}>
						<span className={"text-white text-2xl font-bold"}>
							Prix
						</span>
						<span className={"text-sm font-normal"}>
							{
								useWatch({
									control,
									name: "prix",
									defaultValue: "_____",
								})
							} FCFA
						</span>
					</div>

					<div className={"flex flex-col space-y-0.5"}>
						<span className={"text-white text-2xl font-bold"}>
							Description
						</span>
						<span className={"text-sm font-normal"}>
							{
								useWatch({
									control,
									name: "description",
									defaultValue: "_____",
								})
							}
						</span>
					</div>

					<div className={"flex items-center space-x-1"}>
						<span className={clsx(
							"text-2xl font-semibold text-green-500",
						)}>
							Disponible
						</span>
						<CheckCircleIcon className={clsx(
							"size-5 fill-green-500",
						)}/>
					</div>

				</div>

			</div>

		</div>
	)
}