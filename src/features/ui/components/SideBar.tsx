import NavBarItemLayout from "@features/ui/components/NavBarItemLayout";
import {Bars3BottomLeftIcon} from "@heroicons/react/24/outline";
import NavLink from "@features/ui/components/NavLink";
import {ComputerDesktopIcon, Squares2X2Icon, SquaresPlusIcon, UserIcon} from "@heroicons/react/24/solid";
import {motion, Variants} from "framer-motion";
import {useState} from "react";
import CreditButton from "@features/ui/components/CreditButton";
import LogoutButton from "@features/ui/components/LogoutButton";


export default function SideBar()
{

	const variants : Variants = {
		open: {
			width: "16.25rem",
			// transition: {
			// 	when: "beforeChildren",
			// }
		},
		closed: {
			width: "5.75rem",
			// transition: {
			// 	when: "afterChildren",
			// }
		}
	}

	const [open, setOpen] = useState(true)


	return (
		<motion.div className={"relative h-full px-5 py-2.5 overflow-hidden flex-shrink-0"}
		            variants={variants}
		            initial={false}
		            animate={open ? "open" : "closed"}
		            // whileHover={"open"}
		            transition={{
						type: "spring",
			            stiffness: 700,
			            damping: 30,
			            // mass: 0.7
		            }}
		            // onMouseEnter={ () => setOpen(true) }
		            // onMouseLeave={ () => setOpen(false) }
		>

			{/*<div className={"invisible bg-amber-300 size-8 px-2.5 box-content"} />*/}

			<div className={"absolute top-0 left-0 w-full h-full bg-[#0e191e] px-5 py-2.5 space-y-28"}>

				<div>
					<NavBarItemLayout>
						<Bars3BottomLeftIcon className={"size-8 text-custom_white"}
						                     onClick={() => setOpen(!open)}
						/>
						<span className={"text-primary text-3xl text-center font-bold"}>
								MEDIAGICK
							</span>
					</NavBarItemLayout>
				</div>

				<div className={"flex flex-col space-y-2.5"}>

					<NavLink href={"/dashboard"}
					         Icon={Squares2X2Icon}
					         label={"Tableau de bord"}/>

					<NavLink href={"/resources"}
					         Icon={SquaresPlusIcon}
					         label={"Ressources"}/>

					<NavLink href={"/workshop"}
					         Icon={ComputerDesktopIcon}
					         label={"Studio de création"}/>

					<NavLink href={"/account"}
					         Icon={UserIcon}
					         label={"Mon compte"}/>

				</div>

				<div>
					<CreditButton isNavOpen={open} />
				</div>

				<div>
					<LogoutButton />
				</div>

			</div>

		</motion.div>
	)

}