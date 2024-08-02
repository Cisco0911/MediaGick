import {z} from "zod";
import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "@app/_lib/enums";




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
