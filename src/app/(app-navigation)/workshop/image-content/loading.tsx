import {Spinner} from "@nextui-org/spinner";


export default function Loading() {
	return (
		<div className={"w-full h-full flex justify-center items-center"}>
			<Spinner size={"lg"} color={"primary"}/>
		</div>
	)
}