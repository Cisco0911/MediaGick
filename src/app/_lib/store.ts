import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@app/_lib/reduxSlices/userSlice'
import addVideoContentReducer from "@app/_lib/reduxSlices/addVideoContentSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			userState: userReducer,
			addVideoContentState: addVideoContentReducer
		},
		devTools: true
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']