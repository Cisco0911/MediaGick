


import AvatarCard from "@features/user/auth/SignUp/components/AvatarCard";
import Image from "next/image";
import imagePreference from "@app/_assets/image/image-preference.png";
import videoPreference from "@app/_assets/image/video-preference.png";
import {TypeContenuPrefereEnum} from "@app/_lib/enums";


type props = {
	value: TypeContenuPrefereEnum | null | undefined,
	onSelect: (value: TypeContenuPrefereEnum) => void,
}


const ContentSelectSignUp = ({ value, onSelect }: props) => {

	return(
		<div className={"bg-transparent"}>
			<div className="relative m-0.5 flex justify-center items-center space-x-10">

				<div onClick={() => onSelect(TypeContenuPrefereEnum.IMAGE)}>
					<AvatarCard label={"Image"} isActive={value === TypeContenuPrefereEnum.IMAGE} activeColor={"#f5b85b"} rotate={12}>
						<Image src={imagePreference}
						       alt={"ImagePreference"}
						       width={512}
						       height={512}
						       quality={100}
						/>
					</AvatarCard>
				</div>

				<div onClick={() => onSelect(TypeContenuPrefereEnum.VIDEO)}>
					<AvatarCard label={"Vidéo"} isActive={value === TypeContenuPrefereEnum.VIDEO} activeColor={"#f5b85b"} rotate={-12}>
						<Image src={videoPreference}
						       alt={"VideoPreference"}
						       width={512}
						       height={512}
						       quality={100}
						/>
					</AvatarCard>
				</div>

			</div>
		</div>
	)

}

export default ContentSelectSignUp