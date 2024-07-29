import {motion, Variants} from "framer-motion";


type Props = {
	children: [React.ReactNode, React.ReactNode];
};


export default function NavBarItemLayout({ children }: Props) {

	const variants : Variants = {
		open: {
			display: "flex",
		},
		closed: {
			display: "flex",
		}
	}

	return (
		<div className={"relative w-full h-full flex space-x-2.5"}>
			<div className={"px-2.5 flex justify-center items-center"}>
				{children[0]}
			</div>
			<motion.div className={"px-3 flex justify-center items-center"}
			            variants={variants}
			>
				{children[1]}
			</motion.div>
		</div>
	);
}
