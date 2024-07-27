import AvatarCard from "@features/ui/components/AvatarCard";
import Image from "next/image";
import sexeMale from "@/app/_assets/image/avatars/sexe-male.png";
import sexeFemale from "@/app/_assets/image/avatars/sexe-female.png";


type props = {
	value: "M" | "F" | null | undefined,
	onSelect: (value: "M" | "F") => void,
}


const SexeSelectSignUp = ({ value, onSelect }: props) => {

	return(
		<div className={"bg-transparent"}>
			<div className="relative m-0.5 flex justify-center items-center space-x-10">

				<div onClick={() => onSelect("M")}>
					<AvatarCard label={"Masculin"} isActive={value === "M"} activeColor={"#5ac8f4"}>
						<Image src={sexeMale}
						       alt={"Male"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onSelect("F")}>
					<AvatarCard label={"Féminin"} isActive={value === "F"} activeColor={"#ec5796"}>
						<Image src={sexeFemale}
						       alt={"Female"}
						       width={1024}
						       height={1024}
						       quality={100}
						/>
					</AvatarCard>
				</div>

			</div>
		</div>
	)

}

export default SexeSelectSignUp