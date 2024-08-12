

import {z} from "zod";
import {ModelContenu} from "@app/(app-navigation)/workshop/interfaces";



export const AddImageContentFormSchema = z.object({
	hauteur: z.coerce.number( { message: "La hauteur doit être un nombre strictement positif." } )
		.positive({ message: "La hauteur doit être un nombre strictement positif." }),

	largeur: z.coerce.number({ message: "La largeur doit être un nombre strictement positif." })
		.positive({ message: "La largeur doit être un nombre strictement positif." }),

	id_modele: z.string()
		.min(1, { message: "Veuillez selectionner un modèle" })
});