import StoreProvider from "@app/StoreProvider";


export default function Layout({
	                               auth,
	                               children,
                               }: {
	auth: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<>
			<StoreProvider>
				<div className={"w-full h-full"}>
					{auth}
					{children}
				</div>
			</StoreProvider>
		</>
	)
}