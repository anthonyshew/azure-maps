import { List } from "@mantine/core"
import { useUserGeo } from "../hooks/useUserGeo"
import { IPoi } from "../types"
import { getRoute } from "../utils/getRoute"

interface Props {
	points: Array<IPoi>
}

const PoiList = ({ points }: Props) => {
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
							}).then((res) => console.log(res))
						}
					>
						{point.poi.name}
					</List.Item>
				)
			})}
		</List>
	)
}

export default PoiList
