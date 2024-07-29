import Profil from "@features/user/account/Profil";
import Wallet from "@features/user/account/Wallet";


export default function AccountPage() {
	return (
		<div className={"w-full h-full "}>
			<div className={"w-full h-full flex justify-safe-center space-x-6 overflow-x-auto"}>

				<div className={"w-fit h-full"}>
					<Wallet/>
				</div>
				<div className={"w-fit h-full"}>
					<Profil/>
				</div>

			</div>
		</div>
	)
}