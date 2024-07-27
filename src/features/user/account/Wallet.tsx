'use client'

import clsx from "clsx";
import {BanknotesIcon, CreditCardIcon, SparklesIcon, WalletIcon} from "@heroicons/react/24/solid";
import {motion} from "framer-motion";
import Tmoney from "@app/_assets/image/tmoney-logo.png";
import MoovMoney from "@app/_assets/image/moovMoney-logo.png";
import Image from "next/image";
import {ArrowRightCircleIcon} from "@heroicons/react/24/outline";


export default function Wallet() {
	return (
		<div className={clsx(
			"max-w-[360px] w-full h-full rounded-3xl bg-[#0e191e]",
			"flex flex-col justify-between items-center px-[50px] py-[40px]"
		)}>

			<div className={"flex justify-center items-center space-x-2.5"}>
				<span className={"text-custom_white text-2xl font-semibold"}>
					PROTEFEUILLE
				</span>
				<span>
					<WalletIcon className={"size-8 fill-custom_white"}/>
				</span>
			</div>

			<div title={"Crédits disponible"}
			     className={"w-full flex flex-col items-start px-3.5 py-5 space-y-5 rounded-3xl bg-[#0c1214]"} >

				<span className={"text-custom_white text-xl font-normal"}>
						Crédits disponible
				</span>

				<div className={"w-full flex justify-end items-center"}>
					<span className={"text-custom_white text-xl font-bold"}>
						250.000
					</span>
					<SparklesIcon className={"size-6 fill-amber-400"}/>
				</div>

			</div>

			<div title={"Recharger mon portefeuille"}
			     className={"w-full flex flex-col items-start px-3.5 py-5 space-y-5 rounded-3xl bg-[#0c1214]"}>

				<span className={"text-custom_white text-xl font-normal"}>
					Recharger mon portefeuille
				</span>

				<div className={"w-full flex space-x-5 justify-center items-center"}>
					<div className={"relative overflow-hidden rounded-3xl bg-[#fbdb17] aspect-[138/115] w-36 h-auto"}>
						<Image src={Tmoney}
						       alt={"Tmoney"}
						       fill
						       objectFit={"cover"}
						       quality={100}
						/>
					</div>
					<div className={"relative rounded-3xl bg-[#0067b3] aspect-[138/115] w-36 h-auto"}>
						<Image src={MoovMoney}
						       alt={"Moov Money"}
						       fill={true}
						       objectFit={"cover"}
						       quality={100}
						/>
					</div>
				</div>

				<motion.button
					className={"max-w-80 w-full px-2 xl:px-10 py-4 rounded-xl bg-primary flex justify-center items-center space-x-2.5"}
					whileHover={{scale: 1.05}}
					whileTap={{scale: 0.9}}
				>
					<span className={"text-xl font-medium"}>
					Effectuer un paiement
					</span>
					<CreditCardIcon className={"size-6 fill-[#0c1214]"} />
				</motion.button>

			</div>

			<div title={"Taux de change"}
			     className={"w-full flex flex-col items-start px-3.5 py-5 space-y-5 rounded-3xl bg-[#0c1214]"}>

				<span className={"text-custom_white text-xl font-normal"}>
					Taux de change
				</span>
				<div className={"w-full flex justify-between items-center"}>

					<BanknotesIcon className={"size-6 fill-green-400"}/>
					<span className={"text-custom_white text-lg font-normal"}>
						{100} FCFA
					</span>
					<ArrowRightCircleIcon className={"size-6 stroke-custom_white"}/>
					<span className={"text-custom_white text-lg font-normal"}>
						{10} CRÉDITS
					</span>
					<SparklesIcon className={"size-6 fill-amber-400"}/>

				</div>


			</div>


		</div>
	)
}