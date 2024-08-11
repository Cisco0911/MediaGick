import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useRef} from "react";


export function useUrlQuery()
{
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const addQuery = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.append(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const setQuery = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const removeQuery = useCallback(
		(name: string, value?: string) => {
			const params = new URLSearchParams(searchParams.toString());
			value ? params.delete(name, value) : params.delete(name);

			return params.toString();
		},
		[searchParams]
	);

	return {
		router,
		pathname,
		searchParams,
		addQuery,
		setQuery,
		removeQuery
	}
}


export function useComputeSimblingSize(gap: string){

	const staticRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (staticRef.current && targetRef.current) {
			const child1Height = staticRef.current.offsetHeight;
			const spacing = 4; // Assuming space-y-4 translates to 4px spacing
			targetRef.current.style.maxHeight = `calc(100% - ${child1Height}px - ${gap})`;
		}

		console.log("Lalalalalalalal")
	}, []);

	return {
		staticRef,
		targetRef
	}
}