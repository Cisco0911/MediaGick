import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	variant?: 'primary' | 'secondary';
	others?: any;
	// Add more variants or props as needed
};

const Button: React.FC<ButtonProps> = ({
	                                       children,
	                                       onClick,
	                                       className,
	                                       variant = 'primary', // Default variant
	                                       others,
                                       }) => {
	const buttonClasses = clsx(
		className,
		'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline',
		'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 ' +
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-primary focus-visible:outline-none', // Base styles
		{
			'bg-primary': variant === 'primary',
			'bg-secondary': variant === 'secondary',
			// Add styles for other variants
		}
	);

	return (
		<button className={buttonClasses} onClick={onClick} {...others}>
			{children}
		</button>
	);
};

export default Button;
