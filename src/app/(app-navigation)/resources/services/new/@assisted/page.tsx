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

			Not Implemented

		</div>
	);
}