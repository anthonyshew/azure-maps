import "./App.css"

import { useState } from "react"
import { MantineProvider } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { useUserGeo } from "./hooks/useUserGeo"
import Logo from "./components/Logo"
import { MapRoute } from "./components/views/MapRoute"
import { SearchResults } from "./components/views/SearchResults"

const App = () => {
	const [view, setView] = useState<"pins" | "route">("pins")
	const { height, width } = useViewportSize()

	const [mapRoute, setMapRoute] = useState<{
		guidance: any
		legs: any[]
		sections: any[]
		summary: any
	}>({
		guidance: {},
		legs: [],
		sections: [],
		summary: {}
	})
	const { userLatitude, userLongitude } = useUserGeo()

	return (
		<MantineProvider withNormalizeCSS>
			<Logo />
			<div style={{ height: height / 2, width }}>
				{view === "pins" && !!userLatitude && !!userLongitude && (
					<SearchResults
						view={view}
						setView={setView}
						setMapRoute={setMapRoute}
						userLatitude={userLatitude}
						userLongitude={userLongitude}
					/>
				)}
				{view === "route" && mapRoute.legs[0]?.points.length > 0 && (
					<MapRoute
						mapRoute={mapRoute}
						userLatitude={userLatitude || 0}
						userLongitude={userLongitude || 0}
					/>
				)}
			</div>
		</MantineProvider>
	)
}

export default App
