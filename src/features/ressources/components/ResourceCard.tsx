import {Product} from "@app/_lib/interfaces";
import Image from "next/image";
import clsx from "clsx";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";


type ResourceCardProps = {
	resource: Product | Service
	type?: "product" | "service"
}


export default function ResourceCard ({resource, type = "product"}: ResourceCardProps) {

	// console.log(resource as Service)

	return (
		<Link href={type === "product" ? `/resources/products/${resource.id}` : `/resources/services/${resource.id}`}>

			<div
				className={"w-full h-min aspect-[280/405] rounded-2xl px-4 py-5 flex flex-col space-y-3 hover:bg-tertiary"}>

				<div className={"relative w-full aspect-[240/175] rounded-2xl object-cover overflow-hidden"}>
					<Image src={resource.logo || ""}
					       alt={"Logo"}
					       fill
					       quality={100}
					/>
				</div>

				<div className={"flex flex-col space-y-1.5"}>

					<div className={"flex items-center py-1.5 space-x-2.5"}>
					<span className={"text-white text-lg font-bold"}>
						{resource.libelle}
					</span>
						<CheckBadgeIcon className={clsx(
							"size-7",
							(type === "product" ? "fill-primary" : "fill-red-500")
						)}/>
					</div>

					<div className={"flex flex-col space-y-0.5"}>
					<span className={"text-white text-medium font-bold"}>
						Prix
					</span>
						<span className={"text-sm font-light"}>
						{resource.prix} FCFA
					</span>
					</div>

					<div className={"flex flex-col space-y-0.5"}>
					<span className={"text-white text-medium font-bold"}>
						Description
					</span>
						<span className={"text-sm font-light"}>
						{resource.description}
					</span>
					</div>

					<div className={"flex space-x-1"}>
					<span className={clsx(
						"text-medium font-medium",
						(resource.est_disponible ? "text-green-500" : "text-red-500"),
					)}>
						{resource.est_disponible ? "Disponible" : "Indisponible"}
					</span>
					</div>

				</div>

			</div>

		</Link>
	)

}