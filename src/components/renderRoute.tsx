import { AzureMapFeature, IAzureMapFeature } from "react-azure-maps"

interface Params {
	points: any[]
}

export const renderRoute = ({ points }: Params): IAzureMapFeature => {
	const formattedPoints = points?.map((point: any) => [
		point.longitude,
		point.latitude
	])

	return <AzureMapFeature type="LineString" coordinates={formattedPoints} />
}
