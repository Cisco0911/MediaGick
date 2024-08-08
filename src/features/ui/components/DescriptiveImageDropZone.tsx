"use client"

import {useDropzone} from "react-dropzone";
import clsx from "clsx";
import {CSSProperties, useMemo} from "react";
import {PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR} from "@features/ui/theme";
import {PlusIcon} from "@heroicons/react/24/outline";
import Image from "next/image";


type DropZoneProps = {
	children?: React.ReactNode,
	onChange?: (data: any) => void,
}

const baseStyle: CSSProperties  = {
	width: "7rem",
	height: "7rem",
	background: TERTIARY_COLOR,
	border: "2px dashed",
	borderColor: SECONDARY_COLOR,
	borderRadius: "1.5rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	cursor: "pointer",
	// color: SECONDARY_COLOR,
};

const focusedStyle: CSSProperties = {
	borderColor: '#2196f3'
};

const acceptStyle: CSSProperties = {
	borderColor: PRIMARY_COLOR
};

const rejectStyle: CSSProperties = {
	// borderColor: '#ff1744'
};

export default function DescriptiveImageDropZone({ children, onChange }: DropZoneProps) {

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
		},
		maxFiles: 4,
		// preventDropOnDocument: false,
		onDrop: onChange
	});

	const style = useMemo(() => ({
		...baseStyle,
		...(isDragAccept ? acceptStyle : {}),
		// ...(isDragReject ? rejectStyle : {})
	}), [
		isDragAccept,
		// isDragReject
	]);

	return (
		<div className={"w-full flex space-x-2 overflow-x-auto"}>
			{
				acceptedFiles
					.map((file, index) => (
						<div
							key={index}
							className={clsx(
								"relative rounded-3xl object-cover overflow-hidden",
								"w-[7rem] h-[7rem] bg-tertiary",
								"flex justify-center items-center"
							)}
						>
							<Image src={URL.createObjectURL(file)}
							       alt={file.name}
							       fill
							       quality={100}
							/>
						</div>
					))
			}
			<div {...getRootProps({style, className: "text-secondary hover:text-custom_white"})}>
				<input {...getInputProps()} />
				<PlusIcon className={"size-8"}/>
				<span>Ajouter</span>
			</div>
		</div>
	);
}