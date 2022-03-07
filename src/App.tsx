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
import { renderPoint } from "./components/renderPoints"
import { useSearchParks } from "./hooks/useSearchParks"
import PoiList from "./components/PoiList"

const App = () => {
	const { height, width } = useViewportSize()
	const { userLatitude, userLongitude } = useUserGeo()
	const points = useSearchParks({
		latitude: userLatitude || 0,
		longitude: userLongitude || 0
	})

	return (
		<MantineProvider withNormalizeCSS>
			<div style={{ height: height / 2, width }}>
				{!!userLatitude && !!userLongitude && (
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
			</div>
			<PoiList points={points} />
		</MantineProvider>
	)
}

export default App
