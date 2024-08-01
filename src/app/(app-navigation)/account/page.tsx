import Profil from "@features/user/account/Profil";
import Wallet from "@features/user/account/Wallet";
import {cookies} from "next/headers";
import {UserInfo} from "@app/_lib/parsers";
import {getUserSession} from "@app/_lib/actions/auth";


async function getUser() {
	return (await getUserSession()).user
}


export default async function AccountPage() {

	const user = await getUser()

	return (
		<div className={"w-full h-full "}>
			<div className={"w-full h-full flex justify-safe-center space-x-6 overflow-x-auto"}>

				<div className={"w-fit h-full"}>
					<Wallet user={user}/>
				</div>
				<div className={"w-fit h-full"}>
					<Profil user={user}/>
				</div>

			</div>
		</div>
	)
}