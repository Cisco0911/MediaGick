"use client"

import {Product} from "@app/_lib/interfaces";
import clsx from "clsx";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import NextUiSelectCustm from "@features/ui/components/NextUiSelectCustm";
import NextUiTextAreaCustm from "@features/ui/components/NextUiTextAreaCustm";
import {Button} from "@nextui-org/button";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import LogoImage from "@features/ui/components/LogoImage";
import DescriptiveImageDropZone from "@features/ui/components/DescriptiveImageDropZone";
import {CheckBadgeIcon, CheckCircleIcon, PaintBrushIcon, XCircleIcon} from "@heroicons/react/24/solid";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddProductSchema, UpdateProductSchema} from "@app/_lib/schemas";
import {useRef, useState} from "react";
import {isEmpty} from "@nextui-org/shared-utils";
import toast from "react-hot-toast";
import {addProduct, deleteProduct, updateProduct} from "@app/_lib/actions/fetchData";
import {Currency, CurrencyEnum, OfferNature, OfferNatureEnum, TypeProduct} from "@app/_lib/enums";
import Image from "next/image";
import React from "react";
import {Chip} from "@nextui-org/chip";
import {useRouter} from "next/navigation";
import Link from "next/link";




type ProductProps = {
	product: Product,
	isDisabled?: boolean
}


