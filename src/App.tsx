import "./App.css"
import {
	AzureMap,
	AzureMapDataSourceProvider,
	AzureMapLayerProvider,
	AzureMapsProvider
} from "react-azure-maps"
import { MantineProvider } from "@mantine/core"
import { AuthenticationType } from "azure-maps-control"
import { useViewportSize } from "@mantine/hooks"
import { useUserGeo } from "./hooks/useUserGeo"
import { renderPoint } from "./components/renderPoint"
import { useSearchParks } from "./hooks/useSearchParks"
import PoiList from "./components/PoiList"
import { useView } from "./hooks/useView"
import { useMapRoute } from "./hooks/useMapRoute"
import { renderRoute } from "./components/renderRoute"
import { RouteDirections } from "./components/RouteDirections"

const App = () => {
	const { view, setView } = useView()
	const { height, width } = useViewportSize()
	const { mapRoute, setMapRoute } = useMapRoute()
	const { userLatitude, userLongitude } = useUserGeo()
	const points = useSearchParks({
		latitude: userLatitude || 0,
		longitude: userLongitude || 0
	})

	return (
		<MantineProvider withNormalizeCSS>
			<div style={{ height: height / 2, width }}>
				{view === "pins" && !!userLatitude && !!userLongitude && (
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
									latitude: userLatitude,
									longitude: userLongitude,
									title: "Your Location"
								})}
								{points.length > 0 ? (
									points.map((point) => {
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
				)}
				{view === "route" && mapRoute.legs[0].points.length > 0 && (
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
										mapRoute.legs[0]?.points[mapRoute.legs[0].points.length - 1]
											.latitude,
									longitude:
										mapRoute.legs[0]?.points[mapRoute.legs[0].points.length - 1]
											.longitude,
									title: "End"
								})}
								<AzureMapLayerProvider type="LineLayer" />
								{renderRoute({ points: mapRoute.legs[0].points })}
							</AzureMapDataSourceProvider>
						</AzureMap>
					</AzureMapsProvider>
				)}
			</div>
			<PoiList points={points} setView={setView} setMapRoute={setMapRoute} />
			<RouteDirections directions={mapRoute.guidance} />
		</MantineProvider>
	)
}

export default App
