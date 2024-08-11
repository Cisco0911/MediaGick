import {Currency, OfferNature, TypeProduct} from "@app/_lib/enums";


export interface AddProduct {
	libelle: string;
	description: string;
	telephone_marchand: string;
	prix: number;
	unite_prix: string;
	devise_prix: typeof Currency[keyof typeof Currency];
	est_disponible?: boolean; // Optional since it has a default value
	nombre_jours_garantie: number;
	qte_disponible: number;
	nature: typeof OfferNature[keyof typeof OfferNature];
	type: typeof TypeProduct[keyof typeof TypeProduct];
	attributs_offres: {
		nom: string;
		valeur: string;
	}[];
}
