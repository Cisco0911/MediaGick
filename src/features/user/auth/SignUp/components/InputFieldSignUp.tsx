import React from "react";
import clsx from "clsx";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import { ZodType } from "zod";
import {AnimatePresence, motion} from "framer-motion";


type InputFieldProps = {
	id: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isPassword?: boolean;
	schema?: ZodType<string | number>;
};

const InputFieldSignUp: React.FC<InputFieldProps> = ({ id, type, value, onChange, schema, isPassword = false }) => {

	const [showPassword, setShowPassword] = React.useState(false);

	const result = schema?.safeParse(value);

	let error;

	if (result?.success === false) {
		error = result.error.issues[0].message;
	}
	else error = null;

	return(
		<div className="m-0.5 mx-10 flex justify-center">
			<div className={"group relative w-full flex justify-center"}>

				<input id={id} className={clsx(
					{"password-input": isPassword},
					"xl:max-w-[75vh] w-full aspect-[390/80] px-2.5 text-gray-300 text-xl sm:text-4xl text-center xl:text-5xl rounded-3xl bg-secondary",
					"focus:outline-none focus:ring-2 focus:ring-primary",
					"",
					{"focus:ring-red-500": !!error}
				)}
				       value={value}
				       type={isPassword ? (showPassword ? "text" : "password") : type}
				       autoFocus
				       onChange={onChange}
				/>


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

				<AnimatePresence>
					{error &&
                        <motion.div className={clsx(
	                        "hidden group-focus-within:block bg-secondary px-1.5 text-medium",
	                        "rounded-md border border-red-500 sm:border-t-0",
	                        "absolute sm:left-[5%] top-[200%] z-10 sm:top-[98%]"
                        )}

                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10, transition: { opacity: { duration: 0.1 } } }}
                        >
                            <span className={"text-xs text-red-500"}>{error}</span>
                        </motion.div>}
				</AnimatePresence>

			</div>
		</div>
	)
}


export default InputFieldSignUp;