import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {motion} from "framer-motion";
import {XMarkIcon} from "@heroicons/react/24/outline";
import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import React, {useState} from "react";
import Button, {ButtonState} from "@features/ui/components/Button";
import MyPopover from "@features/ui/components/MyPopover";
import toast from "react-hot-toast";
import {changePwd} from "@app/_lib/actions/auth";
import {emailSchema, passwordSchema} from "@app/_lib/schemas";
import {z} from "zod";
import {CircularProgress} from "@nextui-org/progress";


export default function ChangePasswordForm() {

	const [changePwdForm, setChangePwdForm] = useState(
		{oldPassword: "", newPassword: "", confirmPassword: ""}
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setChangePwdForm({...changePwdForm, [name]: value})
	};

	const confirmPwdSchema = z
		.string({ required_error: "Veuillez confirmer votre mot de passe" })
		.refine((val) => val === changePwdForm.newPassword, {
			message: "Tu veux tromper qui ? 😒",
			path: ["confirmPassword"],
		})

	const formValidation = z
		.object({
			oldPassword: passwordSchema,
			newPassword: passwordSchema,
			confirmPassword: confirmPwdSchema
		})


	const [isOpen, setIsOpen] = useState(false)

	const [pending, setPending] = useState(false)

	const submitState: ButtonState = pending ? "busy" : (formValidation.safeParse(changePwdForm).success) ? "active" : "inactive";
	const BusyIcon = <CircularProgress classNames={{
		svg: "h-[1.75rem]",
		indicator: "stroke-tertiary"
	}} />

	const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		try {

			setPending(true);

			const res = await changePwd(changePwdForm.oldPassword, changePwdForm.newPassword);

			if (res && !res.ok){

				toast.error(`${res.error}`);

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
		<MyPopover placement={"left-start"}
		           offset={-100}
		           backdrop={"blur"}
		           isOpen={isOpen}
		           onToggle={() => setIsOpen(!isOpen)}
		>

			<Button className={"max-w-80 w-full px-2 xl:px-10 py-4 rounded-xl text-xl font-medium"}
			        variant={"secondary"}
			>
				Changer le mot de passe
			</Button>

			<div className={"p-5"}>

				<div className={"flex flex-col items-end space-y-2"}>

					<div className={"p-1 w-fit h-fit rounded-full bg-tertiary/35"}
					     onClick={() => setIsOpen(false)}
					>
						<XMarkIcon className={"size-3 stroke-custom_white"}/>
					</div>

					<div className={"w-72 text-custom_white font-semibold text-xl text-center"}>
							<span>
								Changer le mot de passe
							</span>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"OldPwdChangePwd"}
						                   type={"text"}
						                   name={"oldPassword"}
						                   value={changePwdForm.oldPassword}
						                   onChange={handleChange}
						                   placeholder={"Ancien mot de passe"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						                   schema={passwordSchema}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"NewPwdChangePwd"}
						                   type={"text"}
						                   name={"newPassword"}
						                   value={changePwdForm.newPassword}
						                   onChange={handleChange}
						                   placeholder={"Nouveau mot de passe"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						                   schema={passwordSchema}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"ConfirmPwdChangePwd"}
						                   type={"text"}
						                   name={"confirmPassword"}
						                   value={changePwdForm.confirmPassword}
						                   onChange={handleChange}
						                   placeholder={"Confirmer le mot de passe"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						                   schema={confirmPwdSchema}
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