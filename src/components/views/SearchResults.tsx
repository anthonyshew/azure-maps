import {
	AzureMap,
	AzureMapDataSourceProvider,
	AzureMapLayerProvider,
	AzureMapsProvider
} from "react-azure-maps"
import { AuthenticationType } from "azure-maps-control"
import { useUserGeo } from "../../hooks/useUserGeo"
import { renderPoint } from "../renderPoint"
import { useSearchParks } from "../../hooks/useSearchParks"

export const SearchResults = () => {
	const { userLatitude, userLongitude } = useUserGeo()
	const points = useSearchParks({
		latitude: userLatitude || 0,
		longitude: userLongitude || 0
	})

	return (
		<AzureMapsProvider>
			<AzureMap
				options={{
					authOptions: {
						authType: AuthenticationType.subscriptionKey,
						subscriptionKey: process.env.REACT_APP_MAPS_API_KEY
					},
					center: [userLongitude, userLatitude],
					zoom: 12
				}}
			>
				<AzureMapDataSourceProvider
					id="AzureMapYourLocationLayerProvider"
					options={{
						cluster: true,
						clusterRadius: 2
					}}
				>
					<AzureMapLayerProvider
						type="SymbolLayer"
						options={{
							textOptions: {
								textField: ["get", "title"],
								offset: [0, 1.5]
							}
						}}
					/>
					{renderPoint({
						latitude: userLatitude || 0,
						longitude: userLongitude || 0,
						title: "Your Location"
					})}
					{points.length > 0 ? (
						points.map((point: any) => {
							return renderPoint({
								latitude: point.position.lat,
								longitude: point.position.lon,
								title: point.poi.name
							})
						})
					) : (
						<></>
					)}
				</AzureMapDataSourceProvider>
			</AzureMap>
		</AzureMapsProvider>
	)
}
