import {Spinner} from "@nextui-org/spinner";


type LoadingProps = {
	variant?: "primary" | "secondary" | "success" | "warning" | "default" | "current" | "white" | "danger" | undefined
}

export default function Loading({ variant = "primary" }: LoadingProps) {
	return (
		<div className={"w-full h-full flex justify-center items-center"}>
			<Spinner size={"lg"} color={variant}/>
		</div>
	)
}