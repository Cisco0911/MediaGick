'use client'

import React from 'react';
import InputFieldDefault from '@features/ui/components/InputFieldDefault'
import Button, {ButtonState} from "@features/ui/components/Button";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@app/_lib/hooks/redux-custom-hooks";
import {
	selectUser,
	setEmail,
	setMotDePasse,
} from "@app/_lib/reduxSlices/userSlice";
import {AtSymbolIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import {login} from "@app/_lib/actions/auth";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {emailSchema, passwordSchema} from "@app/_lib/schemas";
import {CircularProgress} from "@nextui-org/progress";
import {z} from "zod";




const Login: React.FC = () => {

	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// let toastId = ""

		try {

			setBusy(true);

			const res = await login(user.email!, user.mot_de_passe!);

			if (res && !res.ok){

				toast.error(`${res.error}`);

				setBusy(false);
			}
		}
		catch (err) {
			console.log(err)
			toast.error(`${err}`);

			setBusy(false);
		}

	};

	const formValidation = z.
		object({
			email: emailSchema,
			mot_de_passe: passwordSchema,
		});

	const [isBusy, setBusy] = React.useState(false);

	const submitState: ButtonState = isBusy ? "busy" : (formValidation.safeParse(user).success) ? "active" : "inactive";
	const BusyIcon = <CircularProgress classNames={{
		svg: "h-[1.5rem]",
		indicator: "stroke-tertiary"
	}} aria-label={"loading"} />


	// useEffect(() => {
	// 	if (emailSchema.safeParse(user.email).success && passwordSchema.safeParse(user.mot_de_passe).success) {
	//
	// 		setSubmitState("active");
	// 	}
	// 	else setSubmitState("inactive")
	// }, [user.email, user.mot_de_passe]);

	return (
		<div className={clsx(
			"relative max-w-[20rem] w-full min-w-72 m-20 flex flex-col justify-center items-center space-y-5",
			"px-5 py-5 rounded-3xl bg-secondary z-10"
		)}>
			<div className={"font-bold text-custom_white text-2xl"}>
				<span> Connexion </span>
			</div>

			<div className={"w-full"}>
				<form onSubmit={handleSubmit}>

					<div className={"space-y-2"}>
						<InputFieldDefault
							id="emailLogin"
							type="email"
							name="emailLogin"
							Icon={AtSymbolIcon}
							iconClassName={"stroke-custom_white"}
							value={user.email || ''}
							onChange={(e) => dispatch(setEmail(e.target.value))}
							placeholder="Email"
							className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
							schema={emailSchema}
						/>
						<InputFieldDefault
							id="passwordLogin"
							type="password"
							name="passwordLogin"
							Icon={LockClosedIcon}
							iconClassName={"fill-custom_white"}
							value={user.mot_de_passe || ''}
							onChange={(e) => dispatch(setMotDePasse(e.target.value))}
							placeholder="Password"
							className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
							schema={passwordSchema}
						/>
					</div>

				</form>
			</div>

			<Button state={submitState} className={"w-full px-2 py-1.5 rounded-xl text-medium font-normal"}
			        variant={"primary"}
			        type={"submit"}
			        onClick={handleSubmit}
			        busyIcon={BusyIcon}
			>
				Valider
			</Button>

			<div className={"mt-7 cursor-pointer"}>
				<Link className={"text-custom_white font-light text-sm underline"} href="/sign-up">
					Vous n&apos;avez pas de compte ? Inscrivez-vous
				</Link>
			</div>


		</div>
	);
};

export default Login;