export default function ProductForm({ product, isDisabled }: ProductProps) {

	const router = useRouter()

	// console.log(product)

	const [readOnly, setReadOnly] = useState(isDisabled)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(UpdateProductSchema),
		values: {...product, attributs_offres: [{nom: '', valeur: '', id: -100}, ...product.attributs_offres]},
	});

	const attributesOffres = watch("attributs_offres")
	const attributesOffreErrors : any = errors?.attributs_offres || []

	// console.log(attributesOffreErrors, attOffreIndex)
	// console.log(errors)

	function addAtt()
	{
		const newAtt = attributesOffres[0]

		if (newAtt && !isEmpty(newAtt.nom) && !isEmpty(newAtt.valeur))
		{
			setValue("attributs_offres", [...attributesOffres, newAtt])
		}
		else toast.error('Veuillez remplir les champs "Libelle" et "Valeur"')
	}

	function removeAtt(index: number) {

		setValue("attributs_offres", attributesOffres.filter((_, i) => i !== index))
		// console.log(attributesOffres.filter((_, i) => i !== index))
	}


	const [logoImage, setLogoImage] = useState<File | null>(null)
	let descriptiveImages = useRef<File[]>([])

	const [isBusy, setBusy] = useState(false)

	async function submit(data: any)
	{
		let formData = new FormData();

		data = isDisabled ? UpdateProductSchema.safeParse(data) : AddProductSchema.safeParse(data)

		// console.log(data)
		// return;

		if (data.success){

			data = data.data

			data.attributs_offres = data.attributs_offres.filter((_: any, i: number) => i !== 0);

			// console.log(data)
			// return

			if (!isDisabled){
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

		if (!isDisabled){
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
					formData.append('images_offres', descriptiveImages.current[i])
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

			const res = isDisabled ? await updateProduct(product.id, data) : await addProduct(formData);

			if (res && !res.ok){

				toast.error(`${res.error}`);

				setBusy(false);
			}
			else {

				toast.success("Produit mis a jour avec succes")

				setTimeout(() => {
					router.push("/resources/products")
				}, 1000)
			}
		}
		catch (err) {
			console.log(err)
			toast.error(`${err}`);

			setBusy(false);
		}


	}

	async function sup() {

		let toastId = ""

		try {

			toastId = toast.loading("Suppression en cours...")

			const res = await deleteProduct(product.id);
			if (res && !res.ok) {
				toast.dismiss(toastId)
				toast.error(`${res.error}`);
			}
			else {
				toast.dismiss(toastId)
				toast.success("Produit supprimé avec succes")
				setTimeout(() => {
					router.push("/resources/products")
				}, 1000)
			}
		}
		catch (err) {
			toast.dismiss(toastId)
			console.log(err)
			toast.error(`${err}`);
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
					color={"primary"}
					classNames={{
						base: "bg-primary/[0.02] border-primary",
						content: "",
					}}
				>
					Produit
				</Chip>

				{
					isDisabled &&
					<div className={"flex items-center space-x-4"}>

						<Link href={`/workshop/image-content/new/product/${product.id}`}>
                            <Button className={"bg-custom_white text-lg text-black font-bold"}
                                    endContent={ <PaintBrushIcon className={"size-6 fill-black"} /> }
                            >
                                Créer un contenu
                            </Button>
						</Link>
						<Button color={"primary"}  className={"text-lg text-black font-bold"}
						        onClick={ () => setReadOnly(!readOnly) }
						>
							{readOnly ? "Modifier" : "Annuler"}
						</Button>
						<Button color={"danger"}
						        className={"text-lg text-black font-bold"}
						        onClick={sup}
						>
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
						                  label={"Nom Produit"}
						                  placeholder={"Produit"}
						                  isDisabled={readOnly}
						                  error={errors?.libelle?.message}
						                  {...register("libelle")}
						/>
					</div>

					<div>
						<NextUiSelectCustm label={"Nature du Produit"}
						                   placeholder={"ex: Combustible"}
						                   itemArray={OfferNature}
						                   disabled={readOnly}
						                   error={errors?.nature?.message}
						                   {...register("nature")}
						/>
					</div>

					<div>
						<NextUiSelectCustm label={"Type de Produit"}
						                   placeholder={"Type"}
						                   itemArray={TypeProduct}
						                   disabled={readOnly}
						                   error={errors?.type?.message}
						                   {...register("type")}
						/>
					</div>

					<div>
						<NextUiTextAreaCustm type={"text"}
						                     label={"Description du Produit"}
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
						                   itemArray={Currency}
						                   disabled={readOnly}
						                   error={errors?.devise_prix?.message}
						                   {...register("devise_prix")}
						/>

						<NextUiInputCustm type={"text"}
						                  label={"Prix par"}
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
						                  label={"Quantite Disponible"}
						                  placeholder={"ex: 1000"}
						                  isDisabled={readOnly}
						                  error={errors?.qte_disponible?.message}
						                  {...register("qte_disponible", {valueAsNumber: true})}
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

					<div className={"w-full flex flex-col space-y-2"}>

						<div className={"w-full flex justify-between items-end space-x-4"}>

							<NextUiInputCustm type={"text"}
							                  label={"Attribut Produit"}
							                  placeholder={"Libelle attribut"}
							                  isDisabled={readOnly}
							                  error={attributesOffreErrors[0]?.nom?.message}
							                  {...register(`attributs_offres.${0}.nom`)}
							/>

							<NextUiInputCustm type={"text"}
							                  label={" "}
							                  placeholder={"Valeur"}
							                  isDisabled={readOnly}
							                  error={attributesOffreErrors[0]?.valeur?.message}
							                  {...register(`attributs_offres.${0}.valeur`)}
							/>

							<Button color={"primary"}
							        className={"text-tertiary font-semibold flex-shrink-0"}
							        endContent={<PlusIcon className={"size-4 stroke-tertiary"}/>}
							        isDisabled={readOnly}
								// disabled={attributesOffreErrors[attOffreIndex[attOffreIndex.length - 1]]?.nom || attributesOffreErrors[attOffreIndex[attOffreIndex.length - 1]]?.valeur}
								    onClick={addAtt}>
								Ajouter
							</Button>

						</div>

						{
							attributesOffres.length > 1 &&
                            <div className={"w-full flex flex-wrap gap-2 p-2 rounded-xl bg-secondary"}>

								{
									attributesOffres.slice(1).map((att, index) => (

										<div className={"h-[5rem] aspect-[65/57] flex flex-col p-2 rounded-lg bg-tertiary"} key={att.id}>
											<XMarkIcon className={"size-4 stroke-custom_white cursor-pointer"} onClick={() => {
												removeAtt(index+1)
											}}/>
											<span className={"text-foreground whitespace-nowrap overflow-hidden text-ellipsis"}>{att.nom}</span>
											<span className={"text-sm text-foreground font-extralight whitespace-nowrap overflow-hidden text-ellipsis"}>{att.valeur}</span>
										</div>
									))
								}

                            </div>
						}

					</div>

					{/*<div className={"w-full flex flex-col space-y-1"}>*/}
					{/*	<span className={"text-foreground font-normal"}>Logo</span>*/}
					{/*	<LogoImage onChange={files => setLogoImage(files[0])}/>*/}
					{/*</div>*/}

					<div className={"w-full flex flex-col space-y-1"}>
						<span className={"text-foreground font-normal"}>Image descriptives</span>
						<div className={"w-full flex space-x-2 overflow-x-auto"}>
							{
								Boolean(product.images_offres.length) &&
                                <div className={"w-full flex space-x-2"}>

	                                {
	                                    product.images_offres.map((img, index) => (
		                                    <div
			                                    key={index}
			                                    className={clsx(
				                                    "group relative rounded-3xl overflow-hidden",
				                                    "w-[7rem] h-[7rem] bg-tertiary",
				                                    "flex-shrink-0 flex justify-center items-center"
			                                    )}
		                                    >
			                                    {/*<div className={clsx(*/}
				                                {/*    "absolute z-10 w-full h-full top-0 left-0 backdrop-blur-xl bg-secondary/50",*/}
				                                {/*    "hidden group-hover:flex justify-center items-center",*/}
			                                    {/*)}>*/}

				                                {/*    <div className={"p-3 rounded-full "}*/}
				                                {/*         onClick={() => removeFile(index)}*/}
				                                {/*    >*/}
					                            {/*        <XMarkIcon className={"size-8 stroke-custom_white"}/>*/}
				                                {/*    </div>*/}

			                                    {/*</div>*/}
			                                    <Image src={img.chemin}
			                                           alt={`Image descriptive ${index + 1}`}
			                                           fill
			                                           quality={100}
				                                    // className={"object-cover"}
			                                    />
		                                    </div>
	                                    ))
	                                }

                                </div>
							}
							<DescriptiveImageDropZone onChange={files => descriptiveImages.current = files}/>
						</div>
					</div>

					<div className={"w-full flex justify-center"}>
						<Button type={"submit"} isDisabled={isBusy || readOnly}>Ajouter</Button>
					</div>

				</form>

			</div>

			<div className={clsx(
				"aspect-[393/572] h-full w-fit px-5 py-6 rounded-[1.6rem] bg-primary/20",
				"flex-shrink-0 flex-col items-center space-y-5",
				"hidden xl:flex"
			)}>

				<div className={"relative w-full h-1/2 rounded-2xl overflow-hidden"}>
					{
						!isDisabled ?
							(
								logoImage &&
                                <Image src={URL.createObjectURL(logoImage)}
                                       alt={"Produit Logo"}
								       fill
	                                   className={"object-cover"}
	                        />
						):
							(
								product.logo &&
								<Image src={product.logo}
								       alt={"Produit Logo"}
								       fill
								/>
							)
					}
				</div>

				<div className={"w-full flex-grow flex flex-col justify-between"}>

					<div className={"flex items-center py-1.5 space-x-2.5"}>
						<span className={"text-white text-2xl font-bold"}>
							{
								isDisabled ? product.libelle :
									watch("libelle", "_____")
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
								isDisabled ? product.prix :
									`${watch("prix", 0)}`
							} FCFA
						</span>
					</div>

					<div className={"flex flex-col space-y-0.5"}>
						<span className={"text-white text-2xl font-bold"}>
							Description
						</span>
						<span className={"text-sm font-normal"}>
							{
								isDisabled ? product.description :
									watch("description", "_____")
							}
						</span>
					</div>

					<div className={"flex items-center space-x-1"}>
						<span className={clsx(
							"text-2xl font-semibold text-green-500",
						)}>
							{
								isDisabled ?
									( product.est_disponible ? "Disponible" : "Indisponible" ) :
									"Disponible"
							}
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