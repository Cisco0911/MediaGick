'use client'

import React from 'react';
import clsx from "clsx";
import {ZodType} from "zod";
import {AnimatePresence, motion} from "framer-motion";

type InputFieldProps = {
	id: string;
	type: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	Icon?: React.ComponentType<{ className?: string }>;
	iconClassName?: string;
	className?: string;
	schema?: ZodType<string | number>;
};

const InputField: React.FC<InputFieldProps> = ({
	                                               id,
	                                               type,
	                                               name,
	                                               value,
	                                               onChange,
	                                               placeholder,
	                                               Icon,
	                                               iconClassName,
	                                               className,
	                                               schema
}) => {

	const result = schema?.safeParse(value);

	let error;

	if (result?.success === false) {
		error = result.error.issues[0].message;
	}
	else error = null;

	return (
		<div className={clsx(
			"group relative h-auto aspect-[309/50] flex items-center px-2.5 space-x-2.5",
			className,
			// "focus-visible:outline-none focus-within:outline-none",
			"focus-within:ring-2 focus-within:ring-primary",
			{"focus-within:ring-red-500": !!error}
		)}>


			{ Icon && <Icon className={clsx("size-6 flex-shrink-0", iconClassName)}/> }
			<input
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				required
				className="flex-grow bg-transparent outline-none h-full"
				placeholder={placeholder}
			/>

			<AnimatePresence>
				{error &&
                    <motion.div className="hidden group-focus-within:block absolute right-0 top-[95%] z-10 bg-black px-1.5 rounded-md ring-1 ring-red-500"

                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10, transition: { opacity: { duration: 0.1 } } }}
                    >
                        <span className={"text-xs text-red-500"}>{error}</span>
                    </motion.div>}
			</AnimatePresence>

		</div>
	);
};

export default InputField;