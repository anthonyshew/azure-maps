import { useEffect, useState } from "react"

/** Use the user's current location in our application! */
export const useUserGeo = () => {
	const [position, setPosition] = useState<{
		userLatitude: number | undefined
		userLongitude: number | undefined
	}>({
		userLatitude: undefined,
		userLongitude: undefined
	})

	const [error, setError] = useState("")

	useEffect(() => {
		const geo = navigator.geolocation
		if (!geo) {
			return setError("We couldn't get your location!")
		}

		const onChange = ({ coords }: { coords: GeolocationCoordinates }) => {
			if (process.env.REACT_APP_IS_DEV) {
				return setPosition({
					userLongitude: -112.0269,
					userLatitude: 33.5234
				})
			}

			return setPosition({
				userLatitude: coords.latitude,
				userLongitude: coords.longitude
			})
		}

		const onError = (error: any) => {
			return setError(error)
		}

		let watcher = geo.watchPosition(onChange, onError)
		return () => geo.clearWatch(watcher)
	}, [setPosition, setError])

	return { ...position, error }
}
