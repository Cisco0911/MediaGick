"use client"

import {useDropzone} from "react-dropzone";
import clsx from "clsx";
import {CSSProperties, useMemo, useState} from "react";
import {PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR} from "@features/ui/theme";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
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
	flexShrink: 0,
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
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
		},
		// maxFiles: 4,
		// preventDropOnDocument: false,
		onDrop: (files) => {
			setAcceptedFiles([...acceptedFiles, ...files]);
			if (onChange) {
				onChange(files);
			}
		}
	});

	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

	const removeFile = (index: number) => {
		const newFiles = [...acceptedFiles];
		newFiles.splice(index, 1);
		setAcceptedFiles(newFiles);
	}

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
								"group relative rounded-3xl overflow-hidden",
								"w-[7rem] h-[7rem] bg-tertiary",
								"flex-shrink-0 flex justify-center items-center"
							)}
						>
							<div className={clsx(
								"absolute z-10 w-full h-full top-0 left-0 backdrop-blur-xl bg-secondary/50",
								"hidden group-hover:flex justify-center items-center",
							)}>

								<div className={"p-3 rounded-full "}
								     onClick={() => removeFile(index)}
								>
									<XMarkIcon className={"size-8 stroke-custom_white"}/>
								</div>

							</div>
							<Image src={URL.createObjectURL(file)}
							       alt={file.name}
							       fill
							       quality={100}
							       // className={"object-cover"}
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