import {Chip} from "@nextui-org/chip";
import clsx from "clsx";
import {Button} from "@nextui-org/button";
import {useUrlQuery} from "@app/_lib/hooks/hooks";
import {useContext} from "react";

import {ProductsContext} from "@app/_lib/contexts";


type FilterChipProps = {
	label: string,
	// isSelected?: boolean,
	// onClick?: () => void
}

export default function FilterChip({ label }: FilterChipProps) {

	const query = useUrlQuery()
	const isSelected = query.searchParams.has("f", encodeURIComponent(label))


	const toggleFilter = () => {
		if (isSelected) {
			query.router.push(query.pathname + '?' + query.removeQuery("f", encodeURIComponent(label)))
		}
		else {
			query.router.push(query.pathname + '?' + query.setQuery("f", encodeURIComponent(label)))
		}
	}

	// const {selectedFilters, toggleFilter} = useContext(ProductsContext)
	//
	// const isSelected = selectedFilters.includes(label)
	// const onClick = () => {
	// 	toggleFilter(label)
	// }

	return(
		<Button
			className={clsx(
			"p-0 w-fit h-fit rounded-full bg-transparent flex-shrink-0",
			isSelected ? "text-tertiary" : "text-custom_white",
			)}
			onClick={toggleFilter}
		>

			<Chip
				classNames={{
					base: clsx(
						isSelected ? "bg-primary" : "bg-tertiary",
					),
					content: clsx(
						isSelected ? "text-tertiary" : "text-custom_white",
					),
				}}
			>
				{label}
			</Chip>

		</Button>
	)

}