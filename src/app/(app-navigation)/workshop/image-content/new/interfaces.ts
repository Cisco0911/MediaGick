




export interface AddImageContentForm {
	"hauteur": number,
	"largeur": number,
	"id_modele": string
}

export interface AddImageContentPostData extends AddImageContentForm {
	"id_offre": number,
	"type_offre": 1 | 2,
}