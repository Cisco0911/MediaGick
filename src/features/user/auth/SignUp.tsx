'use client'


import {ArrowLeftCircleIcon, ArrowRightCircleIcon} from "@heroicons/react/16/solid";
import InputFieldSignUp from "@features/ui/components/InputFieldSignUp";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
	selectUser,
	setAge,
	setEmail,
	setMotDePasse,
	setNom,
	setObjectifPrincipal,
	setPrenom,
	setPublicsCibles,
	setSecteurActivite,
	setSexe,
	setTypeContenuPrefere, setUser
} from "@features/user/userSlice";
import React from "react";
import {useBoundedValue} from "@app/_lib/function_lib";
import {useAppDispatch, useAppSelector} from "@app/_lib/hooks/redux-custom-hooks";
import clsx from "clsx";
import SignUpSlider from "@features/ui/components/SignUpSlider";
import {AnimatePresence, motion} from "framer-motion";
import SexeSelectSignUp from "@features/ui/components/SexeSelectSignUp";
import ContentSelectSignUp from "@features/ui/components/ContentSelectSignUp";
import AgeRangeSelectSignUp from "@features/ui/components/AgeRangeSelectionSignUp";
import {useSwipeable} from "react-swipeable";
import userFields, {validateUser} from "@app/_lib/signUpFields";
import {SexeEnum} from "@app/_lib/enums";
import toast from "react-hot-toast";
import {login, signUp} from "@app/_lib/actions/auth";
import {parseToUser} from "@app/_lib/parsers";
import {useRouter} from "next/navigation";


// const userFields: { [key: number]: { id: keyof User; label: string } } = {
// 	1: { id: "nom", label: "Indiquer votre Nom" },
// 	2: { id: "prenom", label: "Indiquer votre Prénom" },
// 	3: { id: "email", label: "Veuillez enter votre adresse mail" },
// 	4: { id: "age", label: "Quel est votre age" },
// 	5: { id: "sexe", label: "Choisissez votre Sexe" },
// 	6: { id: "mot_de_passe", label: "Enter un mot de passe pour securiser votre compte" },
// 	7: {
// 		id: "objectif_principal",
// 		label: "Decrivez en quelques mots votre objectif sur notre plateforme",
// 	},
// 	8: {
// 		id: "secteur_activite",
// 		label: "Quel est votre secteur d'activité ?",
// 	},
// 	9: {
// 		id: "type_contenu_prefere",
// 		label: "Images ou videos, qu'est ce qui vous inspire le plus ?",
// 	},
// 	10: { id: "publics_cibles", label: "Qui voulez-vous viser avec vos créations?" },
// };

