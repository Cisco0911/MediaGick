import {CurrencyEnum, OfferNatureEnum} from "@app/_lib/enums";
import {TypeService} from "@app/(app-navigation)/resources/services/enums";


export interface Service extends AddService{
	id_createur?: number;
	logo?: string;
	images_offres?: {id: number; chemin: string}[];
	id: number;
}

export interface AddService extends UpdateService{
	nature: number;
	type: number;
}

export interface UpdateService {
	libelle: string;
	description: string;
	telephone_marchand: string;
	prix: number;
	unite_prix: string;
	devise_prix: number;
	est_disponible: boolean; // Optional because it has a default value
	nombre_jours_garantie: number;
	duree: number;
	lieu_prestation: string;
	attributs_offres: Array<{
		nom: string;
		valeur: string;
	}>; // Nullable array
}
