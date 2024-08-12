

import {z} from "zod";
import {ModelContenu} from "@app/(app-navigation)/workshop/interfaces";



export const ModelContenuSchema = z.object({
	nom: z.string(),
	description: z.string(),
	largeur: z.number(),
	longueur: z.number(),
	duree_secondes: z.number(),
	source: z.union([z.literal(0), z.literal(1)]), // Only 0 or 1 allowed
	vignette: z.string().optional(),
	id: z.string(),
	etiquettes_modeles: z.array(
		z.object({
			nom: z.string(),
			id: z.number(),
		})
	),
	elements_modeles: z.array(
		z.object({
			nom: z.string(),
			id: z.number(),
		})
	),
});