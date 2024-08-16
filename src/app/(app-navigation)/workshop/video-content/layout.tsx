import StoreProvider from "@app/StoreProvider";



export default function Layout({ children }: { children: React.ReactNode }) {


	return(
		<StoreProvider>

			{children}

		</StoreProvider>
	)

}