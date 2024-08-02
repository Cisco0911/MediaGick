'use client';

import React, {ComponentProps, ReactNode} from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {CircularProgress} from "@nextui-org/progress";

export type ButtonState = "active" | "inactive" | "busy";

type ButtonProps = ComponentProps<typeof motion.button> & {
	children: ReactNode;
	variant?: 'primary' | 'secondary';
	state?: ButtonState;
	busyIcon?: ReactNode; // Custom spin class

}

const Button: React.FC<ButtonProps> = React.forwardRef(({
	                                       children,
	                                       variant,  // Default variant
	state = 'active',  // Default state
	busyIcon,
	                                       ...others
                                       }, ref) => {
	const buttonClasses = clsx(
		"flex justify-center items-center",
		'focus:outline-none focus-visible:outline-none focus-within:outline-none',
		{"bg-custom_white text-secondary": state === 'active' && variant === 'secondary'},
		{"bg-primary text-tertiary": state === 'active' && variant === 'primary'},
		{"pointer-events-none": !variant && (state === 'inactive' || state === 'busy')},
		{"bg-[#b6bcbc] text-secondary pointer-events-none": variant && (state === 'inactive' || state === 'busy')},
		others.className,
	);

	return (
		<motion.button
			ref={ref}
			whileHover={{scale: 1.1}}
			whileTap={{scale: 0.9}}
			{...others}
			className={buttonClasses}
		>
			{state === 'busy' ?  (
				busyIcon ?? <CircularProgress color="primary"/>
			) : children}
		</motion.button>
	);
});


Button.displayName = 'Button';

export default Button;
