import {
	Container,
	List,
	ScrollArea,
	Title,
	useMantineTheme
} from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { ReactNode } from "react"

interface Props {
	children: ReactNode
	title: string
}

export const LowerList = ({ children, title }: Props) => {
	const { colors, fontSizes, radius, spacing } = useMantineTheme()
	const { height } = useViewportSize()

	return (
		<Container
			fluid
			style={{
				height: height / 2,
				display: "flex",
				flexDirection: "column",
				background: colors.green[9]
			}}
		>
			<Title
				order={2}
				style={{ color: colors.gray[1], fontSize: fontSizes.xl * 2 }}
			>
				{title}
			</Title>
			<ScrollArea
				styles={{ root: { paddingRight: "1rem", paddingBottom: spacing.lg } }}
			>
				<List
					icon="🌳"
					type="order"
					center
					styles={{
						root: { flex: 1, overflow: "auto", color: colors.gray[1] },
						itemIcon: { fontFamily: "Josefin Sans", fontSize: fontSizes.lg },
						item: {
							"cursor": "pointer",
							"padding": "1rem",
							"&:hover": { background: colors.green[8] },
							"transition": ".2s",
							"borderRadius": radius.lg
						}
					}}
				>
					{children}
				</List>
			</ScrollArea>
		</Container>
	)
}
