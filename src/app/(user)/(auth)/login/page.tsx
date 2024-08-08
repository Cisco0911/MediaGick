import Login from "@features/user/auth/Login/Login";

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center w-full h-full z-10 backdrop-blur-md bg-tertiary/80">
			<Login></Login>
		</div>
	);
}
