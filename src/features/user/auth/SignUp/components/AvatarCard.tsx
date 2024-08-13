"use client"

import {ReactNode, useState} from "react";
import clsx from "clsx";
import {motion, Variants} from "framer-motion";


type props = {
	children: ReactNode,
	label: string,
	isActive: boolean,
	activeColor: string,
	activeOnHover?: boolean
	rotate?: number
	className?: string,
}


const AvatarCard = ({children, label, isActive, activeColor, activeOnHover = false, rotate, className}: props) => {

	const variants: Variants = {
		initial: {
		},
		hover: {
			backgroundColor: activeOnHover ? activeColor : undefined,
		},
		active: {
			backgroundColor: activeColor
		}
	}

	const labelVariants = {
		initial: {},
		hover: {
			scale: 1.2,
			fontWeight: "bold",
			padding: "0 0.625rem 0 0.625rem",
			borderRadius: "0.625rem",
			backgroundColor: activeOnHover ? undefined : activeColor + "b2",
		},
		active: {}
	}
	const childVariants = {
		initial: {},
		hover: { scale: rotate ? 1.2 : 1.15, rotate: rotate || 0 },
		active: {}
	}

	const [state, setState] = useState<string>("initial")

	const spring = {
		type: "spring",
			stiffness: 1000,
			damping: 15
	}

	return(
		<motion.div className={clsx(
			"lg:size-56 md:size-44 size-28 md:rounded-3xl sm:rounded-2xl rounded-xl bg-secondary flex flex-col justify-end items-center",
			className)}
		            whileHover={isActive ? "active" : "hover"}
		            variants={variants}
		            animate={isActive ? "active" : state}
		>
			<motion.div className={"text-center md:text-3xl origin-top pointer-events-none"}
			            // animate={isActive ? "active" : state}
			            variants={labelVariants}
			            transition={{duration: 0.4, backgroundColor: {duration: 0.1}}}
			>
				{label}
			</motion.div>
			<motion.div className={clsx(
				"size-3/4 flex justify-center items-end pointer-events-none",
				{"origin-bottom": !rotate}, {"origin-bottom-right": rotate && rotate > 0}, {"origin-bottom-left": rotate && rotate < 0}
			)}
			            // animate={isActive ? "active" : state}
			            variants={childVariants}
			            transition={isActive ? spring : {duration: 0.4}}
			>
				{children}
			</motion.div>

		</motion.div>
	)

}

export default AvatarCard;