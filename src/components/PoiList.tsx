import { List } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"
import { useUserGeo } from "../hooks/useUserGeo"
import { IPoi } from "../types"
import { getRoute } from "../utils/getRoute"

interface Props {
	points: Array<IPoi>
	setView: Dispatch<SetStateAction<"route" | "pins">>
	setMapRoute: Dispatch<
		SetStateAction<{
			guidance: any
			legs: any[]
			sections: any[]
			summary: any
		}>
	>
}

export const PoiList = ({ points, setView, setMapRoute }: Props) => {
	const { userLatitude, userLongitude } = useUserGeo()

	return (
		<List>
			{points.map((point) => {
				return (
					<List.Item
						key={point.position.lat + point.position.lon}
						onClick={() =>
							getRoute({
								origin: {
									lat: userLatitude || 0,
									lon: userLongitude || 0
								},
								destination: {
									lat: point.position.lat,
									lon: point.position.lon
								}
							}).then((res) => {
								setMapRoute(res.routes[0])
								setView("route")
							})
						}
					>
						{point.poi.name}
					</List.Item>
				)
			})}
		</List>
	)
}
