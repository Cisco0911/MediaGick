// "use client"


type LayoutProps = {
	children: React.ReactNode,
}

export default function Layout({children}: LayoutProps) {

	// const pathname = usePathname()
	//
	// const [selectedFilters, setSelectedFilters] = useState<string[]>([])
	//
	// function toggleFilter(filter: string) {
	// 	if (selectedFilters.includes(filter)) {
	// 		setSelectedFilters(selectedFilters.filter(selectedFilter => selectedFilter !== filter))
	// 	} else {
	// 		setSelectedFilters([...selectedFilters, filter])
	// 	}
	// }

	// const cptSize = useComputeSimblingSize("1rem")

	return (
		<div className={"w-full h-full"}>
			{children}
		</div>
	// <ProductsContext.Provider value={{selectedFilters, toggleFilter}}>
	//
	// 		<div className={"w-full h-full"}>
	// 			{children}
	// 		</div>
	//
	// 	</ProductsContext.Provider>
	)
}

