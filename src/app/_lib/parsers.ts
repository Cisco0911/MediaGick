import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "@app/_lib/enums";
import {User} from "@features/user/userSlice";



export interface UserInfo {
	id?: number;
	nom?: string;
	prenom?: string;
	email?: string;
	age?: number;
	sexe?: SexeEnum;
	role?: string;
	mot_de_passe?: string;
	objectif_principal?: string;
	secteur_activite?: string;
	portefeuille?: {
		totalCredits: number;
	},
	type_contenu_prefere?: TypeContenuPrefereEnum;
	publics_cibles?: PublicsCiblesEnum[];
}

export type Session = {
	isLoggedIn: boolean,
	access_token: string,
	access_expiration: string,
	refresh_token: string,
	refresh_expiration: string
}

// Define a type for the slice state
export interface UserSession {
	sessionData: {
		access_token: string;
		user: UserInfo;
	};
	access_expiration: string;
	refresh_token: string;
	refresh_expiration: string;
}

export function parseToUserSession(userInfo: any) {

	const { user_info, ...session } = userInfo;

	const userSession : UserSession =  {
		sessionData:{
			access_token: session.access_token,
			user: {
				...user_info,
				publics_cibles: user_info.publics_cibles.map((publics_cible: any) => publics_cible.libelle)
			}
		},
		access_expiration: session.access_expiration,
		refresh_token: session.refresh_token,
		refresh_expiration: session.refresh_expiration

	}

	return userSession
}



export function parseToUser(userInfo: any) {

	const user : User =  {
		...userInfo,
		publics_cibles: userInfo.publics_cibles.map((publics_cible: any) => publics_cible.libelle)
	}

	return user
}