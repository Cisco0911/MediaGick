import {Product} from "@app/_lib/interfaces";
import {Service} from "@app/(app-navigation)/resources/services/interfaces";
import clsx from "clsx";
import Image from "next/image";
import {CheckBadgeIcon, CheckCircleIcon} from "@heroicons/react/24/solid";
import React from "react";




type ResourceDetailCardProps = {
	resource: Product | Service
}


export default function ResourceDetailCard({ resource }: ResourceDetailCardProps) {
	return (
		<div className={clsx(
			"aspect-[393/572] h-full w-full px-5 py-6 rounded-[1.6rem] bg-primary/20",
			"flex-shrink-0 flex-col items-center space-y-5",
			"hidden xl:flex"
		)}>

			<div className={"relative w-full h-1/2 rounded-2xl overflow-hidden"}>
				{
					resource.logo &&
                    <Image src={resource.logo}
                           alt={"Resource Logo"}
                           fill
                    />
				}
			</div>

			<div className={"w-full flex-grow flex flex-col justify-between"}>

				<div className={"flex items-center py-1.5 space-x-2.5"}>
						<span className={"text-white text-2xl font-bold"}>
							{resource.libelle}
						</span>
					<CheckBadgeIcon className={clsx(
						"size-7 fill-primary flex-shrink-0",
					)}/>
				</div>

				<div className={"flex flex-col space-y-0.5"}>
						<span className={"text-white text-2xl font-bold"}>
							Prix
						</span>
					<span className={"text-sm font-normal"}>
							{resource.prix} FCFA
						</span>
				</div>

				<div className={"flex flex-col space-y-0.5"}>
						<span className={"text-white text-2xl font-bold"}>
							Description
						</span>
					<span className={"text-sm font-normal"}>
							{resource.description}
						</span>
				</div>

				<div className={"flex items-center space-x-1"}>
						<span className={clsx(
							"text-2xl font-semibold text-green-500",
						)}>
							{
								(resource.est_disponible ? "Disponible" : "Indisponible")
							}
						</span>
					<CheckCircleIcon className={clsx(
						"size-5 fill-green-500",
					)}/>
				</div>

			</div>

		</div>
	)
}