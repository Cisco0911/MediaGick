"use client"

import clsx from "clsx";
import {Chip} from "@nextui-org/chip";
import React, {ReactNode, useRef} from "react";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import NextUiSelectCustm from "@features/ui/components/NextUiSelectCustm";
import {enumToArray} from "@app/_lib/function_lib";
import {CurrencyEnum, OfferNatureEnum, TypeProductEnum} from "@app/_lib/enums";
import NextUiTextAreaCustm from "@features/ui/components/NextUiTextAreaCustm";
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@heroicons/react/24/outline";
import LogoImage from "@features/ui/components/LogoImage";
import DescriptiveImageDropZone from "@features/ui/components/DescriptiveImageDropZone";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AutoAddProductSchema} from "@app/_lib/schemas";
import {GlobeEuropeAfricaIcon} from "@heroicons/react/24/solid";
import {
	AmazonCard,
	AnkaCard,
	AppStoreCard, GoogleMapCard,
	ImmoAskCard, LinkedInCard,
	PlayStoreCard, VotreSiteCard
} from "@features/ressources/components/PartenerWebSiteCard";
import {isEmpty} from "@nextui-org/shared-utils";
import toast from "react-hot-toast";
import {autoAddProduct} from "@app/_lib/actions/fetchData";


export default function NewProductPage() {

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(AutoAddProductSchema),
	});

	console.log(errors)

	let logoImage = useRef<File>()

	const [isBusy, setBusy] = React.useState<boolean>(false);

	async function submit(data: any)
	{
		let formData = new FormData();

		data = AutoAddProductSchema.safeParse(data)

		console.log(data)
		// return;

		if (data.success){

			data = data.data

			for (let key in data) {
				formData.append(key, data[key]);
			}
		}
		else {
			toast.error('Veuillez remplir tous les champs')
			return
		}

		if (logoImage.current)
		{
			formData.append('logo', logoImage.current)
		}
		else {
			toast.error('Veuillez ajouter une image de logo')
			return
		}

		try {

			setBusy(true);

			const res = await autoAddProduct(formData);

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


	function extractDomain(url: string): string {
		try {
			const parsedUrl = new URL(url);
			return parsedUrl.hostname;
		} catch (error) {
			console.log("Invalid URL provided:");
			return "";
		}
	}

	// const [hostname, setHostname] = React.useState<string>("");
	const hostname = extractDomain(useWatch(
		{
			control,
			name: "url",
			defaultValue: "",
		}
	))

	const partenerLogos: ReactNode[] = [
		<AnkaCard key={1} domain={hostname} />,
		<AmazonCard key={2} domain={hostname} />,
		<PlayStoreCard key={3} domain={hostname} />,
		<AppStoreCard key={4} domain={hostname} />,
		<ImmoAskCard key={5} domain={hostname} />,
		<LinkedInCard key={6} domain={hostname} />,
		<GoogleMapCard key={7} domain={hostname} />,
		<VotreSiteCard key={8} domain={hostname} />,
	]


	return (
		<div className={clsx(
			"w-full h-full flex justify-center items-center"
		)}>

			<div className={" h-full px-5 py-6 flex-grow overflow-auto"}>

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

					<form className={"w-full h-full px-2 flex flex-col items-center space-y-7 overflow-auto"}
					      onSubmit={handleSubmit(submit)}
					>

						<div className={"max-w-[50rem] w-full"}>
							<NextUiInputCustm type={"text"}
							                  label={"Nom Produit"}
							                  placeholder={"Produit"}
							                  error={errors?.libelle?.message}
								              {...register("libelle")}
							/>
						</div>

						<div className={"max-w-[50rem] w-full"}>
							<NextUiSelectCustm label={"Type de Produit"}
							                   placeholder={"Type"}
							                   itemArray={enumToArray(TypeProductEnum)}
							                   error={errors?.type_offre?.message}
								               {...register("type_offre")}
							/>
						</div>

						<div className={"max-w-[50rem] w-full"}>
							<NextUiInputCustm type={"text"}
							                  label={"Numero du marchand"}
							                  placeholder={"ex: +228 XX XX XX XX"}
							                  error={errors?.telephone_marchand?.message}
								              {...register("telephone_marchand")}
							/>
						</div>

						<div className={"max-w-[50rem] w-full flex flex-col items-center space-y-1"}>
							<span className={"text-foreground font-normal"}>Logo</span>
							<LogoImage onChange={files => logoImage.current = files[0]}/>
						</div>

						<div className={"relative w-full flex-shrink-0 flex justify-safe-center overflow-x-auto overflow-y-hidden"}>

							{/*<div className={"invisible"}>*/}
							{/*	<AmazonCard domain={""} />*/}
							{/*</div>*/}
							{
								partenerLogos.map( (logo, i) => (
									<div
										key={i}
										// className={`absolute top-0`}
										style={{
											// left: `${i * 1.2 * 100/partenerLogos.length}%`
											marginLeft: i == 0 ? 0 : -80
										}}
									>
										{logo}
									</div>
								) )
							}

						</div>

						<div className={"max-w-[50rem] w-full"}>
							<NextUiInputCustm type={"text"}
							                  label={""}
							                  placeholder={"https://tg.coinafrique.com/"}
							                  startContent={<GlobeEuropeAfricaIcon className={"size-6 fill-primary"} />}
							                  error={isEmpty(hostname) && "Adresse invalide !!!"}
							                  {...register("url")}
							/>
						</div>

						<div className={"w-full flex justify-center"}>
							<Button isDisabled={isBusy} type={"submit"}>Ajouter</Button>
						</div>

					</form>

				</div>

			</div>

		</div>
	);
}