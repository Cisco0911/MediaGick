'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useRouter} from "next/navigation";
import clsx from "clsx";


type Props = {
	children: React.ReactNode,
	className?: string,
	backdropClassName?: string
}


export default function Modal({ children, className, backdropClassName }: Props) {
	// const [open, setOpen] = useState(true)
	const router = useRouter()

	return (
		<Dialog open={true} onClose={() => { router.back() }} className="relative z-10">
			<DialogBackdrop
				className={clsx("fixed inset-0", backdropClassName)}

			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-2 sm:p-10 text-center">
					<DialogPanel
						className={clsx(
							"relative overflow-hidden rounded-lg",
							className
						)}
					>
						{children}
						{/*<div className="mt-5 sm:mt-6">*/}
						{/*	<button*/}
						{/*		type="button"*/}
						{/*		onClick={() => router.back()}*/}
						{/*		className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
						{/*	>*/}
						{/*		Go back to dashboard*/}
						{/*	</button>*/}
						{/*</div>*/}
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}
