import {Product} from "@app/_lib/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import {AddVideoContent} from "@app/(app-navigation)/workshop/video-content/interfaces";
import {PositionFiligraneEnum, QualiteEnum} from "@app/(app-navigation)/workshop/video-content/new/enums";
import {RootState} from "@app/_lib/store";


interface AddVideoContentState extends AddVideoContent {
	scriptMode: boolean
}

const initialState: AddVideoContentState = {
	id_modele: '',
	script: '',
	qualite: 1,
	position_filigrane: 1,
	filigrane: '',
	call_to_action: '',
	scriptMode: false,
}

export const addVideoContentSlice = createSlice({
	name: 'addVideoContent',
	initialState,
	reducers: {

		setScriptMode: (state, action: PayloadAction<boolean>) => {
			// console.log(action.payload)
			state.scriptMode = action.payload
		},

		setIdModele: (state, action: PayloadAction<string>) => {
			state.id_modele = action.payload
		},
		setScript: (state, action: PayloadAction<string>) => {
			state.script = action.payload
		},
		setQualite: (state, action: PayloadAction<QualiteEnum>) => {
			state.qualite = action.payload
		},
		setPositionFiligrane: (state, action: PayloadAction<PositionFiligraneEnum>) => {
			state.position_filigrane = action.payload
		},
		setFiligrane: (state, action: PayloadAction<string>) => {
			state.filigrane = action.payload
		},
		setCallToAction: (state, action: PayloadAction<string>) => {
			state.call_to_action = action.payload
		},
	}
})

export const {
	setScriptMode,
	setIdModele,
	setScript,
	setQualite,
	setPositionFiligrane,
	setFiligrane,
	setCallToAction
} = addVideoContentSlice.actions

export const selectAddVideoContent = (state: RootState) => state.addVideoContentState

export const selectScriptMode = (state: RootState) => state.addVideoContentState.scriptMode

export default addVideoContentSlice.reducer