import {Product} from "@app/_lib/interfaces";
import Image from "next/image";
import clsx from "clsx";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import {Divider} from "@nextui-org/react";
import {Image as Img} from "@nextui-org/image";


type ResourceCardProps = {
	resource: Product | Service
	type?: "product" | "service"
}


export default function ResourceCard ({resource, type = "product"}: ResourceCardProps) {

	// console.log(resource as Service)

	return (
		<Link className={"max-w-[20rem] h-fit"} href={type === "product" ? `/resources/products/${resource.id}` : `/resources/services/${resource.id}`}>

			<div
				className={"w-full h-min aspect-[280/405] rounded-2xl px-4 py-5 flex flex-col hover:bg-tertiary"}>

				<div className={"relative w-full aspect-[240/175] rounded-2xl overflow-hidden"}>
					<Image src={resource.logo || ""}
					       alt={"Logo"}
					       fill
					       quality={100}
					       className={"object-cover"}
					/>
					{/*<Img*/}
					{/*	width={"100%"}*/}
					{/*	alt="Produit Logo"*/}
					{/*	src={resource.logo || ""}*/}
					{/*/>*/}
				</div>

				<Divider className="my-1.5" />

				<div className={"flex-grow flex flex-col justify-between"}>

					<div className={"flex flex-col space-y-1.5"}>

						<div>
							<span className={"text-white text-lg font-bold"}>
								{resource.libelle}
							</span>
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
							<span className={"text-sm font-light text-nowrap text-ellipsis overflow-hidden"}>
							{resource.description}
						</span>
						</div>

					</div>

					<div className={"flex items-center space-x-1"}>
						<span className={clsx(
							"text-medium font-medium",
							(resource.est_disponible ? "text-green-500" : "text-red-500"),
						)}>
							{resource.est_disponible ? "Disponible" : "Indisponible"}
						</span>
						{
							resource.est_disponible
								? <CheckCircleIcon className={"size-4 fill-green-500"}/>
								: <CheckCircleIcon className={"size-4 fill-red-500"}/>
						}
					</div>

				</div>

			</div>

		</Link>
	)

}