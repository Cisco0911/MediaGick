'use client'

import {Transition} from "@headlessui/react";
import clsx from "clsx";
import {motion, AnimatePresence} from "framer-motion";


type props = {
	children: React.ReactNode;
	show: boolean
}

const SignUpSlider = ({children, show}: props) => {

	return(
		<>
			<AnimatePresence initial={false}>
				{
					show &&
					(
						<>
							<motion.div
								className={"z-10 w-full"}
								layout={"position"}
								initial={{opacity: 0, y: 30, position: "absolute"}}
								animate={{opacity: 1, y: 0, position: "relative", transition: {
										delay: 0.25, duration: 0.1,
										position: { delay: 0.2, duration: 0 },
										y: {
											type: "spring",
											stiffness: 700,
											mass: 1.5,
											damping: 20
										}
								}}}
								exit={{opacity: 0, y: -30, position: "absolute", transition: {
										delay: 0.1, duration: 0.1,
										opacity: { delay: 0.1, duration: 0.05, ease: "easeOut" },
										position: { delay: 0.2, duration: 0 }
								}}}
							>
								{children}
							</motion.div>
						</>
					)
				}
			</AnimatePresence>
		</>
	)

}

export default SignUpSlider