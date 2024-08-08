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
import ServiceForm from "@features/ressources/services/components/ServiceForm";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";


export default function NewServicePage() {

	const emptyService: Service = {
		libelle: '',
		description: '',
		telephone_marchand: '',
		prix: 0,
		unite_prix: '',
		devise_prix: 1,
		est_disponible: true,
		nombre_jours_garantie: 0,
		duree: 0,
		lieu_prestation: '',
		nature: 1,
		type: 1,
		id: 0,
		id_createur: undefined,
		logo: undefined,
		images_offres: [],
		attributs_offres: []
	};


	return (
		<>
			<ServiceForm service={emptyService} />
		</>
	)
}