import {
	AzureMap,
	AzureMapDataSourceProvider,
	AzureMapLayerProvider,
	AzureMapsProvider
} from "react-azure-maps"
import { AuthenticationType } from "azure-maps-control"
import { renderPoint } from "../renderPoint"
import { useSearchParks } from "../../hooks/useSearchParks"
import { useViewportSize } from "@mantine/hooks"
import { LowerList } from "../LowerList"
import { Dispatch, SetStateAction } from "react"
import { PointsList } from "../PointsList"

interface Props {
	userLatitude: number
	userLongitude: number
	view: "pins" | "route"
	setView: Dispatch<SetStateAction<"pins" | "route">>
	setMapRoute: Dispatch<SetStateAction<any>>
}

export const SearchResults = ({
	userLatitude,
	userLongitude,
	view,
	setView,
	setMapRoute
}: Props) => {
	const { height } = useViewportSize()
	const points = useSearchParks({
		latitude: userLatitude || 0,
		longitude: userLongitude || 0
	})

	if (view === "pins" && !!userLatitude && !!userLongitude) {
		return (
			<div>
				<div style={{ height: height / 2 }}>
					<AzureMapsProvider key="Search Results">
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
				</div>
				<PointsList
					view={view}
					points={points}
					setView={setView}
					setMapRoute={setMapRoute}
				/>
			</div>
		)
	}

	return null
}
