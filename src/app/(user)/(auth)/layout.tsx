

export default function Layout({
	                               auth,
	                               children,
                               }: {
	auth: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<>
			<div className={"w-full h-full"}>
				{auth}
				{children}
			</div>
		</>
	)
}