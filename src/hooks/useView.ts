import { useState } from "react"

export const useView = () => {
	const [view, setView] = useState<"pins" | "route">("pins")

	return { view, setView }
}
