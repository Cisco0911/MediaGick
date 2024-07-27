'use client'

import React from 'react';

type InputFieldProps = {
	id: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({ id, type, value, onChange, placeholder }) => {
	return (
		<div className="relative">
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				required
				className="peer h-10 w-full px-2.5 border-0 rounded-md ring-1 ring-inset ring-gray-300 text-gray-900 placeholder-transparent focus:ring-2 focus:ring-primary focus:ring-inset focus-visible:outline-none"
				placeholder={placeholder}
			/>
			<label
				htmlFor={id}
				className="absolute left-2.5 -top-3.5 bg-white px-1 rounded-lg text-gray-600 text-sm transition-all
				peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
				peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:border-[1px] peer-focus:border-b-0 peer-focus:border-primary"
			>
				{placeholder}
			</label>
		</div>
	);
};

export default InputField;