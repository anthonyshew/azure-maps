import { List } from "@mantine/core"
import { LowerList } from "./LowerList"

interface Props {
	directions: any
}

export const DirectionsList = ({ directions }: Props) => {
	return (
		<LowerList title="Directions">
			{Object.keys(directions).length > 0 &&
				directions.instructions.map((step: any) => {
					return <List.Item>{step.message}</List.Item>
				})}
		</LowerList>
	)
}
