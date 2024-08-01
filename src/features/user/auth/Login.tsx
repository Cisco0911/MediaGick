'use client'

import React from 'react';
import InputFieldDefault from '@features/ui/components/InputFieldDefault'
import Button from "@features/ui/components/Button";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@app/_lib/hooks/redux-custom-hooks";
import {
	selectUser,
	Session,
	setEmail,
	setMotDePasse,
	setUser,
	User,
	UserState
} from "@features/user/userSlice";
import {AtSymbolIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import {emailValidityFn, passwordValidityFn} from "@app/_lib/inputsValidityFns";
import {login} from "@app/_lib/actions/auth";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";




const Login: React.FC = () => {

	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// let toastId = ""

		try {
			if (!emailValidityFn(user.email) || !passwordValidityFn(user.mot_de_passe)) {

				toast.error("Email ou mot de passe invalide");

				return;
			}

			setPending(true);
			const toastId = toast.loading('Connexion...');

			const res = await login(user.email!, user.mot_de_passe!);

			if (res.ok){
				toast.dismiss(toastId);
				toast.success("Connexion reussie");

				router.push("/dashboard")
			}
			else {
				toast.dismiss(toastId);
				toast.error(`${res.error}`);
			}
		}
		catch (err) {
			console.log(err)
		}
		finally {
			setPending(false);
		}

	};

	const [pending, setPending] = React.useState(false);

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

					<div className={"space-y-1.5"}>
						<InputFieldDefault
							id="emailLogin"
							type="email"
							name="emailLogin"
							Icon={AtSymbolIcon}
							iconClassName={"stroke-custom_white"}
							value={user.email || ''}
							onChange={(e) => dispatch(setEmail(e.target.value))}
							isValid={emailValidityFn}
							placeholder="Email"
							className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
						<InputFieldDefault
							id="passwordLogin"
							type="password"
							name="passwordLogin"
							Icon={LockClosedIcon}
							iconClassName={"fill-custom_white"}
							value={user.mot_de_passe || ''}
							onChange={(e) => dispatch(setMotDePasse(e.target.value))}
							isValid={passwordValidityFn}
							placeholder="Password"
							className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

				</form>
			</div>

			<Button aria-disabled={pending} className={"w-full px-2 py-1.5 rounded-xl text-md font-normal"}
			        variant={"primary"}
			        type={"submit"}
			        onClick={handleSubmit}
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