



export interface ModelContenu {
	nom: string;
	description: string;
	largeur: number;
	longueur: number;
	duree_secondes: number;
	source: 0 | 1; // Only allowed values are 0 or 1
	vignette?: string;
	id: string;
	etiquettes_modeles: EtiquetteModel[];
	elements_modeles: ElementModel[];
}

interface EtiquetteModel {
	nom: string;
	id: number;
}

interface ElementModel {
	nom: string;
	id: number;
}
