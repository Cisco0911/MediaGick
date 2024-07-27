'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState} from 'react'
import clsx from "clsx";

// const people = [
// 	{ id: 1, name: 'Wade Cooper' },
// 	{ id: 2, name: 'Arlene Mccoy' },
// 	{ id: 3, name: 'Devon Webb' },
// 	{ id: 4, name: 'Tom Cook' },
// 	{ id: 5, name: 'Tanya Fox' },
// 	{ id: 6, name: 'Hellen Schmidt' },
// 	{ id: 7, name: 'Caroline Schultz' },
// 	{ id: 8, name: 'Mason Heaney' },
// 	{ id: 9, name: 'Claudie Smitham' },
// 	{ id: 10, name: 'Emil Schaefer' },
// ]

export default function SelectInput({id, label, values, selected, setSelected}: {
	id: string
	label: string
	values: { id: string; label: string }[],
	selected?: any,
	setSelected: (value: any) => void
}) {

	const [open, setOpen] = useState(false)

	const selectedObj = values.find((obj) => obj.id === selected)

	return (
			<div tabIndex={0}
			     className={clsx(
				     "relative group mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600",
				     { 'selected': selected }
			     )}
			     onBlur={() => setOpen(false)}
			>
				<div
					id={id}
					onClick={() => setOpen(!open)}
					className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
					<span className="block truncate">{selectedObj ? selectedObj.label : "‎ "}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
			            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400"/>
					</span>
				</div>

				{(open &&
                    <ul
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
						{values.map((value: { id: string; label: string }) => (
							<li
								key={value.id}
								className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:bg-secondary hover:bg-opacity-20"
								onClick={e => {e.preventDefault(); setSelected(value.id); setOpen(false)}}
							>
								{selectedObj && (value.id == selectedObj.id) ?
									(
										<div>
											<span
												className="block truncate font-bold text-primary">{value.label}</span>

											<span
												className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-primary">
				                                <CheckIcon aria-hidden="true" className="h-5 w-5"/>
				                            </span>
										</div>
									) :
									<span
										className="block truncate font-normal">{value.label}</span>

								}
							</li>
						))}
                    </ul>
				)}

				<label
					htmlFor={id}
					className="absolute z-10 left-2.5 pointer-events-none bg-white px-1 rounded-lg transition-all
				text-base text-gray-400 top-2
				group-[.selected]:-top-3.5 group-[.selected]:text-gray-600 group-[.selected]:text-sm group-[.selected]:border-[1px] group-[.selected]:border-b-0 group-[.selected]:border-primary
				group-focus:-top-3.5 group-focus:text-gray-600 group-focus:text-sm group-focus:border-[1px] group-focus:border-b-0 group-focus:border-primary
				group-focus-within:-top-3.5 group-focus-within:text-gray-600 group-focus-within:text-sm group-focus-within:border-[1px] group-focus-within:border-b-0 group-focus-within:border-primary"
				>
					{label}
				</label>
			</div>
	)
}
