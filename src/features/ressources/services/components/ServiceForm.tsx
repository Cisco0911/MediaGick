"use client"

import clsx from "clsx";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import NextUiSelectCustm from "@features/ui/components/NextUiSelectCustm";
import NextUiTextAreaCustm from "@features/ui/components/NextUiTextAreaCustm";
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@heroicons/react/24/outline";
import LogoImage from "@features/ui/components/LogoImage";
import DescriptiveImageDropZone from "@features/ui/components/DescriptiveImageDropZone";
import {CheckBadgeIcon, CheckCircleIcon, PaintBrushIcon} from "@heroicons/react/24/solid";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddProductSchema, UpdateProductSchema} from "@app/_lib/schemas";
import {useRef, useState} from "react";
import {isEmpty} from "@nextui-org/shared-utils";
import toast from "react-hot-toast";
import {addProduct, updateProduct} from "@app/_lib/actions/fetchData";
import {enumToArray} from "@app/_lib/function_lib";
import {CurrencyEnum, OfferNatureEnum} from "@app/_lib/enums";
import Image from "next/image";
import React from "react";
import {Chip} from "@nextui-org/chip";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import {AddServiceSchema, UpdateServiceSchema} from "@app/(app-navigation)/resources/services/schemas";
import {TypeServiceEnum} from "@app/(app-navigation)/resources/services/enums";
import {addService, updateService} from "@app/(app-navigation)/resources/services/actions";




type ProductProps = {
	service: Service,
	isUpdate?: boolean
}


