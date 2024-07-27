import Background from "@features/ui/components/Background";


export default function LoginLayout({children}: Readonly<{ children: React.ReactNode; }>)
{
	return (
		<div className={"w-full h-full"}>
			{/*<Background />*/}
			{children}
		</div>
	);
}
