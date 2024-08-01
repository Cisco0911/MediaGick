import AvatarCard from "@features/ui/components/AvatarCard";
import Image from "next/image";
import maleUnder18 from "@/app/_assets/image/avatars/male-age-range/under-18.png";
import male18_24 from "@/app/_assets/image/avatars/male-age-range/18-24.png";
import male25_34 from "@/app/_assets/image/avatars/male-age-range/25-34.png";
import male35_54 from "@/app/_assets/image/avatars/male-age-range/35-54.png";
import male50_77 from "@/app/_assets/image/avatars/male-age-range/50-77.png";
import femaleUnder18 from "@/app/_assets/image/avatars/female-age-range/under-18.png";
import female18_24 from "@/app/_assets/image/avatars/female-age-range/18-24.png";
import female25_34 from "@/app/_assets/image/avatars/female-age-range/25-34.png";
import female35_54 from "@/app/_assets/image/avatars/female-age-range/35-54.png";
import female50_77 from "@/app/_assets/image/avatars/female-age-range/50-77.png";
import {PublicsCiblesEnum, SexeEnum} from "@app/_lib/enums";
import {toggleValueInList} from "@app/_lib/function_lib";


type props = {
	value: PublicsCiblesEnum[] | null | undefined,
	isMale: boolean
	onChange: (value: PublicsCiblesEnum[]) => void,
}


const AgeRangeSelectSignUp = ({ value, isMale = true, onChange }: props) => {



	return(
		<div className={"bg-transparent"}>
			<div className="relative m-auto flex flex-wrap justify-center items-center gap-10">

				<div onClick={() => onChange( toggleValueInList<PublicsCiblesEnum>(value || [], PublicsCiblesEnum.AGES_13_18) )}>
					<AvatarCard label={"Moins de 18"} isActive={ Boolean(value?.includes(PublicsCiblesEnum.AGES_13_18)) } activeColor={"#f5b85b"}>
						<Image src={isMale ? maleUnder18 : femaleUnder18}
						       alt={"Under 18"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onChange( toggleValueInList<PublicsCiblesEnum>(value || [], PublicsCiblesEnum.AGES_18_24) )}>
					<AvatarCard label={"18 - 24"} isActive={ Boolean(value?.includes(PublicsCiblesEnum.AGES_18_24)) } activeColor={"#f5b85b"}>
						<Image src={isMale ? male18_24 : female18_24}
						       alt={"18 - 24"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onChange( toggleValueInList<PublicsCiblesEnum>(value || [], PublicsCiblesEnum.AGES_25_34) )}>
					<AvatarCard label={"25 - 34"} isActive={ Boolean(value?.includes(PublicsCiblesEnum.AGES_25_34)) } activeColor={"#f5b85b"}>
						<Image src={isMale ? male25_34 : female25_34}
						       alt={"25 - 34"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onChange( toggleValueInList<PublicsCiblesEnum>(value || [], PublicsCiblesEnum.AGES_35_54) )}>
					<AvatarCard label={"35 - 54"} isActive={ Boolean(value?.includes(PublicsCiblesEnum.AGES_35_54)) } activeColor={"#f5b85b"}>
						<Image src={isMale ? male35_54 : female35_54}
						       alt={"35 - 54"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onChange( toggleValueInList<PublicsCiblesEnum>(value || [], PublicsCiblesEnum.AGES_50_77) )}>
					<AvatarCard label={"50 - 77"} isActive={ Boolean(value?.includes(PublicsCiblesEnum.AGES_50_77)) } activeColor={"#f5b85b"}>
						<Image src={isMale ? male50_77 : female50_77}
						       alt={"50 - 77"}
						       width={1010}
						       height={1010}
						       quality={100}
						/>
					</AvatarCard>
				</div>

			</div>
		</div>
	)

}

export default AgeRangeSelectSignUp

