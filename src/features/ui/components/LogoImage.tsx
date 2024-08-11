"use client"

import {useDropzone} from "react-dropzone";
import clsx from "clsx";
import {CSSProperties, useMemo} from "react";
import {PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR} from "@features/ui/theme";
import {PlusIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {DocumentArrowUpIcon} from "@heroicons/react/24/solid";


type LogoImageProps = {
	children?: React.ReactNode,
	onChange?: (data: any) => void,
}

const baseStyle: CSSProperties  = {
	width: "100%",
	height: "min-content",
	aspectRatio: 1.5,
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

export default function LogoImage({ children, onChange }: LogoImageProps) {

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
		maxFiles: 1,
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
			{/*{*/}
			{/*	acceptedFiles*/}
			{/*		.map((file, index) => (*/}
			{/*			<div*/}
			{/*				key={index}*/}
			{/*				className={clsx(*/}
			{/*					"relative rounded-3xl object-cover overflow-hidden",*/}
			{/*					"w-[7rem] h-[7rem] bg-tertiary",*/}
			{/*					"flex justify-center items-center"*/}
			{/*				)}*/}
			{/*			>*/}
			{/*				<Image src={URL.createObjectURL(file)}*/}
			{/*				       alt={file.name}*/}
			{/*				       fill*/}
			{/*				       quality={100}*/}
			{/*				/>*/}
			{/*			</div>*/}
			{/*		))*/}
			{/*}*/}
			<div {...getRootProps({style, className: "text-secondary hover:text-custom_white"})}>
				<input {...getInputProps()} />
				{
					acceptedFiles.length ?
						<>
							<div
								className={clsx(
									"relative rounded-3xl overflow-hidden",
									"w-full h-full bg-tertiary",
									"flex justify-center items-center"
								)}
							>
								<Image src={URL.createObjectURL(acceptedFiles[0])}
								       alt={acceptedFiles[0].name}
								       fill
								       quality={100}
								       className={"object-cover"}
								/>
							</div>
						</> :
						<>
							<DocumentArrowUpIcon className={"size-8 fill-primary"}/>
							<span>Logo</span>
						</>
				}
			</div>
		</div>
	);
}