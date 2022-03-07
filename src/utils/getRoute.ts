interface Params {
	origin: {
		lat: number
		lon: number
	}
	destination: {
		lat: number
		lon: number
	}
}

export const getRoute = async ({ origin, destination }: Params) => {
	const originPos = `${origin.lat},${origin.lon}`
	const destinationPos = `${destination.lat},${destination.lon}`

	const requestUrl = new URL(
		"https://atlas.microsoft.com/route/directions/json"
	)

	requestUrl.searchParams.append(
		"subscription-key",
		process.env.REACT_APP_MAPS_API_KEY as string
	)
	requestUrl.searchParams.append("api-version", "1.0")
	requestUrl.searchParams.append("traffic", "true")
	requestUrl.searchParams.append("routeType", "fastest")
	requestUrl.searchParams.append("instructionsType", "text")
	requestUrl.searchParams.append("query", `${originPos}:${destinationPos}`)

	const response = await fetch(requestUrl.toString()).then((res) => res.json())
	return response
}