export default function ServiceForm({ service, isUpdate }: ProductProps) {

	const [readOnly, setReadOnly] = useState(isUpdate)

	// if (isUpdate) service = service as Service

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control,
	} = useForm({
		resolver: zodResolver(AddServiceSchema),
		defaultValues: service,
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

		data = isUpdate ? UpdateServiceSchema.safeParse(data) : AddServiceSchema.safeParse(data)

		// console.log(data)
		// return;

		if (data.success){

			data = data.data

			data.attributs_offres = data.attributs_offres.filter((attr: { nom: string; valeur: string; }) => attr.nom !== "" && attr.valeur !== "");

			if (!isUpdate){
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
		}
		else {
			toast.error('Veuillez remplir tous les champs')
			return
		}

		if (!isUpdate){
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
		}
		// else {
		// 	toast.error('Veuillez ajouter des images de description')
		// 	return
		// }

		// console.log(formData.get("attributs_offres"))

		try {

			setBusy(true);

			const res = isUpdate ? await updateService(service.id, data) : await addService(formData);

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

			<div className={clsx(
				"max-w-[35rem] h-full flex-grow overflow-auto",
				"flex flex-col space-y-7",
			)}>

				<Chip
					size={"lg"}
					variant={"faded"}
					color={"danger"}
					classNames={{
						base: "bg-primary/[0.02] border-danger",
						content: "",
					}}
				>
					Service
				</Chip>

				{
					isUpdate &&
					<div className={"flex items-center space-x-4"}>

						<Button className={"bg-custom_white text-lg text-black font-bold"}
						        endContent={ <PaintBrushIcon className={"size-6 fill-black"} /> }
						>
							Créer un contenu
						</Button>
						<Button color={"primary"}  className={"text-lg text-black font-bold"}
						        onClick={ () => setReadOnly(!readOnly) }
						>
							{readOnly ? "Modifier" : "Annuler"}
						</Button>
						<Button color={"danger"}  className={"text-lg text-black font-bold"}>
							Supprimer
						</Button>

					</div>
				}

				<form className={clsx(
					"w-full h-full px-2 flex flex-col space-y-7",
					// {"pointer-events-none": readOnly}
				)}
				      onSubmit={handleSubmit(submit)}
				>

					<div>
						<NextUiInputCustm type={"text"}
						                  label={"Nom Service"}
						                  placeholder={"Service"}
						                  isDisabled={readOnly}
						                  error={errors?.libelle?.message}
						                  {...register("libelle")}
						/>
					</div>

					<div>
						<NextUiSelectCustm label={"Type de Service"}
						                   placeholder={"Type"}
						                   itemArray={enumToArray(TypeServiceEnum)}
						                   disabled={readOnly}
						                   error={errors?.type?.message}
						                   {...register("type")}
						/>
					</div>

					<div>
						<NextUiSelectCustm label={"Nature du Service"}
						                   placeholder={"ex: Combustible"}
						                   itemArray={enumToArray(OfferNatureEnum)}
						                   disabled={readOnly}
						                   error={errors?.nature?.message}
						                   {...register("nature")}
						/>
					</div>

					<div>
						<NextUiTextAreaCustm type={"text"}
						                     label={"Description du Service"}
						                     placeholder={"Description"}
						                     isDisabled={readOnly}
						                     error={errors?.description?.message}
						                     {...register("description")}
						/>
					</div>

					<div className={"w-full flex justify-between items-center space-x-4"}>

						<NextUiInputCustm type={"number"}
						                  label={"Prix"}
						                  placeholder={"Prix"}
						                  isDisabled={readOnly}
						                  error={errors?.prix?.message}
						                  {...register("prix", {valueAsNumber: true})}
						/>

						<NextUiSelectCustm label={"Devise"}
						                   placeholder={"Devise"}
						                   itemArray={enumToArray(CurrencyEnum)}
						                   disabled={readOnly}
						                   error={errors?.devise_prix?.message}
						                   {...register("devise_prix")}
						/>

						<NextUiInputCustm type={"text"}
						                  label={"Prix Unitaire"}
						                  placeholder={"Par kg"}
						                  isDisabled={readOnly}
						                  error={errors?.unite_prix?.message}
						                  {...register("unite_prix")}
						/>

					</div>

					<div>
						<NextUiInputCustm type={"number"}
						                  label={"Garantie"}
						                  placeholder={"Garantie"}
						                  isDisabled={readOnly}
						                  error={errors?.nombre_jours_garantie?.message}
						                  {...register("nombre_jours_garantie", {valueAsNumber: true})}
						/>
					</div>

					<div>
						<NextUiInputCustm type={"number"}
						                  label={"Durée du service"}
						                  placeholder={"ex: 2"}
						                  isDisabled={readOnly}
						                  error={errors?.duree?.message}
						                  {...register("duree", {valueAsNumber: true})}
						/>
					</div>

					<div>
						<NextUiInputCustm type={"text"}
						                  label={"Lieu de Prestation"}
						                  placeholder={"ex: ADIDOGOME"}
						                  isDisabled={readOnly}
						                  error={errors?.lieu_prestation?.message}
						                  {...register("lieu_prestation")}
						/>
					</div>

					<div>
						<NextUiInputCustm type={"text"}
						                  label={"Numero du marchand"}
						                  placeholder={"ex: +228 XX XX XX XX"}
						                  isDisabled={readOnly}
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
                                                          label={"Attribut du Service"}
                                                          placeholder={"Libelle attribut" + index}
                                                          isDisabled={readOnly}
                                                          error={attributesOffreErrors[index]?.nom?.message}
										                  {...register(`attributs_offres.${index}.nom`)}
                                        />

                                        <NextUiInputCustm type={"text"}
                                                          label={" "}
                                                          placeholder={"Valeur"}
                                                          isDisabled={readOnly}
                                                          error={attributesOffreErrors[index]?.valeur?.message}
										                  {...register(`attributs_offres.${index}.valeur`)}
                                        />
                                    </React.Fragment>
								))
							}

							<Button color={"primary"}
							        className={"text-tertiary font-semibold flex-shrink-0"}
							        endContent={<PlusIcon className={"size-4 stroke-tertiary"}/>}
							        isDisabled={readOnly}
								// disabled={attributesOffreErrors[attOffreIndex[attOffreIndex.length - 1]]?.nom || attributesOffreErrors[attOffreIndex[attOffreIndex.length - 1]]?.valeur}
								    onClick={addAtt}>
								Ajouter
							</Button>

						</div>

					</div>

					<div className={"w-full flex flex-col space-y-1"}>
						<span className={"text-foreground font-normal"}>Logo</span>
						<LogoImage onChange={files => setLogoImage(files[0])}/>
					</div>

					<div className={"w-full flex flex-col space-y-1"}>
						<span className={"text-foreground font-normal"}>Image descriptives</span>
						<DescriptiveImageDropZone onChange={files => descriptiveImages.current = files}/>
					</div>

					<div className={"w-full flex justify-center"}>
						<Button type={"submit"} isDisabled={isBusy || readOnly }>Ajouter</Button>
					</div>

				</form>

			</div>

			<div className={clsx(
				"aspect-[393/572] h-full w-fit px-5 py-6 rounded-[1.6rem] bg-primary/20",
				"flex-shrink-0 flex-col items-center space-y-5",
				"hidden xl:flex"
			)}>

				<div className={"relative w-full h-1/2 rounded-2xl object-cover overflow-hidden"}>
					{
						!isUpdate ?
						(
							logoImage &&
							<Image src={URL.createObjectURL(logoImage)}
	                               alt={"Service Logo"}
	                               fill
	                        />
						):
							(
								service.logo &&
								<Image src={service.logo}
								       alt={"Service Logo"}
								       fill
								/>
							)
					}
				</div>

				<div className={"w-full flex-grow flex flex-col justify-between"}>

					<div className={"flex items-center py-1.5 space-x-2.5"}>
						<span className={"text-white text-2xl font-bold"}>
							{
								isUpdate ? service.libelle :
									useWatch({
										control,
										name: "libelle",
										defaultValue: "_____",
									})
							}
						</span>
						<CheckBadgeIcon className={clsx(
							"size-7 fill-primary flex-shrink-0",
						)}/>
					</div>

					<div className={"flex flex-col space-y-0.5"}>
						<span className={"text-white text-2xl font-bold"}>
							Prix
						</span>
						<span className={"text-sm font-normal"}>
							{
								isUpdate ? service.prix :
									useWatch({
										control,
										name: "prix",
										defaultValue: 0,
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
								isUpdate ? service.description :
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
							"text-2xl font-semibold",
							{"text-green-500": service.est_disponible},
							{"text-red-500": !service.est_disponible},
						)}>
							{
								isUpdate ?
									( service.est_disponible ? "Disponible" : "Indisponible" ) :
									"Disponible"
							}
						</span>
						<CheckCircleIcon className={clsx(
							"size-5",
							{"fill-green-500": service.est_disponible},
							{"fill-red-500": !service.est_disponible},
						)}/>
					</div>

				</div>

			</div>

		</div>
	)
}