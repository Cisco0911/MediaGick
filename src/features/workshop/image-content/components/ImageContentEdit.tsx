"use client"

import {ImageContent} from "@app/(app-navigation)/workshop/image-content/interfaces";
import clsx from "clsx";
import {ArrowLongLeftIcon, ArrowUturnLeftIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, {useState} from "react";
import {PhotoIcon, RocketLaunchIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import NextUiInputCustm from "@features/ui/components/NextUiInputCustm";
import Button, {ButtonState} from "@features/ui/components/Button";
import {CircularProgress} from "@nextui-org/progress";
import {isEmpty} from "@nextui-org/shared-utils";
import toast from "react-hot-toast";
import {resetImageContent, updateImageContent} from "@app/(app-navigation)/workshop/image-content/actions";






interface ImageContentEditProps {
	imageContent: ImageContent
}

export default function ImageContentEdit({imageContent}: ImageContentEditProps) {

	const [image, setImage] = useState<ImageContent>(imageContent)
	const [prompt, setPrompt] = React.useState<string>("")

	const [excecPending, setExcecPending] = useState(false)
	const [resetPending, setResetPending] = useState(false)

	const submitState: ButtonState = excecPending ? "busy" : "active";
	const BusyIcon = <CircularProgress classNames={{
		svg: "h-[1.75rem]",
		indicator: "stroke-tertiary"
	}} />

	async function execute() {
		if (isEmpty(prompt)) {
			toast.error("Veuillez entrer un prompt")
			return
		}

		setExcecPending(true)
		const res = await updateImageContent(prompt, image.id)

		if (!res.ok) {
			toast.error(res.error)
			console.log(res.error)
		}
		else setImage(res.data)

		setExcecPending(false)
	}
	async function reset() {

		setResetPending(true)
		const res = await resetImageContent(image.id)

		if (!res.ok) {
			toast.error(res.error)
			console.log(JSON.stringify(res.error))
		}
		else setImage(res.data)

		setResetPending(false)
	}

	return (
		<div className={clsx(
			"w-full h-full p-10 rounded-3xl",
			"flex flex-col space-y-10"
		)}>

			<Link href={"/workshop/image-content"} className={"flex justify-start items-center space-x-2.5"}>
				<ArrowLongLeftIcon className={"size-6 fill-custom_white"}/>
				<span className={"text-xl"}>
						Edition d&apos;image
					</span>
			</Link>

			<div className={"w-full flex flex-col items-center space-y-5"}>
				<div className={"flex justify-center items-center space-x-2"}>
					<span className={"font-semibold text-2xl"}>
						Bien à louer
					</span>
					<PhotoIcon className={"size-7 fill-primary"}/>
				</div>
				<div className={"w-3/5"}>
					<div
						className={"relative w-full rounded-2xl overflow-hidden"}
						style={{
							aspectRatio: image.largeur / image.hauteur
						}}
					>
						<Image src={image.chemin || ""}
						       alt={"Logo"}
						       fill
						       quality={100}
						       className={"object-cover"}
						/>
					</div>
				</div>
				{
					image.chemin !== imageContent.chemin &&
                    <div className={"w-full flex justify-center"}>
                        <Button className={"w-3/5 px-2 py-2 rounded-xl bg-secondary"}
                                state={resetPending ? "busy" : "active"}
                                onClick={reset}
                                busyIcon={BusyIcon}
                        >
                            <div className={"flex space-x-2 text-custom_white/50"}>
                                <ArrowUturnLeftIcon className={"size-6 stroke-custom_white/50"}/>
                                <span>
									Retour à l&apos;état initial
								</span>
                            </div>
                        </Button>
                    </div>
				}
			</div>

			<div>
				<NextUiInputCustm type={"text"}
				                  label={""}
				                  placeholder={"Que désirez vous..."}
				                  endContent={
					                  <Button className={"w-fit px-2 py-2 bg-transparent"}
					                          state={submitState}
					                          onClick={execute}
					                          busyIcon={BusyIcon}
					                  >
					                  <RocketLaunchIcon className={"size-6 fill-custom_white"} />
					                  </Button>
				                  }
				                  value={prompt}
				                  onChange={(e) => setPrompt(e.target.value)}
				/>
			</div>

		</div>
)
}