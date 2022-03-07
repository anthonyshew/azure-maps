import {
	Button,
	Container,
	List,
	ScrollArea,
	Title,
	useMantineTheme
} from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { ReactNode, Dispatch, SetStateAction } from "react"

interface Props {
	children: ReactNode
	title: string
	/** I'm only using emojis for this for now so a string is good enough! */
	icon: string
	view: "route" | "pins"
	setView: Dispatch<SetStateAction<"route" | "pins">>
}

export const LowerList = ({ children, title, icon, view, setView }: Props) => {
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
			<Container
				fluid
				style={{
					display: "flex",
					justifyContent: "space-between",
					margin: 0,
					paddingTop: spacing.md
				}}
			>
				<Title
					order={2}
					style={{ color: colors.gray[1], fontSize: fontSizes.xl * 2 }}
				>
					{title}
				</Title>
				{view === "route" && (
					<Button color="green" onClick={() => setView("pins")}>
						Back
					</Button>
				)}
			</Container>
			<ScrollArea
				styles={{ root: { paddingRight: "1rem", paddingBottom: spacing.lg } }}
			>
				<List
					icon={icon}
					type="order"
					center
					styles={{
						root: { flex: 1, overflow: "auto", color: colors.gray[1] },
						itemIcon: { fontFamily: "Josefin Sans", fontSize: fontSizes.lg },
						item: {
							"fontSize": fontSizes.lg,
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
