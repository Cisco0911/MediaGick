import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {motion} from "framer-motion";
import {XMarkIcon} from "@heroicons/react/24/outline";
import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import {useState} from "react";
import Button from "@features/ui/components/Button";
import MyPopover from "@features/ui/components/MyPopover";
import {z} from "zod";
import toast from "react-hot-toast";
import {changePwd} from "@app/_lib/actions/auth";


export default function ChangePasswordForm() {

	const [pwdForm, setPwdForm] = useState(
		{oldPassword: "", newPassword: "", confirmPassword: ""}
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setPwdForm({...pwdForm, [name]: value})
	};

	const pwdValidityFuncs = {
		oldPassword: (value: string) => value.length > 0,
		newPassword: (value: string) => value.length > 0,
		confirmPassword: (value: string) => value === pwdForm.newPassword
	}

	const [isOpen, setIsOpen] = useState(false)

	const [pending, setPending] = useState(false)

	const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		// let toastId = ""

		try {
			if (!pwdValidityFuncs.oldPassword(pwdForm.oldPassword) ||
				!pwdValidityFuncs.newPassword(pwdForm.newPassword) ||
				pwdForm.newPassword !== pwdForm.confirmPassword) {

				toast.error("Mot de passe invalide");

				return;
			}

			setPending(true);
			// toastId = toast.loading('Opération en cours...');

			const res = await changePwd(pwdForm.oldPassword, pwdForm.newPassword);

			if (res.ok){
				// toast.dismiss(toastId);
				toast.success("Opération reussie");

				setIsOpen(false);
			}
			else {
				// toast.dismiss(toastId);
				toast.error(`${res.error}`);
			}
		}
		catch (err) {
			console.log(err)
		}
		finally {
			setPending(false);
		}
	}


	return (
		<MyPopover placement={"left-start"}
		           offset={-100}
		           // backdrop={"blur"}
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
						                   value={pwdForm.oldPassword}
						                   onChange={handleChange}
						                   isValid={pwdValidityFuncs.oldPassword}
						                   placeholder={"Ancien mot de passe"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"NewPwdChangePwd"}
						                   type={"text"}
						                   name={"newPassword"}
						                   value={pwdForm.newPassword}
						                   onChange={handleChange}
						                   isValid={pwdValidityFuncs.newPassword}
						                   placeholder={"Nouveau mot de passe"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"ConfirmPwdChangePwd"}
						                   type={"text"}
						                   name={"confirmPassword"}
						                   value={pwdForm.confirmPassword}
						                   onChange={handleChange}
						                   isValid={pwdValidityFuncs.confirmPassword}
						                   placeholder={"Confirmer le mot de passe"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<Button className={"w-full px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
						        variant={"secondary"}
						        onClick={submit}
						>
							Valider
						</Button>
					</div>

				</div>

			</div>

		</MyPopover>
	)
}