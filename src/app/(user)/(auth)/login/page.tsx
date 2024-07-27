import Login from "@features/user/auth/Login";

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center w-full h-full z-10 backdrop-blur-md bg-black/50">
			<Login></Login>
		</div>
	);
}
