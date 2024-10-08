import {
	CurrencyEnum,
	OfferNatureEnum,
	PublicsCiblesEnum,
	SexeEnum,
	TypeContenuPrefereEnum, TypeProduct,
} from "@app/_lib/enums";


export interface UserInfo {
	id?: number;
	nom?: string;
	prenom?: string;
	email?: string;
	age?: number;
	sexe?: SexeEnum;
	role?: string;
	mot_de_passe?: string;
	objectif_principal?: string;
	secteur_activite?: string;
	portefeuille?: {
		totalCredits: number;
	},
	type_contenu_prefere?: TypeContenuPrefereEnum;
	publics_cibles?: PublicsCiblesEnum[];
}


export interface Product {
	libelle: string;
	description: string;
	telephone_marchand: string;
	prix: number;
	unite_prix: string;
	devise_prix: CurrencyEnum;
	est_disponible: boolean;
	nombre_jours_garantie: number;
	qte_disponible: number;
	nature?: OfferNatureEnum;
	id_createur: number | null;
	logo: string | null;
	images_offres: {id: number; chemin: string}[];
	type: typeof TypeProduct[keyof typeof TypeProduct];
	id: number;
	attributs_offres: Array<{
		nom: string;
		valeur: string;
		id: number;
	}>
}


interface ErrorDetail {
	type: string;
	message: string;
	details: string;
}

interface TaskStatusFailed {
	task_id: string;
	status: "failed";
	error: ErrorDetail;
}

interface TaskStatusProcessing {
	task_id: string;
	status: "Processing";
	error: never;
}

export type TaskStatus = TaskStatusFailed | TaskStatusProcessing;


