import clsx from "clsx";
import {AnimatePresence, motion, Variants} from "framer-motion";
import NavBarItemLayout from "@features/ui/components/NavBarItemLayout";
import {useState} from "react";
import {SparklesIcon} from "@heroicons/react/24/solid";



type Props = {
	isNavOpen: boolean
}


export default function CreditButton({isNavOpen}: Props) {

	const [isActive, setIsActive] = useState(false);
	
	const variants: Variants = {
		initial: {

		},
		hover: {

		},
		active: {
			
		}
	}
	
	const backgroundVariants: Variants = {
		initial: {
			opacity: 0
		},
		hover: {
			opacity: 1
		},
		active: {
			opacity: 1
		}
	}

	const childVariants: Variants = {
		initial: {
			x: "-2.375rem"
		},
		hover: {
			x: 0
		},
		active: {
			x: 0
		},
		navOpen: {
			x: "-2.375rem"
		}
	}


	return (
		<motion.div
			className={clsx(
				"group py-2.5 rounded-xl relative cursor-pointer overflow-hidden",
				{"active": isActive}
			)}
			variants={variants}
			initial={"initial"}
			animate={isActive ? (isNavOpen ? "active" : ["active", "navOpen"]) : "initial"}
			whileHover={"hover"}
			onClick={() => setIsActive(!isActive)}
		>
			<motion.div className={"nav-link-background"}
			            variants={backgroundVariants}
			/>

			<motion.div className={"relative z-10 flex items-center"}
			            variants={childVariants}>

				<div className={"min-w-1.5 max-w-1.5 min-h-1.5 max-h-1.5 mx-4 bg-black rounded-full"}>
					<AnimatePresence>
						{isActive && <motion.div className={"glowing-dot"} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/>}
					</AnimatePresence>
				</div>

				<NavBarItemLayout>
					<motion.div
						className={"text-custom_white/80 group-hover:text-custom_white group-[.active]:text-amber-400"}>
						<SparklesIcon className={"size-8"}/>
					</motion.div>
					<motion.span
						className={"flex items-center text-custom_white/80 text-lg text-center whitespace-nowrap group-hover:text-custom_white group-[.active]:text-white"}>
						Crédits
						<div className={"min-w-1 max-w-1 min-h-1 max-h-1 mx-1 bg-custom_white/80 group-hover:bg-custom_white group-[.active]:bg-amber-400 rounded-full"}/>
							200k
					</motion.span>
				</NavBarItemLayout>

			</motion.div>

		</motion.div>
);
}