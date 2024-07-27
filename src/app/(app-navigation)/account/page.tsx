import Profil from "@features/user/account/Profil";
import Wallet from "@features/user/account/Wallet";


export default function AccountPage() {
	return (
		<div className={"w-full h-full"}>
			<div className={"w-full h-full flex justify-center space-x-6 overflow-x-auto"}>

				<div className={"max-w-[360px] w-full h-full"}>
					<Profil />
				</div>
				<div className={"max-w-[360px] w-full h-full"}>
					<Wallet />
				</div>

			</div>
		</div>
	)
}