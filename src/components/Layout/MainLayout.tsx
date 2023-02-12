import React, { ReactNode } from "react"
// import ILayout from "@/interfaces/index"
// import { SideBarMenu } from "@/components/Navigation/SideBar"
import { ILayout } from "@/interfaces"
import { SideBarMenu } from "@/components/Navigation/SideBar"
import { createStyles } from "@mantine/core"
import TopMenuBar from "@/components/Navigation/TopBar"
import LocationIndicator from "@/components/Navigation/TopBar/LocationIndicator"

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef("icon")
	return {
		main: {
			width: "100%",
			height: "100vh",
			display: "flex"
		},

		layoutBody: {
			width: "calc(100vw - 272px)",
			height: "100vh",
			background: "#F2F5FB"
		},

		header: {
			paddingBottom: theme.spacing.md,
			marginBottom: theme.spacing.md * 1.5,
			borderBottom: `1px solid ${theme.fn.lighten(theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!, 0.1)}`
		}
	}
})

function MainLayout({ children }: ILayout) {
	const { classes, cx } = useStyles()
	return (
		<div className={classes.main}>
			<SideBarMenu />
			<div className={classes.layoutBody}>
				<LocationIndicator />
				<TopMenuBar />

				{children}
			</div>
		</div>
	)
}

export default MainLayout
