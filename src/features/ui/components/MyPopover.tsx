import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {motion, Variants} from "framer-motion";


type Props = {
	children: [React.ReactNode, React.ReactNode];
	placement: "left-start" | "left-end" | "right-start" | "right-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end"
	offset?: number
	backdrop?: "blur" | "opaque" | "transparent"
	isOpen?: boolean
	onToggle?: () => void
}

export default function MyPopover({children, placement, offset, backdrop, isOpen, onToggle}: Props) {


	const variants: {variants: Variants} = {
		variants: {
			initial: {
				y: "5rem",
				opacity: 0,
			},
			enter: {
				y: 0,
				opacity: 1,
				transition: {
					when: "beforeChildren",
					duration: 0.1
				},
			},
			exit: {
				y: "5rem",
				opacity: 0,
				transition: {
					opacity: {
						duration: 0.1,
					},
					y: {
						duration: 0.2,
					},
				},
			}
		}
	}
	const childVariants : Variants= {
		initial: {
			y: "2rem",
			opacity: 0,
		},
		enter: {
			y: 0,
			opacity: 1,
		},
		exit: {
			// y: "10rem",
			opacity: 0,
			// transition: {
			// 	opacity: {
			// 		duration: 0.1,
			// 	},
			// 	y: {
			// 		duration: 0.2,
			// 	},
			// },
		}
	}


	return(
		<Popover placement={placement}
		         offset={offset}
		         backdrop={backdrop}
		         motionProps={variants}
		         classNames={{
			         // base: [
				     //     // arrow color
				     //     "before:bg-default-200"
			         // ],
			         content: [
				         "bg-secondary/70 p-0 overflow-hidden",
			         ],
		         }}
		         isOpen={isOpen}
		         onOpenChange={onToggle}
		>
			<PopoverTrigger>
				{children[0]}
			</PopoverTrigger>
			<PopoverContent>
				<motion.div className={"backdrop-blur-xl"} variants={childVariants}>
					{children[1]}
				</motion.div>
			</PopoverContent>
		</Popover>
	)

}