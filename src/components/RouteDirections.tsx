import { Title, List } from "@mantine/core"

interface Params {
	directions: any
}

export const RouteDirections = ({ directions }: Params) => {
	return (
		<div>
			<Title>Directions</Title>
			<List>
				{Object.keys(directions).length > 0 &&
					directions.instructions.map((step: any) => {
						return <List.Item>{step.message}</List.Item>
					})}
			</List>
		</div>
	)
}
