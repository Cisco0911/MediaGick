import Profil from "@features/user/account/Profil/Profil";
import Wallet from "@features/user/account/Wallet/Wallet";
import {getMe, getUserSession} from "@app/_lib/actions/auth";


async function getUser() {
	return (await getMe())
}


export default async function AccountPage() {

	const res = await getUser()

	if (!res.ok) {
		return (
			<div>
				<p>Une erreur est survenue</p>
			</div>
		)
	}

	const user = res.data!


	return (
		<div className={"w-full h-full "}>
			<div className={"w-full h-full flex justify-safe-center space-x-6 overflow-x-auto"}>

				{/*<div className={"w-fit h-full"}>*/}
				{/*	<Wallet user={user}/>*/}
				{/*</div>*/}
				<div className={"w-full h-full"}>
					<Profil user={user}/>
				</div>

			</div>
		</div>
	)
}