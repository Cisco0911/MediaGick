import {Product} from "@app/_lib/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";


export interface ResourcesState {
	products: Product[]
	services: Service[]
}


const initialState: ResourcesState = {
	products: [],
	services: []
}

export const resourcesSlice = createSlice({
	name: 'resources',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload
		},
		addProduct: (state, action: PayloadAction<Product>) => {
			state.products.push(action.payload)
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter(product => product.id !== action.payload)
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			const product = state.products.find(product => product.id === action.payload.id)
			if (product) {
				product.libelle = action.payload.libelle
				product.description = action.payload.description
				product.telephone_marchand = action.payload.telephone_marchand
				product.prix = action.payload.prix
				product.unite_prix = action.payload.unite_prix
				product.devise_prix = action.payload.devise_prix
				product.est_disponible = action.payload.est_disponible
				product.nombre_jours_garantie = action.payload.nombre_jours_garantie
				product.qte_disponible = action.payload.qte_disponible
				product.nature = action.payload.nature
				product.id_createur = action.payload.id_createur
				product.logo = action.payload.logo
				product.images_offres = action.payload.images_offres
				product.type = action.payload.type
				product.id = action.payload.id
			}
		},
		setServices: (state, action: PayloadAction<Service[]>) => {
			state.services = action.payload
		},
		addService: (state, action: PayloadAction<Service>) => {
			state.services.push(action.payload)
		},
		deleteService: (state, action: PayloadAction<number>) => {
			state.services = state.services.filter(service => service.id !== action.payload)
		},
		updateService: (state, action: PayloadAction<Service>) => {
			const service = state.services.find(service => service.id === action.payload.id)
			if (service) {
				service.libelle = action.payload.libelle
				service.description = action.payload.description
				service.telephone_marchand = action.payload.telephone_marchand
				service.prix = action.payload.prix
				service.unite_prix = action.payload.unite_prix
				service.devise_prix = action.payload.devise_prix
				service.est_disponible = action.payload.est_disponible
				service.nombre_jours_garantie = action.payload.nombre_jours_garantie
				service.duree = action.payload.duree
				service.lieu_prestation = action.payload.lieu_prestation
				service.nature = action.payload.nature
				service.id_createur = action.payload.id_createur
				service.logo = action.payload.logo
			}
		}
	}
})

export const {
	setProducts,
	addProduct,
	deleteProduct,
	updateProduct,
	setServices,
	addService,
	deleteService,
	updateService
} = resourcesSlice.actions

export const selectProducts = (state: any) => state.resources.products
export const selectServices = (state: any) => state.resources.services

export default resourcesSlice.reducer