import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import Image from "next/image";
import {Divider} from "@nextui-org/react";
import clsx from "clsx";
import {motion} from "framer-motion";
import {formatDateLabel} from "@app/_lib/actions/funcs";
import {HashtagIcon} from "@heroicons/react/24/outline";
import {VideoContent} from "@app/(app-navigation)/workshop/video-content/interfaces";


type VideoContentCardProps = {
	content: VideoContent,
	isSelected: boolean,
	onClick: () => void
}


export default function VideoContentCard({content, isSelected = false, onClick}: VideoContentCardProps) {


	return (
		<div className={"max-w-[20rem] h-fit"}
		     onClick={onClick}
		>

			<div
				className={clsx(
					"w-full h-min aspect-[280/405] rounded-2xl px-4 py-5 flex flex-col",
					{"hover:bg-tertiary": !isSelected}
				)}
				style={{
					boxShadow: isSelected ? "4px 4px 4px 2px #0c1214" : "none"
				}}
			>

				<div className={"relative w-full rounded-2xl overflow-hidden"}>
					<motion.div
						className={"relative w-full rounded-2xl overflow-hidden"}
						whileHover={{
							scale: 1.15,
							filter: "brightness(0.7)",
							transition: {
								filter: {duration: 0.1}
							}
						}}
						style={{
							aspectRatio: content.largeur / content.hauteur
						}}
					>
						<Image src={content.chemin || ""}
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
					</motion.div>
				</div>

				<Divider className="my-1.5"/>

				<div className={"flex-grow flex flex-col justify-between"}>

					<div className={"flex flex-col space-y-1.5"}>

						<div>
							<span className={"text-lg font-bold"}>
								{content.titre}
							</span>
						</div>

						<div className={"flex items-center space-x-1"}>
							<span className={"font-extralight"}>
								Modèle
							</span>
							<div className={"w-1 h-1 rounded-full bg-custom_white"}/>
							<span className={"text-nowrap text-ellipsis overflow-hidden"}>
								{content.modele.nom}
							</span>
						</div>

						<div className={"flex items-center space-x-1 font-extralight"}>
							<span>
								Date
							</span>
							<div className={"w-1 h-1 rounded-full bg-custom_white/60"}/>
							<span className={"text-nowrap text-ellipsis overflow-hidden"}>
								{formatDateLabel(content.date_modification)}
							</span>
						</div>

					</div>

					<div className={"flex space-x-1"}>

						{
							content.modele.etiquettes_modeles.slice(0, 2).map(etiquette => (

								<div
									key={etiquette.id}
									className={clsx(
										"flex items-center space-x-0.5 text-primary text-sm font-light",
										"px-1.5 py-0.5 bg-primary/50 rounded-full"
									)}>
									<HashtagIcon className={"size-4 stroke-primary"}/>
									<span>
										{etiquette.nom}
									</span>
								</div>
							))
						}

					</div>

				</div>

			</div>

		</div>
	)

}