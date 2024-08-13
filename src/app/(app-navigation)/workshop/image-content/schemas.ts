import {z, ZodObject} from 'zod';
import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import {ModelContenuSchema} from "@app/(app-navigation)/workshop/schemas";



export const ImageContentSchema = z.object({
	titre: z.string(),
	date_creation: z.string().datetime(),
	date_modification: z.string().datetime(),
	chemin: z.string(),
	hauteur: z.number().int(),
	largeur: z.number().int(),
	taille: z.number(),
	id: z.number().int(),
	id_modele: z.string(),
	id_createur: z.number().int(),
	modele: ModelContenuSchema,
	id_offre: z.number().int(),
	status: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});

