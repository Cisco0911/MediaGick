'use client'

import clsx from "clsx";
import {IdentificationIcon} from "@heroicons/react/24/solid";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {motion} from "framer-motion";


export default function Profil() {
	return (
		<div className={clsx(
			"max-w-[360px] w-full h-full rounded-3xl bg-[#0e191e]",
			"flex flex-col justify-between items-center px-[50px] py-[40px]"
		)}>

			<div className={"flex justify-center items-center space-x-2.5"}>
				<span className={"text-custom_white text-2xl font-semibold"}>
					PROFIL
				</span>
				<span>
					<IdentificationIcon className={"size-8 fill-custom_white"} />
				</span>
			</div>

			<div className={"w-full flex flex-col items-start px-3.5 py-5 space-y-5 rounded-3xl bg-[#0c1214] cursor-pointer"}>

				<div title={"Edit personal information"} className={"flex items-center space-x-2.5"}>
					<span className={"text-custom_white text-xl font-medium"}>
						Jonathan Brad
					</span>
					<PencilSquareIcon className={"size-6 fill-custom_white/80"} />
				</div>

				<span title={"Email"} className={"text-custom_white text-xl font-light"}>
					John.Brad@example.com
				</span>

			</div>

			<motion.button className={"max-w-80 w-full px-2 xl:px-10 py-4 rounded-xl bg-custom_white text-xl font-medium"}
			                whileHover={{scale: 1.1}}
			                whileTap={{scale: 0.9}}
			>
				Changer de mot de passe
			</motion.button>

		</div>
	)
}