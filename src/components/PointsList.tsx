import { LowerList } from "./LowerList"
import { List, Title, useMantineTheme } from "@mantine/core"
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

export const PointsList = ({ points, setMapRoute, setView }: Props) => {
	const { userLatitude, userLongitude } = useUserGeo()
	const { colors } = useMantineTheme()

	const handleClick = (point: IPoi) => {
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
	return (
		<LowerList title="Parks Near You!">
			{points.map((point) => {
				console.log(point)
				return (
					<List.Item
						key={point.position.lat + point.position.lon}
						onClick={() => handleClick(point)}
					>
						<Title style={{ color: colors.gray[1] }}>{point.poi.name}</Title>
						{point.address.freeformAddress}
					</List.Item>
				)
			})}
		</LowerList>
	)
}