'use client'

import clsx from "clsx";
import {IdentificationIcon} from "@heroicons/react/24/solid";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import ChangePasswordForm from "@features/user/account/Profil/components/ChangePasswordForm";
import {UserInfo} from "@app/_lib/interfaces";


type ProfilProps = {
	user?: UserInfo
}

export default function Profil({user}: ProfilProps) {
	return (
		<div className={clsx(
			"max-w-[360px] min-w-[30rem] w-full rounded-3xl bg-[#0e191e]",
			"flex flex-col justify-between items-center px-12 py-10 space-y-5"
		)}>

			<div className={"flex justify-center items-center space-x-2.5"}>
				<span className={"text-custom_white text-2xl font-semibold"}>
					PROFIL
				</span>
				<span>
					<IdentificationIcon className={"size-8 fill-custom_white"}/>
				</span>
			</div>

			<div
				className={"w-full flex flex-col items-start px-3.5 py-5 space-y-5 rounded-3xl bg-[#0c1214] cursor-pointer"}>

				<div title={"Edit personal information"} className={"flex items-center space-x-2.5"}>
					<span className={"text-custom_white text-xl font-medium"}>
						{`${user?.nom} ${user?.prenom}`}
					</span>
					<PencilSquareIcon className={"size-6 fill-custom_white/80"}/>
				</div>

				<span title={"Email"} className={"text-custom_white text-xl font-light"}>
					{user?.email}
				</span>

			</div>

			<ChangePasswordForm/>

		</div>
	)
}