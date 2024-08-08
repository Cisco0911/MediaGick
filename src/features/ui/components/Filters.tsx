"use client"

import {Chip} from "@nextui-org/chip";
import FilterChip from "@features/ui/components/FilterChip";
import clsx from "clsx";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useUrlQuery} from "@app/_lib/hooks/hooks";
import {useContext} from "react";

import {ProductsContext} from "@app/_lib/contexts";


type FiltersProps = {
	filters: string[],
	// selectedFilters: string[],
	// toggleFilter: (filter: string) => void
}



export default function Filters({ filters }: FiltersProps) {

	const query = useUrlQuery()

	// getFilters(url)
	// 	.then(res => setFilters(res))

	let selectedFilters = query.searchParams.has("f") ? query.searchParams.getAll("f") : []
	selectedFilters = selectedFilters.map(filter => decodeURIComponent(filter))

	// console.log(selectedFilters)

	// const [selectedFilters, setSelectedFilters] = useState<string[]>([])

	// function toggleFilter(filter: string) {
	// 	if (selectedFilters.includes(filter)) {
	// 		setSelectedFilters(selectedFilters.filter(selectedFilter => selectedFilter !== filter))
	// 	} else {
	// 		setSelectedFilters([...selectedFilters, filter])
	// 	}
	// }

	// const {selectedFilters}: {selectedFilters: string[]} = useContext(ProductsContext)

	return (
		<div className={"w-full flex flex-col space-y-1 overflow-auto"}>
			<div className={clsx(
				"w-fit flex space-x-3",
				{"bg-primary/60 p-0.5 rounded-full": selectedFilters.length > 1}
			)}>

				{ selectedFilters.length > 0 ?
					selectedFilters.map((filter, index) => (
						filters.includes(filter) &&
						<Chip
							key={index}
							classNames={{
								base: "bg-primary",
								content: "text-tertiary",
							}}
							// onClose={() => toggleFilter(filter)}
						>
							{filter}
						</Chip>
					)) :
					<Chip
						classNames={{
							base: "bg-primary",
							content: "text-tertiary",
						}}
					>
						Tout
					</Chip>
				}

			</div>

			<div className={"w-full"}>

				{filters.length > 0 ?
					<div className={"w-full flex mb-1 space-x-3"}>

						{filters.map((filter, index) => (
							<FilterChip key={index}
							            label={filter}
							            // isSelected={ selectedFilters.includes(filter) }
							            // onClick={() => toggleFilter(filter)}
							/>
						))}

					</div> :
					<div>
						<Chip
							classNames={{
								base: "bg-tertiary",
								content: "text-custom_white",
							}}
						>
							Loading...
						</Chip>
					</div>
				}

			</div>
		</div>
	)
}