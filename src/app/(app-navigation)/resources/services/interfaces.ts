import {CurrencyEnum, OfferNatureEnum} from "@app/_lib/enums";
import {TypeServiceEnum} from "@app/(app-navigation)/resources/services/enums";


export interface Service {
	libelle: string;
	description: string;
	telephone_marchand: string;
	prix: number;
	unite_prix: string;
	devise_prix: CurrencyEnum;
	est_disponible: boolean;
	nombre_jours_garantie: number;
	duree: number;
	lieu_prestation: string;
	nature: OfferNatureEnum;
	id_createur?: number;
	logo?: string;
	images_offres?: string[];
	type: TypeServiceEnum;
	id: number;
	attributs_offres: Array<{
		nom: string;
		valeur: string;
		id: number;
	}>;
}