import {ModelContenu} from "@app/(app-navigation)/workshop/interfaces";


export interface ImageContent {
	titre: string;
	date_creation: string; // Expected to be in date-time format
	date_modification: string; // Expected to be in date-time format
	chemin: string;
	hauteur: number;
	largeur: number;
	taille: number;
	id: number;
	id_modele: string;
	id_createur: number;
	modele: ModelContenu;
	id_offre: number;
	status: 1 | 2 | 3;
}
