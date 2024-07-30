'use client'

import React from 'react';
import clsx from "clsx";

type InputFieldProps = {
	id: string;
	type: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isValid: (value: any) => boolean;
	placeholder: string;
	Icon?: React.ComponentType<{ className?: string }>;
	iconClassName?: string;
	className?: string;
};

const InputField: React.FC<InputFieldProps> = ({ id, type, name, value, onChange, isValid, placeholder, Icon, iconClassName, className }) => {
	return (
		<div className={clsx(
			"relative h-auto aspect-[309/50] flex items-center px-2.5 space-x-2.5",
			className,
			// "focus-visible:outline-none focus-within:outline-none",
			"focus-within:ring-2  focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-secondary",
			{"focus-within:ring-red-500": !isValid(value)}
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
		</div>
	);
};

export default InputField;