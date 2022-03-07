import { AzureMapFeature, IAzureMapFeature } from "react-azure-maps"

export const renderPoint = (point: any): IAzureMapFeature => {
	const { longitude, latitude } = point

	console.log(point)

	return (
		<AzureMapFeature
			type="Point"
			coordinate={[latitude, longitude]}
			properties={{
				title: "Your Current Location"
			}}
		/>
	)
}
