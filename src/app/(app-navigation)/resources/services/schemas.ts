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
	libelle: z.string()
		.min(1, { message: "Le libellé est requis." }),
	description: z.string()
		.min(1, { message: "La description est requise." }),
	telephone_marchand: z.string()
		.min(8, { message: "Le numéro de téléphone doit contenir au moins 8 chiffres." }),
	prix: z.coerce.number()
		.min(1, { message: "Le prix doit être supérieur ou égal à 1." }),
	unite_prix: z.string()
		.min(1, { message: "L'unité de prix est requise." }),
	devise_prix: z.coerce.number()
		.min(1, { message: "La devise du prix est requise." }),
	est_disponible: z.boolean().default(true),
	nombre_jours_garantie: z.number()
		.min(1, { message: "Le nombre de jours de garantie doit être supérieur ou égal à 1." }),
	duree: z.number()
		.int()
		.min(1, { message: "La durée doit être un nombre entier supérieur ou égal à 1." }),
	lieu_prestation: z.string()
		.min(1, { message: "Le lieu de prestation est requis." }),
	nature: z.coerce.number()
		.min(1, { message: "La nature est requise." }),
	type: z.coerce.number()
		.min(1, { message: "Le type est requis." }),
	attributs_offres: z
		.array(
			z.object({
				nom: z.string(),
					// .min(1, { message: "Le nom de l'attribut est requis." }),
				valeur: z.string()
					// .min(1, { message: "La valeur de l'attribut est requise." }),
			})
		)
		.default([]),
});
// export const AutoAddServiceSchema = z.object({
// 	libelle: z.string().min(1),
// 	telephone_marchand: z.string().min(1),
// 	// id_createur: z.number(),
// 	// logo: z.string(),
// 	type_offre: z.coerce.number().positive(),
// 	url: z.string().min(1),
// });


export const UpdateServiceSchema = z.object({
	libelle: z.string()
		.min(1, { message: "Le libellé est requis." }),
	description: z.string()
		.min(1, { message: "La description est requise." }),
	telephone_marchand: z.string()
		.min(8, { message: "Le numéro de téléphone doit contenir au moins 8 chiffres." }),
	prix: z.coerce.number()
		.min(0, { message: "Le prix doit être supérieur ou égal à 0." }),
	unite_prix: z.string()
		.min(1, { message: "L'unité de prix est requise." }),
	devise_prix: z.coerce.number()
		.min(1, { message: "La devise du prix est requise." }),
	est_disponible: z.boolean().default(true),
	nombre_jours_garantie: z.number()
		.min(1, { message: "Le nombre de jours de garantie doit être supérieur ou égal à 1." }),
	duree: z.number()
		.int()
		.min(1, { message: "La durée doit être un nombre entier supérieur ou égal à 1." }),
	lieu_prestation: z.string()
		.min(1, { message: "Le lieu de prestation est requis." }),
	attributs_offres: z
		.array(
			z.object({
				nom: z.string(),
					// .min(1, { message: "Le nom de l'attribut est requis." }),
				valeur: z.string()
					// .min(1, { message: "La valeur de l'attribut est requise." }),
			})
		)
		.default([]),
});