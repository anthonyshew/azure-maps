import { AzureMapFeature, IAzureMapFeature } from "react-azure-maps"

export const renderPoint = (point: any): IAzureMapFeature => {
	const { longitude, latitude } = point

	return (
		<AzureMapFeature
			type="Point"
			coordinate={[longitude, latitude]}
			properties={{
				title: "Your Current Location"
			}}
		/>
	)
}
