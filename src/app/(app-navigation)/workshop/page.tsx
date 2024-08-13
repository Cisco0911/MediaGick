import {TypeContenuPrefereEnum} from "@app/_lib/enums";
import AvatarCard from "@features/user/auth/SignUp/components/AvatarCard";
import Image from "next/image";
import imagePreference from "@app/_assets/image/image-preference.png";
import videoPreference from "@app/_assets/image/video-preference.png";
import Link from "next/link";


export default function WorkshopPage() {
	return (
		<div className={"w-full h-full flex flex-col space-y-20 justify-center items-center"}>

			<span className={"text-4xl font-black"}>
				Quel contenu souhaitez vous gérez ?
			</span>

			<div className={"bg-transparent"}>
				<div className="relative m-0.5 flex justify-center items-center space-x-10">

					<Link href="/workshop/image-content">
						<AvatarCard label={"Image"}
						            isActive={false}
						            activeColor={"#ffffff"}
						            activeOnHover={true}
						            rotate={12}
						            className={"text-black"}
						>
							<Image src={imagePreference}
							       alt={"ImagePreference"}
							       width={512}
							       height={512}
							       quality={100}
							/>
						</AvatarCard>
					</Link>

					<Link href="/workshop/video-content">
						<AvatarCard
							label={"Vidéo"}
							isActive={false}
							activeColor={"#ffffff"}
							activeOnHover={true}
							rotate={-12}
							className={"text-black"}
						>
							<Image src={videoPreference}
							       alt={"VideoPreference"}
							       width={512}
							       height={512}
							       quality={100}
							/>
						</AvatarCard>
					</Link>

				</div>
			</div>

		</div>
	)
}