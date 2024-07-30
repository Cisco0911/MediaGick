import Button from "@features/ui/components/Button";
import {XMarkIcon} from "@heroicons/react/24/outline";
import InputFieldDefault from "@features/ui/components/InputFieldDefault";
import MyPopover from "@features/ui/components/MyPopover";
import {useState} from "react";
import {CreditCardIcon} from "@heroicons/react/24/solid";
import {motion} from "framer-motion";


export default function RechargeWallet() {


	const [rechargeWalletForm, setRechargeWalletForm] = useState({
		accountNumberRechargeWallet: "",
		amountRechargeWallet: undefined,
		secretRechargeWallet: "",
		secretConfirmRechargeWallet: "",

	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setRechargeWalletForm({...rechargeWalletForm, [name]: value})
	};

	const rechargeWalletValidityFuncs = {
		accountNumberRechargeWallet: (value: string) => value.length > 0,
		amountRechargeWallet: (value: string) => {
			try {
				return Number(value) > 0
			}
			catch (e) {
				return false
			}
		},
		secretRechargeWallet: (value: string) => value.length > 0,
		secretConfirmRechargeWallet: (value: string) => value === rechargeWalletForm.secretRechargeWallet
	}

	const [isOpen, setIsOpen] = useState(false);


	return (
		<MyPopover placement={"top-end"}
		           offset={-100}
		           backdrop={"blur"}
		           isOpen={isOpen}
		           onToggle={() => setIsOpen(!isOpen)}
		>

			<Button className={"w-full px-2 py-4 rounded-xl flex justify-center items-center space-x-2.5"}
			        variant={"primary"}
			>
					<span className={"text-xl font-medium"}>
						Effectuer un paiement
					</span>
				<CreditCardIcon className={"size-6"}/>
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
								Effectuer un paiement
							</span>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"accountNumberRechargeWallet"}
						                   type={"text"}
						                   name={"accountNumberRechargeWallet"}
						                   value={rechargeWalletForm.accountNumberRechargeWallet}
						                   onChange={handleChange}
						                   isValid={rechargeWalletValidityFuncs.accountNumberRechargeWallet}
						                   placeholder={"Numéro de compte"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"amountRechargeWallet"}
						                   type={"number"}
						                   name={"amountRechargeWallet"}
						                   value={`${rechargeWalletForm.amountRechargeWallet}`}
						                   onChange={handleChange}
						                   isValid={rechargeWalletValidityFuncs.amountRechargeWallet}
						                   placeholder={"Montant"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"secretRechargeWallet"}
						                   type={"text"}
						                   name={"secretRechargeWallet"}
						                   value={rechargeWalletForm.secretRechargeWallet}
						                   onChange={handleChange}
						                   isValid={rechargeWalletValidityFuncs.secretRechargeWallet}
						                   placeholder={"Code secret"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<InputFieldDefault id={"secretConfirmRechargeWallet"}
						                   type={"text"}
						                   name={"secretConfirmRechargeWallet"}
						                   value={rechargeWalletForm.secretConfirmRechargeWallet}
						                   onChange={handleChange}
						                   isValid={rechargeWalletValidityFuncs.secretConfirmRechargeWallet}
						                   placeholder={"Confirmation"}
						                   className={"w-full rounded-xl bg-tertiary/65 text-custom_white text-medium"}
						/>
					</div>

					<div className={"w-full"}>
						<Button className={"w-full px-2 py-2 rounded-xl text-lg font-semibold"}
						        variant={"secondary"}
						>
							Valider
						</Button>
					</div>

				</div>

			</div>

		</MyPopover>
	);
}


