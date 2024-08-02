import {AnimatePresence, motion, Variants} from "framer-motion";
import {CUSTOM_WHITE} from "@features/ui/theme";
import Link from "next/link";
import clsx from "clsx";
import NavBarItemLayout from "@features/ui/components/NavBarItemLayout";
import {ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline";
import React from "react";
import {logout} from "@app/_lib/actions/auth";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function LogoutButton() {

	const variants: Variants = {
		initial: {
		},
		hover: {
		},
		tap: { scale: 0.9 }
	}
	const backgroundVariants: Variants = {
		initial: {
			opacity: 0
		},
		hover: {
			opacity: 1
		},
	}

	const router = useRouter()
	const [pending, setPending] = React.useState(false);

	const onClick = async (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault()

		let toastId = ""

		try {

			setPending(true);
			// toastId = toast.loading('Deconnexion...');

			const ok = await logout();

			if (ok){
				toast.dismiss(toastId);
				toast.success("Deconnexion reussie");

				// router.push("/login")
			}
		}
		catch (err) {
			toast.dismiss(toastId);
			toast.error(`${err}`);
		}
		finally {
			setPending(false);
		}
	}

	return(
		<motion.div
			aria-disabled={pending}
			className={clsx(
				"group py-2.5 rounded-xl relative cursor-pointer",
			)}
			variants={variants}
			initial={"initial"}
			whileHover={"hover"}
			whileTap={"tap"}
			onClick={onClick}
		>
			<motion.div className={"nav-logout-background"}
			            variants={backgroundVariants}
			/>

			<div className={"relative z-10"}>
				<NavBarItemLayout>
					<motion.div
						className={"text-custom_white/80 group-hover:text-custom_white"}>
						<ArrowLeftStartOnRectangleIcon className={"size-8"}/>
					</motion.div>
					<motion.span
						className={"text-custom_white/80 text-lg text-center whitespace-nowrap group-hover:text-custom_white"}>
						Deconnexion
					</motion.span>
				</NavBarItemLayout>
			</div>

		</motion.div>
	)

}