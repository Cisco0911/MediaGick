import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import {ModelContenu} from "@app/(app-navigation)/workshop/interfaces";
import {PositionFiligraneEnum, QualiteEnum} from "@app/(app-navigation)/workshop/video-content/new/enums";







export interface VideoContent extends Omit<ImageContent, "id_offre">{
	duree_secondes: number;
	vignette: string;
	cta: string;
	filigrane: string;
	script: string;
	qualite: 1 | 2;
}




export interface AddVideoContentSettingForm {
	id_modele: string;
	qualite: QualiteEnum;
	position_filigrane: PositionFiligraneEnum;
	filigrane: string;
}

export interface AddVideoContent extends AddVideoContentSettingForm {
	script: string;
	call_to_action: string;
}