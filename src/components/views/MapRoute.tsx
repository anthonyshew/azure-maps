import {
	AzureMap,
	AzureMapDataSourceProvider,
	AzureMapLayerProvider,
	AzureMapsProvider
} from "react-azure-maps"
import { AuthenticationType } from "azure-maps-control"
import { renderPoint } from "../renderPoint"
import { renderRoute } from "../renderRoute"
import { DirectionsList } from "../DirectionsList"
import { useViewportSize } from "@mantine/hooks"

interface Props {
	mapRoute: any
	userLatitude: number
	userLongitude: number
}

export const MapRoute = ({ mapRoute, userLatitude, userLongitude }: Props) => {
	const { height } = useViewportSize()

	if (mapRoute.legs[0]?.points.length > 0) {
		return (
			<div>
				<div style={{ height: height / 2 }}>
					<AzureMapsProvider key="Routes Map">
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
								id="AzureMapRouteLayerProvider"
								options={{
									strokeWidth: 5
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
									title: "Start"
								})}

								{renderPoint({
									latitude:
										mapRoute.legs[0]?.points[
											mapRoute.legs[0]?.points.length - 1
										].latitude,
									longitude:
										mapRoute.legs[0]?.points[
											mapRoute.legs[0]?.points.length - 1
										].longitude,
									title: "End"
								})}
								<AzureMapLayerProvider type="LineLayer" />
								{renderRoute({ points: mapRoute.legs[0]?.points })}
							</AzureMapDataSourceProvider>
						</AzureMap>
					</AzureMapsProvider>
				</div>
				<DirectionsList directions={mapRoute.guidance} />
			</div>
		)
	}
	return null
}
