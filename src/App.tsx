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
import { useEffect } from "react"
import { search } from "./utils/search"

const App = () => {
	const { height, width } = useViewportSize()
	const { userLatitude, userLongitude } = useUserGeo()

	useEffect(() => {
		if (userLatitude && userLongitude) {
			search({ latitude: userLatitude, longitude: userLongitude }).then((res) =>
				console.log(res)
			)
		}
	}, [userLongitude, userLatitude])

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
											offset: [0, 1]
										}
									}}
								/>
								{renderPoint({
									latitude: userLatitude,
									longitude: userLongitude
								})}
							</AzureMapDataSourceProvider>
						</AzureMap>
					</AzureMapsProvider>
				)}
			</div>
		</MantineProvider>
	)
}

export default App
