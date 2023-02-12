import { createStyles } from "@mantine/core"
import React from "react"
const useStyles = createStyles(theme => ({
	topContent: {
		width: "100%",
		height: "41px",
		background: "#E0E9F7"
	}
}))
function LocationIndicator() {
	const { classes } = useStyles()
	return (
		<div className={classes.topContent}>
			<span>Home &gt; OCS &gt; Item Search</span>
		</div>
	)
}

export default LocationIndicator
