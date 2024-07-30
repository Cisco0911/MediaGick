'use client'

import React from 'react';
import InputFieldDefault from '@features/ui/components/InputFieldDefault'
import Button from "@features/ui/components/Button";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@app/_lib/hooks/redux-custom-hooks";
import {selectUser, setEmail, setMotDePasse} from "@features/user/userSlice";
import {AtSymbolIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";

const Login: React.FC = () => {

	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const loginValidityFn = {
		email: (email: string) => {
			return email.length > 0
		},
		password: (password: string) => {
			return password.length > 0
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic
	};

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
							isValid={loginValidityFn.email}
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
							isValid={loginValidityFn.password}
							placeholder="Password"
							className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

				</form>
			</div>

			<Button className={"w-full px-2 py-1.5 rounded-xl text-md font-normal"}
			        variant={"primary"}
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