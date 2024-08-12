'use client'

import NavBarItemLayout from "@features/ui/components/NavBarItemLayout";
import Link from "next/link";
import clsx from "clsx";
import {usePathname} from "next/navigation";
import {AnimatePresence, motion, Variants} from "framer-motion";
import {CUSTOM_WHITE} from "@features/ui/theme";


type props = {
	href: string
	Icon: React.ComponentType<{ className?: string }>;
	label: string
}


export default function NavLink({ href, Icon, label }: props) {

	const pathname = usePathname()

	const isActive = pathname.startsWith(href)

	const variants: Variants = {
		initial: {
		},
		hover: {
			backgroundColor: "#0F1619",
			scale: isActive ? 1 : 1.1,
			transition: {
				duration: 0.3
			}
		},
	}
	const childVariants: Variants = {
		inactive: {

		},
		hover: {
			color: CUSTOM_WHITE
		},
		active: {
			color: CUSTOM_WHITE
		}
	}

	return(
		<Link href={href}>

			<motion.div
				className={clsx(
					"group py-2.5 rounded-xl relative cursor-pointer",
					// "hover:bg-[#0F1619]",
					{"active": isActive}
				)}
				variants={variants}
				whileHover={"hover"}
			>
				<AnimatePresence>
					{isActive && <motion.div className={"nav-link-background"}
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             exit={{ opacity: 0 }}
					/>}
				</AnimatePresence>

				<div className={"relative z-10"}>
					<NavBarItemLayout>
						<motion.div className={"text-custom_white/80 group-hover:text-custom_white group-[.active]:text-white"}>
							<Icon className={"size-8"}/>
						</motion.div>
						<motion.span className={"inline-block text-custom_white/80 text-lg text-center whitespace-nowrap group-hover:text-custom_white group-[.active]:text-white"}>
							{label}
						</motion.span>
					</NavBarItemLayout>
				</div>

			</motion.div>

		</Link>
	)

}