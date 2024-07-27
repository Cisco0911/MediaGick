import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {PublicsCiblesEnum, SexeEnum, TypeContenuPrefereEnum} from "@app/_lib/enums";


export type Sexe = keyof typeof SexeEnum;

export type TypeContenuPrefere = keyof typeof TypeContenuPrefereEnum;

export type PublicsCibles = (keyof typeof PublicsCiblesEnum)[];


export interface User {
	nom?: string | null;
	prenom?: string | null;
	email?: string | null;
	age?: number | null;
	sexe?: Sexe | null;
	mot_de_passe?: string | null;
	objectif_principal?: string | null;
	secteur_activite?: string | null;
	type_contenu_prefere?: TypeContenuPrefere | null;
	publics_cibles?: PublicsCibles | null;
}

// Define a type for the slice state
export interface UserState {
	user: User;
	isLoggedIn: boolean;
	role: string;
}

// Define the initial state using that type
const initialState: UserState = {
	user: {},
	isLoggedIn: false,
	role: ''
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
		setSexe: (state, action: PayloadAction<Sexe>) => {
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
		setTypeContenuPrefere: (state, action: PayloadAction<TypeContenuPrefere>) => {
			state.user.type_contenu_prefere = action.payload;
		},
		setPublicsCibles: (state, action: PayloadAction<PublicsCibles>) => {
			state.user.publics_cibles = action.payload;
		},
		setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		setRole: (state, action: PayloadAction<string>) => {
			state.role = action.payload;
		}
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
	setIsLoggedIn,
	setRole
} = userSlice.actions;

// Export a selector for the user
export const selectUser = (state: { userState: UserState }) => state.userState.user;

export const selectUserState = (state: { userState: UserState }) => state.userState;

// Export the reducer
export default userSlice.reducer;
