import AvatarCard from "@features/ui/components/AvatarCard";
import Image from "next/image";
import sexeMale from "@/app/_assets/image/avatars/sexe-male.png";
import sexeFemale from "@/app/_assets/image/avatars/sexe-female.png";
import {SexeEnum} from "@app/_lib/enums";


type props = {
	value: SexeEnum | null | undefined,
	onSelect: (value: SexeEnum) => void,
}


const SexeSelectSignUp = ({ value, onSelect }: props) => {

	return(
		<div className={"bg-transparent"}>
			<div className="relative m-0.5 flex justify-center items-center space-x-10">

				<div onClick={() => onSelect(SexeEnum.Male)}>
					<AvatarCard label={"Masculin"} isActive={value === SexeEnum.Male} activeColor={"#5ac8f4"}>
						<Image src={sexeMale}
						       alt={"Male"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onSelect(SexeEnum.Female)}>
					<AvatarCard label={"Féminin"} isActive={value === SexeEnum.Female} activeColor={"#ec5796"}>
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