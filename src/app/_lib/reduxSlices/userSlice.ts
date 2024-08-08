import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "@app/_lib/enums";


// export type Sexe = keyof typeof SexeEnum;
//
// export type TypeContenuPrefere = typeof TypeContenuPrefereEnum[keyof typeof TypeContenuPrefereEnum];
//
// export type PublicsCibles = (keyof typeof PublicsCiblesEnum)[];


export interface User {
	nom?: string;
	prenom?: string;
	email?: string;
	age?: number;
	sexe?: SexeEnum;
	mot_de_passe?: string;
	objectif_principal?: string;
	secteur_activite?: string;
	type_contenu_prefere?: TypeContenuPrefereEnum;
	publics_cibles?: PublicsCiblesEnum[];
}

// Define a type for the slice state
export interface UserState {
	user: User;
}

const userExample = {
	nom: 'Luisenbarn',
	prenom: 'Baragan',
	email: 'lb@mail.com',
	age: 20,
	sexe: SexeEnum.Female,
	mot_de_passe: 'LuiBarn@09',
	objectif_principal: 'Rein de special',
	secteur_activite: 'Informatique',
	type_contenu_prefere: TypeContenuPrefereEnum.VIDEO,
	publics_cibles: [
		// PublicsCiblesEnum.AGES_13_18,
		PublicsCiblesEnum.AGES_18_24,
		PublicsCiblesEnum.AGES_35_54,
		PublicsCiblesEnum.AGES_50_77
	]
}

// Define the initial state using that type
const initialState: UserState = {
	user: userExample,
};

export const userSlice = createSlice({
	name: 'userState',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = { ...state.user, ...action.payload };
		},
		setNom: (state, action: PayloadAction<string>) => {
			state.user.nom = action.payload;
		},
		setPrenom: (state, action: PayloadAction<string>) => {
			state.user.prenom = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.user.email = action.payload;
		},
		setAge: (state, action: PayloadAction<number>) => {
			state.user.age = action.payload;
		},
		setSexe: (state, action: PayloadAction<SexeEnum>) => {
			state.user.sexe = action.payload;
		},
		setMotDePasse: (state, action: PayloadAction<string>) => {
			state.user.mot_de_passe = action.payload;
		},
		setObjectifPrincipal: (state, action: PayloadAction<string>) => {
			state.user.objectif_principal = action.payload;
		},
		setSecteurActivite: (state, action: PayloadAction<string>) => {
			state.user.secteur_activite = action.payload;
		},
		setTypeContenuPrefere: (state, action: PayloadAction<TypeContenuPrefereEnum>) => {
			state.user.type_contenu_prefere = action.payload;
		},
		setPublicsCibles: (state, action: PayloadAction<PublicsCiblesEnum[]>) => {
			state.user.publics_cibles = action.payload;
		},
	}
});

// Export the actions
export const {
	setUser,
	setNom,
	setPrenom,
	setEmail,
	setAge,
	setSexe,
	setMotDePasse,
	setObjectifPrincipal,
	setSecteurActivite,
	setTypeContenuPrefere,
	setPublicsCibles,
} = userSlice.actions;

// Export a selector for the user
export const selectUser = (state: { userState: UserState }) => state.userState.user;

export const selectUserState = (state: { userState: UserState }) => state.userState;

// Export the reducer
export default userSlice.reducer;
