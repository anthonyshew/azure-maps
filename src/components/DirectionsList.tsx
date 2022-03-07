import { List, Text } from "@mantine/core"
import { Dispatch, SetStateAction } from "react"
import { LowerList } from "./LowerList"

interface Props {
	directions: any
	view: "route" | "pins"
	setView: Dispatch<SetStateAction<"route" | "pins">>
}

export const DirectionsList = ({ directions, view, setView }: Props) => {
	return (
		<LowerList title="Directions" icon="" setView={setView} view={view}>
			{Object.keys(directions).length > 0 &&
				directions.instructions.map((step: any) => {
					return (
						<List.Item>
							<Text>{step.message}</Text>
							<Text>in {step.routeOffsetInMeters} meters</Text>
						</List.Item>
					)
				})}
		</LowerList>
	)
}
