import { useState } from "react"

export const useMapRoute = () => {
	const [mapRoute, setMapRoute] = useState<{
		guidance: any
		legs: any[]
		sections: any[]
		summary: any
	}>({ guidance: {}, legs: [], sections: [], summary: {} })

	return { mapRoute, setMapRoute }
}
