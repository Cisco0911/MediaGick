'use client'

import clsx from "clsx";
import {BanknotesIcon, SparklesIcon, WalletIcon} from "@heroicons/react/24/solid";
import Tmoney from "@app/_assets/image/tmoney-logo.png";
import MoovMoney from "@app/_assets/image/moovMoney-logo.png";
import Image from "next/image";
import {ArrowRightCircleIcon} from "@heroicons/react/24/outline";
import RechargeWallet from "@features/user/account/Wallet/components/RechargeWallet";
import {UserInfo} from "@app/_lib/interfaces";


type WalletProps = {
	user?: UserInfo
}

export default function Wallet({user}: WalletProps) {
	return (
		<div className={clsx(
			"max-w-[360px] min-w-[30rem] w-full h-full rounded-3xl bg-[#0e191e]",
			"flex flex-col justify-between items-center px-12 py-10"
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
			     className={"w-full flex flex-col items-start px-3.5 py-5 space-y-3 rounded-3xl bg-[#0c1214]"}>

				<span className={"text-custom_white text-xl font-normal"}>
						Crédits disponible
				</span>

				<div className={"w-full flex justify-end items-center space-x-1"}>
					<SparklesIcon className={"size-6 fill-amber-400"}/>
					<span className={"text-custom_white text-4xl font-bold"}>
						{user?.portefeuille?.totalCredits}
					</span>
				</div>

			</div>

			<div title={"Recharger mon portefeuille"}
			     className={"w-full flex flex-col items-start px-3.5 py-5 space-y-5 rounded-3xl bg-[#0c1214]"}>

				<span className={"text-custom_white text-xl font-normal"}>
					Recharger mon portefeuille
				</span>

				<div className={"w-full flex space-x-5 justify-center items-center"}>
					<div
						className={"relative overflow-hidden rounded-3xl bg-[#fbdb17] aspect-[138/115] w-36 h-auto object-cover"}>
						<Image src={Tmoney}
						       alt={"Tmoney"}
						       fill
						       quality={100}
						/>
					</div>
					<div className={"relative rounded-3xl bg-[#0067b3] aspect-[138/115] w-36 h-auto object-cover"}>
						<Image src={MoovMoney}
						       alt={"Moov Money"}
						       fill={true}
						       quality={100}
						/>
					</div>
				</div>

				<RechargeWallet/>

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