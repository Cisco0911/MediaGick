// "use client"


type LayoutProps = {
	children: React.ReactNode,
}

export default function Layout({children}: LayoutProps) {


	return (
		<div className={"w-full h-full"}>
			{children}
		</div>
	)
}

