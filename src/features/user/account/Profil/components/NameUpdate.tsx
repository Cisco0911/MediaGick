"use client"

import {XMarkIcon} from "@heroicons/react/24/outline";
import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import React, {useState} from "react";
import Button, {ButtonState} from "@features/ui/components/Button";
import MyPopover from "@features/ui/components/MyPopover";
import toast from "react-hot-toast";
import {changePwd, updateInfo} from "@app/_lib/actions/auth";
import {nomSchema} from "@app/_lib/schemas";
import {z} from "zod";
import {CircularProgress} from "@nextui-org/progress";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import {UserInfo} from "@app/_lib/interfaces";
import {useRouter} from "next/navigation";


type NameUpdateProps = {
	// user: UserInfo
	name: string
}

export default function NameUpdate({name}: NameUpdateProps) {

	const router = useRouter()

	const [newName, setNewName] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewName(e.target.value)
	};

	const formValidation = nomSchema


	const [isOpen, setIsOpen] = useState(false)

	const [pending, setPending] = useState(false)

	const submitState: ButtonState = pending ? "busy" : (formValidation.safeParse(newName).success) ? "active" : "inactive";
	const BusyIcon = <CircularProgress classNames={{
		svg: "h-[1.75rem]",
		indicator: "stroke-tertiary"
	}} />

	const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		try {

			setPending(true);

			const res = await updateInfo({nom: newName});

			if (res && !res.ok){

				toast.error(`${res.error}`);

			}
			else {

				toast.success("Nom mis a jour")
				setIsOpen(false)

				router.refresh()
			}
		}
		catch (err) {
			console.log(err)
			toast.error(`${err}`);
		}
		finally {
			setPending(false);
		}
	}


	return (
		<MyPopover placement={"bottom-start"}
		           offset={-100}
		           backdrop={"blur"}
		           isOpen={isOpen}
		           onToggle={() => setIsOpen(!isOpen)}
		>

			<div
				className={"w-full flex justify-between text-xl cursor-pointer"}>

				<span>
					Nom
				</span>

				<div className={"flex space-x-2"}>

					<span>
						{name}
					</span>

					<PencilSquareIcon
						className={"w-6 h-6 fill-custom_white"}/>

				</div>

			</div>

			<div className={"p-5"}>

				<div className={"flex flex-col items-end space-y-2"}>

					<div className={"p-1 w-fit h-fit rounded-full bg-tertiary/35"}
					     onClick={() => setIsOpen(false)}
					>
						<XMarkIcon className={"size-3 stroke-custom_white"}/>
					</div>

					<div className={"w-72 text-custom_white font-semibold text-xl text-center"}>
							<span>
								Modifier le Nom
							</span>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"NameUpdate"}
						                   type={"text"}
						                   name={"NameUpdate"}
						                   value={newName}
						                   onChange={handleChange}
						                   placeholder={"Entrer votre nom"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						                   schema={nomSchema}
						/>
					</div>

					<div className={"w-full"}>
						<Button className={"w-full px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
						        variant={"secondary"}
						        onClick={submit}
						        state={submitState}
						        busyIcon={BusyIcon}
						>
							Valider
						</Button>
					</div>

				</div>

			</div>

		</MyPopover>
	)
}