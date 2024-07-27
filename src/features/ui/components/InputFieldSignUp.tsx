import React from "react";
import clsx from "clsx";
import {ChevronDoubleRightIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";


type InputFieldProps = {
	id: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isValid: (value: string | number) => boolean;
	conditions: string[];
	isPassword?: boolean;
};

const InputFieldSignUp: React.FC<InputFieldProps> = ({ id, type, value, onChange, isValid, conditions, isPassword = false }) => {

	const [showPassword, setShowPassword] = React.useState(false);

	return(
		<div className="m-0.5 mx-10 flex justify-center">
			<div className={"group relative"}>
				<input id={id} className={clsx(
					{"password-input": isPassword},
					"max-w-[400px] max-h-[80px] w-full h-[50px] sm:h-[80px] px-2.5 text-gray-300 text-4xl text-center sm:text-6xl rounded-3xl bg-secondary focus:outline-none focus:ring-1 focus:ring-primary",
					{"focus:ring-red-500": !isValid(value)}
				)}
				       value={value}
				       type={isPassword ? (showPassword ? "text" : "password") : type}
				       autoFocus
				       onChange={onChange}
				/>

				<Popover>
					<PopoverButton className={clsx(
						"absolute -top-11 -right-0 text-red-500 rounded-full p-1 bg-secondary cursor-pointer",
						{"hidden group-focus-within:block": !isValid(value)},
						{"hidden": isValid(value)})}
					>
						<ExclamationTriangleIcon className={"size-8"} />
					</PopoverButton>
					<PopoverPanel
						anchor={{ to: 'top end', gap: '4px' }}
						className="p-3 rounded-xl bg-black/80 text-sm/6"
					>
						<div className={"flex flex-col space-y-2 backdrop-blur-xl"}>

							{
								conditions.map((condition, index) => {
									return (
										<div key={index} className="flex justify-start items-center rounded-lg py-2 px-3 bg-white/5">
											<div className={"p-1"}>
												<ChevronDoubleRightIcon className="size-6 font-semibold text-primary"></ChevronDoubleRightIcon>
											</div>
											<p className="text-white">{condition}</p>
										</div>
									)
								})
							}

						</div>
					</PopoverPanel>
				</Popover>

				<div className={clsx(
					"absolute -bottom-11 -right-0 rounded-full p-1 bg-secondary cursor-pointer",
					{"hidden": !isPassword}
				)}
					onClick={() => setShowPassword(!showPassword)}
				>
					{
						showPassword ?
							<EyeSlashIcon className={"size-8 text-primary"} /> :
							<EyeIcon className={"size-8 text-black"} />
					}
				</div>
			</div>
		</div>
	)
}


export default InputFieldSignUp;