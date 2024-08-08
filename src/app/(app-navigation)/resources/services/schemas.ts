import {z} from "zod";
import {CurrencyEnum, OfferNatureEnum} from "@app/_lib/enums";


export const ServiceSchema = z.object({
	libelle: z.string().min(1),
	description: z.string().min(1),
	telephone_marchand: z.string().min(1),
	// prix: z.number().positive(),
	prix: z.number().int().nonnegative(),
	unite_prix: z.string(),
	devise_prix: z.nativeEnum(CurrencyEnum),
	est_disponible: z.boolean(),
	nombre_jours_garantie: z.number().int().nonnegative(),
	duree: z.number().int().nonnegative(),
	lieu_prestation: z.string().min(1),
	nature: z.nativeEnum(OfferNatureEnum),
	id_createur: z.number().int().nullable(),
	logo: z.string().nullable(),
	images_offres: z
		.array(
			z.object({
				chemin: z.string().min(1),
				id: z.number().int().positive(),
			})
		)
		.nullable(),
	type: z.coerce.number().int().positive(),
	id: z.number().int().positive(),
	attributs_offres: z
		.array(
			z.object({
				nom: z.string().min(1),
				valeur: z.string().min(1),
				id: z.number().int().positive(),
			})
		)
		.nullable(),
});

export const AddServiceSchema = z.object({
	libelle: z.string().min(1),
	description: z.string().min(1),
	telephone_marchand: z.string().min(1),
	prix: z.coerce.number().positive(),
	unite_prix: z.string().min(1),
	devise_prix: z.coerce.number().positive(),
	est_disponible: z.boolean().default(true),
	nombre_jours_garantie: z.number().positive(),
	duree: z.number().int().positive(),
	lieu_prestation: z.string().min(1),
	nature: z.coerce.number(),
	// id_createur: z.number(),
	// logo: z.string(),
	// images_offres: z.array(z.any()), // Adjust type as needed
	type: z.coerce.number(),
	attributs_offres: z
		.array(
			z.object({
				nom: z.string(),
				valeur: z.string(),
			})
		)
		.nullable(),
});
export const AutoAddServiceSchema = z.object({
	libelle: z.string().min(1),
	telephone_marchand: z.string().min(1),
	// id_createur: z.number(),
	// logo: z.string(),
	type_offre: z.coerce.number().positive(),
	url: z.string().min(1),
});


export const UpdateServiceSchema = z.object({
	libelle: z.string().min(1),
	description: z.string().min(1),
	telephone_marchand: z.string().min(1),
	prix: z.coerce.number().positive(),
	unite_prix: z.string().min(1),
	devise_prix: z.coerce.number().positive(),
	est_disponible: z.boolean().default(true),
	nombre_jours_garantie: z.number().positive(),
	duree: z.number().int().positive(),
	lieu_prestation: z.string().min(1),
	attributs_offres: z
		.array(
			z.object({
				nom: z.string(),
				valeur: z.string(),
			})
		)
		.nullable(),
});