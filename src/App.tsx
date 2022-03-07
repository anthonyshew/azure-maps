import "./App.css"

import { MantineProvider } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { useUserGeo } from "./hooks/useUserGeo"
import { useSearchParks } from "./hooks/useSearchParks"
import PoiList from "./components/PoiList"
import { useView } from "./hooks/useView"
import { useMapRoute } from "./hooks/useMapRoute"
import { RouteDirections } from "./components/RouteDirections"
import Logo from "./components/Logo"
import { MapRoute } from "./components/views/MapRoute"
import { SearchResults } from "./components/views/SearchResults"

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
			<Logo />
			<div style={{ height: height / 2, width }}>
				{view === "pins" && !!userLatitude && !!userLongitude && (
					<SearchResults />
				)}
				{view === "route" && mapRoute.legs[0].points.length > 0 && <MapRoute />}
			</div>
			<PoiList points={points} setView={setView} setMapRoute={setMapRoute} />
			<RouteDirections directions={mapRoute.guidance} />
		</MantineProvider>
	)
}

export default App
