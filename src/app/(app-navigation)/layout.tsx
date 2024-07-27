'use client'


import SideBar from "@features/ui/components/SideBar";


export default function Layout({ children, }: { children: React.ReactNode }) {
	return (
		<div className={"w-screen h-screen flex backdrop-blur-md bg-black/50"}>

			<SideBar />

			<div className={"relative z-10 h-full w-full p-7 flex overflow-hidden"}>

				<div className={"w-full h-full p-12 rounded-[30px] bg-[#0c1214]"}>
					<div className={"w-full h-full rounded-3xl overflow-hidden bg-transparent"}>
						{children}
					</div>
				</div>

			</div>

		</div>
	)
}
