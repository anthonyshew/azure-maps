import { Title } from "@mantine/core"

const Logo = () => {
	return (
		<Title
			order={1}
			style={{
				position: "absolute",
				top: "1rem",
				left: "1rem",
				zIndex: 1,
				fontFamily: "Josefin Sans",
				fontSize: "1.5rem"
			}}
		>
			🌳 Outside is Good!
		</Title>
	)
}

export default Logo
