import productStore from "@/mobx/ProductStore"
import { createStyles } from "@mantine/core"
import { observer } from "mobx-react-lite"
import React from "react"

const useStyles = createStyles(theme => ({
	content: {
		width: "100%",
		height: "85vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
		// background: "#E0E9F7"
	},

	itemDiv: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		// height: 200,
		alignItems: "center"
	},
	headerText: {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: 700,
		fontSize: "28px",
		lineHeight: "34px",
		color: "#000E28",
		marginBottom: "0px"
	},
	textDec: {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: 500,
		fontSize: "16px",
		lineHeight: "19px",
		color: "#778FAB"
	},
	textV: {
		fontFamily: "Inter",
		fontStyle: "bold",
		fontWeight: 500,
		fontSize: "16px",
		lineHeight: "19px",
		color: "#0C67A0"
	},
	button: {
		width: "202px",
		height: "42px",
		background: "#0C67A0",
		borderRadius: "3px",
		outline: "none",
		border: "none",
		cursor: "pointer",
		color: "#FFFFFF",
		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5]
		}
	},
	or: {
		color: "#778FAB"
	}
}))

function LoadData() {
	const { classes, cx } = useStyles()
	return (
		<div className={classes.content}>
			<div className={classes.itemDiv}>
				<h3 className={classes.headerText}>What are you looking for?</h3>
				<p className={classes.textDec}>Get started by searching & filtering a few</p>
				<button disabled={productStore.isLoading} onClick={() => productStore.getProductList()} className={classes.button}>
					{productStore.isLoading ? "Loading" : "Loading Data"}
				</button>
				<p className={classes.or}>
					or <span className={cx(classes.textDec, classes.textV)}>search for an item</span>
				</p>
			</div>
		</div>
	)
}

export default observer(LoadData)
