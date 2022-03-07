import { useEffect, useState } from "react"
import { IPoi } from "../types"
import { search } from "../utils/search"

interface Params {
	latitude: number
	longitude: number
}

export const useSearchParks = ({ latitude, longitude }: Params) => {
	const [results, setResults] = useState<IPoi[]>([])

	useEffect(() => {
		if (latitude && longitude) {
			search({ latitude, longitude }).then((res) => {
				if (res) return setResults(res.results)
			})
		}
	}, [longitude, latitude])

	return results
}