export default function SignUp() {

	const form: { [key: number]: { id: string; label: string } } = {
		...userFields,
		10: { id: "sumbit_signUp", label: "" },
	};

	const [selectedField, incrementField, decrementField, setField] = useBoundedValue(0, 10)

	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()

	const router = useRouter()

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => incrementField(),
		onSwipedRight: () => decrementField(),
	});

	const [pending, setPending] = React.useState(false);

	const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {

		let toastId: string = "";

		try {

			e.preventDefault()

			const invalidFieldIndex = validateUser(user);

			if (invalidFieldIndex !== null) {
				console.log(`Le champ avec l'index ${invalidFieldIndex} est invalide.`);
				setField(invalidFieldIndex);

				return;
			} else {
				console.log("Tous les champs sont valides.");
			}

			setPending(true);
			toastId = toast.loading('Inscription...');

			const res = await signUp(
				{
					...user,
					publics_cibles: user.publics_cibles!.map((publics_cible) => ({ libelle: publics_cible })),
				}
			);

			const newUser  = parseToUser(res);

			console.log(newUser)

			dispatch(setUser(newUser));


			toast.dismiss(toastId);
			toast.success("Inscription reussie");

			router.push("/login")
		}
		catch (err) {
			console.log(err);
			toast.dismiss(toastId);
			toast.error(`${err}`);
		}
	}

	return(
		<div className={"w-full h-full relative flex flex-col justify-center items-center"}>

			<div className={"w-full"}>

				<div className={"w-full min-h-10 my-10"}>
					<div className={"relative w-full h-full flex justify-center items-center"}>

						<AnimatePresence initial={false} mode={"wait"}>

							{
								Object.keys(form).map((key) => (
									Number(key) === selectedField &&
									(
										<div key={key}>
											<motion.span
												className={"inline-block text-center text-4xl text-white font-bold"}
												initial={{opacity: 0}}
												animate={{opacity: 1, transition: {duration: 2, delay: 0.1}}}
												exit={{opacity: 0, scale: 0.5, transition: {duration: 0.1}}}
											>
												{form[Number(key)].label}

											</motion.span>
											{/*<span*/}
											{/*	className={"invisible pointer-events-none text-center text-4xl text-white font-bold"}> {form[Number(key)].label} </span>*/}
										</div>
									)
								))
							}

						</AnimatePresence>

					</div>
				</div>

				<div className={"flex w-full justify-between items-center"}
				     {...swipeHandlers}
				>

					<div className={"hidden sm:block md:m-24 m-16 rounded-full active:ring-1 active:ring-primary"}
					     onClick={e => decrementField()}
					>
						<ArrowLeftCircleIcon className={"size-10 fill-secondary"}/>
					</div>

					<div
						className={"w-full h-full p-2.5 relative flex flex-grow overflow-visible justify-center items-center text-center"}>

						<SignUpSlider show={selectedField == 0}>
							<InputFieldSignUp id={"nom-signUp"} type={"text"} value={user.nom || ""}
							                  isValid={userFields[0].isValid}
							                  conditions={userFields[0].conditions}
							                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								                  e.preventDefault();
								                  dispatch(setNom(e.target.value))
							                  }}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 1}>
							<InputFieldSignUp id={"prenom-signUp"} type={"text"} value={user.prenom || ""}
							                  isValid={userFields[1].isValid}
							                  conditions={userFields[1].conditions}
							                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								                  e.preventDefault();
								                  dispatch(setPrenom(e.target.value))
							                  }}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 2}>
							<InputFieldSignUp id={"email-signUp"} type={"email"} value={user.email || ""}
							                  isValid={userFields[2].isValid}
							                  conditions={userFields[2].conditions}
							                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								                  e.preventDefault();
								                  dispatch(setEmail(e.target.value))
							                  }}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 3}>
							<InputFieldSignUp id={"age-signUp"} type={"number"} value={`${user.age}` || ""}
							                  isValid={userFields[3].isValid}
							                  conditions={userFields[3].conditions}
							                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								                  e.preventDefault();
								                  dispatch(setAge(Number(e.target.value)))
							                  }}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 4}>
							<SexeSelectSignUp value={user.sexe} onSelect={value => {
								if (user.sexe !== value) dispatch(setSexe(value))
							}}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 5}>
							<InputFieldSignUp id={"mdp-signUp"} type={"text"} value={user.mot_de_passe || ""}
							                  isValid={userFields[5].isValid}
							                  conditions={userFields[5].conditions}
							                  isPassword={true}
							                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								                  e.preventDefault();
								                  dispatch(setMotDePasse(e.target.value))
							                  }}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 6}>
							<div className={"m-0.5"}>

										<textarea id={"objectif_principal-signUp"}
										          className={clsx(
											          "max-w-[600px] w-full min-h-[120px] p-4 text-gray-300 text-xl sm:text-2xl rounded-3xl bg-secondary focus:outline-none focus:ring-1 focus:ring-primary",
											          "resize-none"
										          )}
										          rows={3}
										          maxLength={91}
										          value={user.objectif_principal || ""}
										          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
											          e.preventDefault();
											          dispatch(setObjectifPrincipal(e.target.value))
										          }}
										/>

							</div>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 7}>
							<InputFieldSignUp id={"secteur_activite-signUp"} type={"text"}
							                  isValid={userFields[7].isValid}
							                  conditions={userFields[7].conditions}
							                  value={user.secteur_activite || ""}
							                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								                  e.preventDefault();
								                  dispatch(setSecteurActivite(e.target.value))
							                  }}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 8}>
							<ContentSelectSignUp value={user.type_contenu_prefere} onSelect={value => {
								if (user.type_contenu_prefere != value) dispatch(setTypeContenuPrefere(value))
							}}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 9}>
							<AgeRangeSelectSignUp value={user.publics_cibles} isMale={!Boolean(user.sexe == SexeEnum.Male)}
							                      onChange={(value) => dispatch(setPublicsCibles(value))}/>
						</SignUpSlider>

						<SignUpSlider show={selectedField == 10}>
							<button aria-disabled={pending}
							        className={clsx(
								        "w-fit h-fit px-10 py-5 text-gray-300 font-bold text-4xl text-center sm:text-6xl lg:text-8xl rounded-3xl bg-secondary focus:outline-none focus:ring-1 focus:ring-primary"
							        )}
							        onClick={submit}
							>
								VALIDER
							</button>
						</SignUpSlider>

					</div>

					<div className={"hidden sm:block md:m-24 m-16 rounded-full active:ring-1 active:ring-primary"}
					     onClick={e => incrementField()}
					>
						<ArrowRightCircleIcon className={"size-10 fill-secondary"}/>
					</div>

				</div>

				<div
					className={"sm:hidden absolute top-0 left-0 pb-24 flex-grow w-full h-full flex flex-col justify-end"}>

					<div className={"sm:hidden flex justify-between px-32"}>
						<div className={"rounded-full active:ring-1 active:ring-primary"}
						     onClick={e => decrementField()}
						>
							<ArrowLeftCircleIcon className={"size-24 fill-secondary"}/>
						</div>
						<div className={"rounded-full active:ring-1 active:ring-primary"}
						     onClick={e => incrementField()}
						>
							<ArrowRightCircleIcon className={"size-24 fill-secondary"}/>
						</div>
					</div>

					<span className={"text-gray-300 font-bold text-2xl text-center"}>
							Or swipe
						</span>

				</div>

			</div>

		</div>
	)

}




