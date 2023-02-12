import { useState } from "react"
import { createStyles, Navbar, Group, Image } from "@mantine/core"
import { BellICon, CloseMenuICon, HelpICon, LogoICon, MenuICon, SignOutICon } from "@/utils/assets"

const useStyles = createStyles((theme, _params, getRef) => {
	const icon = getRef("icon")
	return {
		navbar: {
			height: "100vh",
			width: 272,
			backgroundColor: "#00152F",
			border: "none",
			fontFamily: "Inter, sans-serif"
		},

		header: {
			marginBottom: theme.spacing.md * 1
		},

		footer: {
			paddingTop: theme.spacing.md,
			marginTop: theme.spacing.md
		},

		link: {
			...theme.fn.focusStyles(),
			width: "-5px",
			display: "flex",
			alignItems: "center",
			borderLeft: "5px solid #00152F",
			textDecoration: "none",
			fontSize: "12px",
			margin: "5px 0px",
			color: "#D1D7DC",
			padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,
			span: {
				marginLeft: 5
			},
			"&:hover": {
				borderLeft: "5px solid #157CB0 ",
				backgroundColor: "#064A71",
				color: "#D1D7DC"
			}
		},

		linkIcon: {
			ref: icon,
			color: "#D1D7DC",
			opacity: 0.75,
			marginRight: theme.spacing.sm
		},

		linkActive: {
			"&, &:hover": {
				borderLeft: "5px solid #157CB0 ",
				backgroundColor: "#064A71",
				[`& .${icon}`]: {
					opacity: 0.9
				}
			}
		}
	}
})

const data = [
	{ link: "", label: "Item Search", icon: MenuICon },
	{
		link: "",
		label: "Item 2",
		icon: MenuICon,
		initiallyOpened: true,
		links: [
			{ label: "Sub Item 1", link: "/" },
			{ label: "Sub Item 2", link: "/" },
			{ label: "Sub Item 3", link: "/" },
			{ label: "Sub Item 4", link: "/" }
		]
	},
	{ link: "", label: "Item 3", icon: MenuICon },
	{ link: "", label: "Item 4", icon: MenuICon },
	{ link: "", label: "Item 5", icon: MenuICon },
	{ link: "", label: "Item 6", icon: MenuICon },
	{ link: "", label: "Item 7", icon: MenuICon }
]

export function SideBarMenu() {
	const { classes, cx } = useStyles()
	const [active, setActive] = useState("Billing")

	const links = data.map((item, idx) => (
		<a
			className={cx(classes.link, { [classes.linkActive]: item.label === active })}
			href={item.link}
			key={`${item.label}-dhj${idx}`}
			onClick={event => {
				event.preventDefault()
				setActive(item.label)
			}}
		>
			<img src={item.icon} alt="menu" className={classes.linkIcon} />
			<span>{item.label}</span>
		</a>
	))

	// const links = data.map((item) => <LinksGroup {...item} key={item.label} />);
	return (
		<Navbar p="md" className={classes.navbar}>
			<Navbar.Section grow>
				<Group className={classes.header} position="apart">
					<img src={LogoICon} alt="OCt" />
				</Group>
				{links}
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<a href="#" className={classes.link} onClick={event => event.preventDefault()}>
					<img src={CloseMenuICon} className={classes.linkIcon} />
					<span>Close menu</span>
				</a>
				<a href="#" className={classes.link} onClick={event => event.preventDefault()}>
					<img src={CloseMenuICon} className={classes.linkIcon} />

					<span>Change account</span>
				</a>
				<a href="#" className={classes.link} onClick={event => event.preventDefault()}>
					<img src={HelpICon} className={classes.linkIcon} />

					<span>Help</span>
				</a>
				<a href="#" className={classes.link} onClick={event => event.preventDefault()}>
					<img src={BellICon} className={classes.linkIcon} />
					<span>Notification</span>
				</a>

				<a href="#" className={classes.link} onClick={event => event.preventDefault()}>
					<img src={SignOutICon} className={classes.linkIcon} />
					<span>Sign out</span>
				</a>
			</Navbar.Section>
		</Navbar>
	)
}
