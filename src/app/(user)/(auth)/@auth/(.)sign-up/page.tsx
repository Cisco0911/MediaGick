import Modal from "@features/ui/components/Modal";
import SignUp from "@features/user/auth/SignUp";


export default function SignUpPage() {

	return (
		<div>
			<Modal className={"bg-transparent w-full"} backdropClassName={"backdrop-blur-3xl bg-black bg-opacity-55"}>
				<div className={"w-full h-full"}>
					<SignUp />
				</div>
			</Modal>
		</div>
	)

}