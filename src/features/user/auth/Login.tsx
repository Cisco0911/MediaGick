'use client'

import React from 'react';
import InputFieldDefault from '@features/ui/components/InputFieldDefault'
import Button from "@features/ui/components/Button";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@app/_lib/hooks/redux-custom-hooks";
import {selectUser, setEmail, setMotDePasse} from "@features/user/userSlice";

const Login: React.FC = () => {

	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic
	};

	return (
		<div className="relative max-w-[300px] w-full min-w-72 m-20 flex flex-col justify-center items-center">


			<div className={"w-full px-5 pb-3 pt-14 rounded-3xl bg-[#262626] z-10"}>

				<form onSubmit={handleSubmit}>

					<div className={"space-y-6"}>
						<InputFieldDefault
							id="email"
							type="email"
							value={user.email || ''}
							onChange={(e) => dispatch(setEmail(e.target.value))}
							placeholder="Email"
						/>
						<InputFieldDefault
							id="password"
							type="password"
							value={user.mot_de_passe || ''}
							onChange={(e) => dispatch(setMotDePasse(e.target.value))}
							placeholder="Password"
						/>
					</div>

				</form>

				<div className={"flex justify-between mt-7"}>
					<div className={"flex items-center space-x-0.5"}>
						<input id={"rememberMe"} type={"checkbox"}/>
						<label className={"text-primary text-sm"} htmlFor={"rememberMe"}> Remember me </label>
					</div>
					<div>
						<Link className={"text-primary text-sm underline"} href="/">Forgot password ?</Link>
					</div>
				</div>

				<div className={"mt-7"}>
					<Link className={"text-primary text-sm underline"} href="/sign-up">Dont have an account? Sign up</Link>
				</div>

				<div className={"mb-7"}></div>

			</div>

			<Button className="h-9 w-5/6 flex justify-center items-center rounded-b-3xl text-center"
			        variant={"secondary"}
			>
				Login
			</Button>

			{/*<Button>*/}
			{/*	<Link href="/">Root</Link>*/}
			{/*</Button>*/}

		</div>
	);
};

export default Login;