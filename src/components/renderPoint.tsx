import { AzureMapFeature, IAzureMapFeature } from "react-azure-maps"

interface Params {
	longitude: number
	latitude: number
	title: string
}

export const renderPoint = (point: Params): IAzureMapFeature => {
	const { longitude, latitude, title } = point

	return (
		<AzureMapFeature
			key={latitude + longitude}
			type="Point"
			coordinate={[longitude, latitude]}
			properties={{
				title
			}}
		/>
	)
}
