interface Params {
	longitude: number
	latitude: number
}

export const search = async ({ longitude, latitude }: Params) => {
	console.log({ longitude })
	console.log({ latitude })

	if (longitude || latitude) {
		const requestUrl = new URL("https://atlas.microsoft.com/search/fuzzy/json")

		requestUrl.searchParams.append("api-version", "1.0")
		requestUrl.searchParams.append(
			"subscription-key",
			process.env.REACT_APP_MAPS_API_KEY as string
		)
		// requestUrl.searchParams.append("format", "json")
		requestUrl.searchParams.append("lat", String(latitude))
		requestUrl.searchParams.append("lon", String(longitude))
		requestUrl.searchParams.append("radius", String(100000))
		requestUrl.searchParams.append("limit", String(10))
		requestUrl.searchParams.append("query", "park")
		console.log(requestUrl.toString())

		const response = fetch(requestUrl.toString()).then((res) => res.json())
		return response
	}
	return null
}

// radius around your location
// just public parks
// within 15 minutes driving distance?
