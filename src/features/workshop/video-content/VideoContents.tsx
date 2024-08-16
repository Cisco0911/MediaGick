"use client"

import React, {useState} from "react";
import SearchContent from "@features/workshop/components/SearchContent";
import {FilmIcon, PencilIcon, PhotoIcon} from "@heroicons/react/24/solid";
import Button, {ButtonState} from "@features/ui/components/Button";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {deleteImageContentById} from "@app/(app-navigation)/workshop/image-content/actions";
import {CircularProgress} from "@nextui-org/progress";
import VideoContentCard from "@features/workshop/video-content/components/VideoContentCard";
import {VideoContent} from "@app/(app-navigation)/workshop/video-content/interfaces";
import {Button as NextUIButton } from "@nextui-org/button";



type VideoContentsProps = {
	videoContents: VideoContent[]
}


export default function VideoContents({videoContents}: VideoContentsProps) {

	const [selected, setSelected] = useState<number>(-1)

	const router = useRouter()

	const [deleteState, setDeleteState] = useState<ButtonState>("active")

	async function deleteImageContent() {
		if (selected === -1) {
			return
		}

		setDeleteState("busy")

		const res = await deleteImageContentById(selected)

		if (!res.ok) {
			toast.error(res.error)
			console.log(res.error)
		}
		setSelected(-1)
		router.refresh()
	}

	return (
		<div className={"w-full h-full flex flex-col space-y-5"}>

			<div className={"w-full flex-shrink-0 flex flex-col space-y-5"}>
				<div className={"w-full flex justify-center"}>
					<SearchContent items={videoContents} />
				</div>
				<div className={"flex flex-col space-y-2"}>

					<div className={"flex items-center space-x-2"}>
						<span className={"text-3xl font-semibold"}>Video</span>
						<FilmIcon className={"size-8 fill-primary"} />
					</div>
					<div className={"w-full flex justify-between"}>
						<div className={"flex space-x-2"}>
							<Link href={`/workshop/image-content/${selected}`}
							      className={"w-fit h-fit"}
							      aria-disabled={selected === -1}
							      style={{
								      pointerEvents: selected === -1 ? "none" : "auto"
							      }}
							>
								<Button variant={"secondary"}
								        className={"w-fit px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
								>
									<PencilIcon className={"size-8 fill-tertiary"}/>
								</Button>
							</Link>
							<Button variant={"secondary"}
							        className={"w-fit px-2 py-2 rounded-xl bg-custom_white text-lg font-semibold"}
							        style={{
								        pointerEvents: selected === -1 ? "none" : "auto"
							        }}
							        state={deleteState}
							        busyIcon={
								        <CircularProgress classNames={{
									        svg: "h-[1.75rem]",
									        indicator: "stroke-tertiary"
								        }}/>
							        }
							        onClick={deleteImageContent}
							>
								<XMarkIcon className={"size-8 fill-tertiary"}/>
							</Button>
						</div>
						<Link href={"/workshop/video-content/new"}>
							<NextUIButton isIconOnly
							        radius={"full"}
							        size={"sm"}
							        className={"text-primary ring-1 ring-primary bg-transparent"}
							>
								<PlusIcon className={"size-8 stroke-primary"}/>
							</NextUIButton>
						</Link>
					</div>

				</div>
			</div>

			<div className={"w-full flex-grow overflow-auto"}>
				<div className="grid-container">
					{
						videoContents?.map((videoContent: VideoContent) => (
							<VideoContentCard key={videoContent.id}
							                  content={videoContent}
							                  isSelected={selected === videoContent.id}
							                  onClick={() => setSelected(selected === videoContent.id ? -1 : videoContent.id)}
							/>
						))
					}
				</div>
			</div>

		</div>
	)
}