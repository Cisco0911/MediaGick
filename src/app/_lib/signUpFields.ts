import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "@app/_lib/enums";
import {User} from "@app/_lib/reduxSlices/userSlice";


const userFields: {
	[key: number]: {
		id: keyof User;
		label: string;
		isValid: (value: any) => boolean;
		conditions: string[];
	};
} = {
	0: {
		id: "nom",
		label: "Nom",
		isValid: (value: string | null | undefined) => value !== null && value !== undefined && value.trim() !== "",
		conditions: ["Le champ ne doit pas être vide."],
	},
	1: {
		id: "prenom",
		label: "Prénom",
		isValid: (value: string | null | undefined) => value !== null && value !== undefined && value.trim() !== "",
		conditions: ["Le champ ne doit pas être vide."],
	},
	2: {
		id: "email",
		label: "Adresse email",
		isValid: (value: string | null | undefined) => value !== null && value !== undefined && /^\S+@\S+\.\S+$/.test(value),
		conditions: ["Le champ ne doit pas être vide.", "L'adresse email doit être valide."],
	},
	3: {
		id: "age",
		label: "Âge",
		isValid: (value: number | null | undefined) => value !== null && value !== undefined && value >= 18,
		conditions: ["Le champ ne doit pas être vide.", "L'âge doit être supérieur ou égal à 18."],
	},
	4: {
		id: "sexe",
		label: "Sexe",
		isValid: (value: SexeEnum | null | undefined) => value !== null && value !== undefined,
		conditions: ["Le champ ne doit pas être vide."],
	},
	5: {
		id: "mot_de_passe",
		label: "Mot de passe",
		isValid: (value: string | null | undefined) =>
			value !== null &&
			value !== undefined &&
			value.length >= 8 &&
			/[A-Z]/.test(value) &&
			/[a-z]/.test(value) &&
			/[0-9]/.test(value) &&
			/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
		conditions: [
			"Le mot de passe doit contenir au moins 8 caractères.",
			"Le mot de passe doit contenir au moins une lettre majuscule.",
			"Le mot de passe doit contenir au moins une lettre minuscule.",
			"Le mot de passe doit contenir au moins un chiffre.",
			"Le mot de passe doit contenir au moins un caractère spécial.",
		],
	},
	6: {
		id: "objectif_principal",
		label: "Quel est votre objectif principal sur notre plateforme ?",
		isValid: (value: string | null | undefined) =>
			value !== null && value !== undefined && value.trim() !== "" && value.length >= 15,
		conditions: [
			"Le champ ne doit pas être vide.",
			"L'objectif principal doit contenir au moins 15 caractères.",
		],
	},
	7: {
		id: "secteur_activite",
		label: "Secteur d'activité",
		isValid: (value: string | null | undefined) => value !== null && value !== undefined && value.trim() !== "",
		conditions: ["Le champ ne doit pas être vide."],
	},
	8: {
		id: "type_contenu_prefere",
		label: "Quel type de contenu vous inspire le plus ? Images ou vidéos ?",
		isValid: (value: TypeContenuPrefereEnum | null | undefined) => value !== null && value !== undefined,
		conditions: ["Le champ ne doit pas être vide."],
	},
	9: {
		id: "publics_cibles",
		label: "Publics cibles",
		isValid: (value: PublicsCiblesEnum[] | null | undefined) => value !== null && value !== undefined && value.length > 0,
		conditions: ["Le champ ne doit pas être vide.", "Le champ doit contenir au moins un public cible."],
	},
};



/**
 * Validates a user object against a set of predefined fields.
 *
 * Iterates through each field in the `userFields` object.
 * For each field:
 *   - Retrieves the corresponding value from the `user` object.
 *   - Uses the field's `isValid` method to check if the value is valid.
 *   - If the value is invalid, returns the field's index (key) as a number.
 *
 * If all fields are valid, returns `null`.
 *
 * @param user The user object to validate.
 * @returns The index (key) of the first invalid field, or `null` if all fields are valid.
 */
export function validateUser(user: User): number | null {
	for (const key in userFields) {
		if (userFields.hasOwnProperty(key)) { // Ensures that the key is not inherited from the prototype
			const field = userFields[key];
			const value = user[field.id];

			if (!field.isValid(value)) { // Checks if the value is valid using the field's `isValid` method
				return parseInt(key); // Returns the index (key) of the invalid field
			}
		}
	}
	return null; // Returns `null` if all fields are valid
}


export default userFields