import { ImageContentSchema } from "../image-content/schemas";
import { z } from 'zod'








export const VideoContentSchema = ImageContentSchema.omit({ id_offre: true }).extend({
	duree_secondes: z.number().int(),
	vignette: z.string(),
	cta: z.string(),
	filigrane: z.string(),
	script: z.string(),
	qualite: z.union([z.literal(1), z.literal(2)]),
});