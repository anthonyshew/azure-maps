import "./App.css"
import { useState } from "react"
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
import { useEffect } from "react"
import { search } from "./utils/search"
import { IPoi } from "./types"

const App = () => {
	const { height, width } = useViewportSize()
	const { userLatitude, userLongitude } = useUserGeo()
	const [points, setPoints] = useState<IPoi[]>([])

	useEffect(() => {
		if (userLatitude && userLongitude) {
			search({ latitude: userLatitude, longitude: userLongitude }).then(
				(res) => {
					if (res) return setPoints(res.results)
				}
			)
		}
	}, [userLongitude, userLatitude])

	console.log(points)

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
		</MantineProvider>
	)
}

export default App
