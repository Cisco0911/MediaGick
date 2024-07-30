'use client';

import React, {ComponentProps} from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type ButtonProps = ComponentProps<typeof motion.button> & {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary';
};


const Button: React.FC<ButtonProps> = React.forwardRef(({
	                                       children,
	                                       variant = 'primary',  // Default variant
	                                       ...others
                                       }, ref) => {
	const buttonClasses = clsx(
		others.className,
		'focus:outline-none focus-visible:outline-none focus-within:outline-none',
		{"bg-custom_white text-secondary": variant === 'secondary'},
		{"bg-primary text-tertiary": variant === 'primary'},
	);

	return (
		<motion.button
			ref={ref}
			whileHover={{scale: 1.1}}
			whileTap={{scale: 0.9}}
			{...others}
			className={buttonClasses}
		>
			{children}
		</motion.button>
	);
});

export default Button;
