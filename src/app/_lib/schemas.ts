import {z, ZodObject} from "zod";
import {
	CurrencyEnum,
	OfferNatureEnum,
	PublicsCiblesEnum,
	SexeEnum,
	TypeContenuPrefereEnum,
} from "@app/_lib/enums";
import {Product} from "@app/_lib/interfaces";




export const nomSchema = z
	.string()
	.min(1, { message: "Le champ ne doit pas être vide." })
	.regex(/^\S*$/, "Le mot de passe ne doit pas contenir d'espace.");

export const prenomSchema = z
	.string()
	.min(1, { message: "Le champ ne doit pas être vide." })
	.regex(/^\S*$/, "Le mot de passe ne doit pas contenir d'espace.");

export const emailSchema = z
	.string({
		required_error: "Le champ ne doit pas être vide.",
		invalid_type_error: "L'adresse email doit être une chaine de caractères.",
	})
	.email({message: "L'adresse email doit être valide."});

export const ageSchema = z
	.coerce
	.number()
	.min(18, { message: "L'âge doit être supérieur ou égal à 18." })
	.max(120, { message: "L'âge doit être inférieur ou égal à 120." });

export const sexeSchema = z
	.nativeEnum(SexeEnum, { errorMap: () => ({ message: "Selectionner votre sexe" }) });

export const passwordSchema = z
	.string()
	.min(8, {message: "Le mot de passe doit contenir au moins 8 caractères."})
	.max(15, {message: "Le mot de passe doit contenir au max 15 caractères."})
	.regex(/[a-z]/, {message: "Le mot de passe doit contenir au moins une lettre minuscule."})
	.regex(/[A-Z]/, {message: "Le mot de passe doit contenir au moins une lettre majuscule."})
	.regex(/[0-9]/, {message: "Le mot de passe doit contenir au moins un chiffre."})
	.regex(/[!@#$%^&*(),.?":{}|<>\[\]\\/'`~_+\-=]/, {
		message: "Le mot de passe doit contenir au moins un caractère spécial."
	})
	.regex(/^\S*$/, "Le mot de passe ne doit pas contenir d'espace.");

export const objectifPrincipalSchema = z.string()
	.min(15, { message: "L'objectif principal doit contenir au moins 15 caractères." });

export const secteurActiviteSchema = z
	.string()
	.min(1, { message: "Le champ ne doit pas être vide." })
	.regex(/^\S*$/, "Le mot de passe ne doit pas contenir d'espace.");

export const typeContenuPrefereSchema = z
	.nativeEnum(TypeContenuPrefereEnum, { errorMap: () => ({ message: "Selectionner votre type de contenu prefér" }) });

export const publicsCiblesSchema = z
	.array(z.nativeEnum(PublicsCiblesEnum))
	.min(1, { message: "Selectionner au moins un public cible" });

export const ProductSchema = z.object({
	libelle: z.string().min(1),
	description: z.string().min(1),
	telephone_marchand: z.string().min(1),
	// prix: z.number().positive(),
	prix: z.number(),
	unite_prix: z.string(),
	devise_prix: z.nativeEnum(CurrencyEnum),
	est_disponible: z.boolean(),
	nombre_jours_garantie: z.number().int().nonnegative(),
	qte_disponible: z.number().int().nonnegative(),
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

export const AddProductSchema = z.object({
	libelle: z.string(),
	description: z.string(),
	telephone_marchand: z.string(),
	prix: z.number(),
	unite_prix: z.string(),
	devise_prix: z.coerce.number(),
	est_disponible: z.boolean().default(true),
	nombre_jours_garantie: z.number(),
	qte_disponible: z.number(),
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
		.default([])
});
export const AutoAddProductSchema = z.object({
	telephone_marchand: z.string().min(1),
	// id_createur: z.number(),
	// logo: z.string(),
	type_offre: z.coerce.number().positive(),
	url: z.string().min(1),
});


export const UpdateProductSchema = z.object({
	libelle: z.string(),
	description: z.string(),
	telephone_marchand: z.string(),
	prix: z.number(),
	unite_prix: z.string(),
	devise_prix: z.coerce.number(),
	est_disponible: z.boolean().default(true),
	nombre_jours_garantie: z.number(),
	qte_disponible: z.number(),
	attributs_offres: z
		.array(
			z.object({
				nom: z.string(),
				valeur: z.string(),
				id: z.number(),
			})
		)
		.nullable(),
});



