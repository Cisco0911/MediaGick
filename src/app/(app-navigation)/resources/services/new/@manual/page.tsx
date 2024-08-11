"use client"


import React from "react";
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