'use client'

import clsx from "clsx";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import ChangePasswordForm from "@features/user/account/Profil/components/ChangePasswordForm";
import {UserInfo} from "@app/_lib/interfaces";
import {Divider} from "@nextui-org/react";
import Button from "@features/ui/components/Button";
import React from "react";
import {logout} from "@app/_lib/actions/auth";
import toast from "react-hot-toast";
import NameUpdate from "@features/user/account/Profil/components/NameUpdate";
import ActivitySectorUpdate from "@features/user/account/Profil/components/ActivitySectorUpdate";


type ProfilProps = {
	user: UserInfo
}

export default function Profil({user}: ProfilProps) {



	const [pending, setPending] = React.useState(false);
	const _logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		let toastId = ""

		try {

			setPending(true);
			// toastId = toast.loading('Deconnexion...');

			const ok = await logout();

			if (ok){
				toast.dismiss(toastId);
				toast.success("Deconnexion reussie");

				// router.push("/login")
			}
		}
		catch (err) {
			toast.dismiss(toastId);
			toast.error(`${err}`);
		}
		finally {
			setPending(false);
		}
	}

	return (
		<div className={"min-w-[30rem] w-full flex flex-col space-y-10"}>

			<div className={clsx(
				// "max-w-[360px] min-w-[30rem] w-full rounded-3xl bg-[#0e191e]",
				"rounded-3xl bg-[#0e191e]",
				"flex flex-col justify-between px-12 py-10 space-y-5"
			)}>

				<div className={"pb-6"}>
					<span className={"text-custom_white text-2xl font-black"}>
					COMPTE
				</span>
				</div>

				<div
					className={"w-full flex justify-between text-xl cursor-pointer"}>

					<span>
						Email
					</span>

					<span>
						{user?.email}
					</span>

				</div>

				<Divider/>

				<NameUpdate name={user.nom!} />

				<Divider/>

				<ActivitySectorUpdate activitySector={user.secteur_activite!} />

				<Divider/>

				<ChangePasswordForm/>

			</div>

			<div className={clsx(
				// "max-w-[360px] min-w-[30rem] w-full rounded-3xl bg-[#0e191e]",
				"rounded-3xl bg-[#0e191e]",
				"flex flex-col justify-between px-12 py-10 space-y-5"
			)}>

				<div className={"pb-6"}>
					<span className={"text-custom_white text-2xl font-black"}>
						SYSTEME
					</span>
				</div>

				<div
					className={"w-full flex justify-between items-center text-xl cursor-pointer"}>

					<span>
						Compte actif
					</span>

					<Button
						className={"max-w-80 w-fit px-5 py-2 rounded-xl text-xl font-medium"}
						variant={"secondary"}
						state={pending ? "busy" : "active"}
						onClick={_logout}
						children={"Se deconnecter"}/>

				</div>
			</div>

		</div>
	)
}