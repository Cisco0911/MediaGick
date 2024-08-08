import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@app/_lib/reduxSlices/userSlice'
import resourcesReducer from "@app/_lib/reduxSlices/resourcesSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			userState: userReducer,
			resourcesState: resourcesReducer
		},
		devTools: true
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']