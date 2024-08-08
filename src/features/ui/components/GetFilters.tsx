import Filters from "@features/ui/components/Filters";
import {getFilters} from "@app/_lib/actions/fetchData";






type GetFiltersProps = {
	url: string
}

export default async function GetFilters({ url }: GetFiltersProps) {

	const filters = await getFilters(url)

	return(
		<Filters filters={filters} />
	)

}