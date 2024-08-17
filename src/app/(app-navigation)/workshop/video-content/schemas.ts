import { ImageContentSchema } from "../image-content/schemas";
import { z } from 'zod'
import {PositionFiligraneEnum, QualiteEnum} from "@app/(app-navigation)/workshop/video-content/new/enums";








export const VideoContentSchema = ImageContentSchema.omit({ id_offre: true }).extend({
	duree_secondes: z.number().int(),
	vignette: z.string(),
	cta: z.string(),
	filigrane: z.string(),
	script: z.string(),
	qualite: z.union([z.literal(1), z.literal(2)]),
});


export const AddVideoContentSettingSchema = z.object({
	id_modele: z.string(),
	qualite: z.union([z.literal(1), z.literal(2)]),
	position_filigrane: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
	filigrane: z.string(),
})