import React, { FormEvent, ChangeEvent } from "react"
import { createStyles, Header, Group, Kbd, TextInput } from "@mantine/core"
import { AddICon, SearchICon } from "@/utils/assets"
import SortICon from "@/assets/icons/sort.svg"
import FilterICon from "@/assets/icons/filter.svg"
import productStore from "@/mobx/ProductStore"
import { observer } from "mobx-react-lite"
import FilterItems from "@/components/Filters"
import { showNotification } from "@mantine/notifications"

const useStyles = createStyles(theme => ({
	header: {
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		height: "80px",
		borderBottom: "2px solid #E0E9F7"
	},

	inner: {
		height: 56,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},

	links: {
		[theme.fn.smallerThan("md")]: {
			display: "none"
		}
	},

	search: {
		height: "40px",
		outline: "none",
		border: "2px solid #D0DAE1",
		borderRadius: "3px",
		[theme.fn.smallerThan("xs")]: {
			display: "none"
		}
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: "8px 12px",
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
		}
	},
	kdb: {
		width: "40px",
		height: "40px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer"
	}
}))

function TopMenuBar() {
	const { classes } = useStyles()

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const pattern = /^\d{8}(,\d{8})*$/
		const isValid = pattern.test(productStore.filter)
		if (!isValid) return
		showNotification({
			title: "Error",
			autoClose: 4000,
			color: "red",
			message: `Item number is combination of comma seperated 8 digits 🤥`
		})

		productStore.filterProduct(productStore.filter)
	}
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		{
			productStore.setFilter(e.target.value)
			productStore.setSearched(false)
			productStore.setProducts([])
		}
	}

	return (
		<>
			{/* {form.errors.filter && <Notification>Search field is a comma seperated list of item number(s)</Notification>} */}
			{productStore.isFilter && <FilterItems />}
			<Header height={56} className={classes.header}>
				<div className={classes.inner}>
					<Group></Group>

					<Group>
						<Group ml={50} spacing={5} className={classes.links}></Group>
						<form onSubmit={handleSubmit}>
							<TextInput
								className={classes.search}
								placeholder="Search"
								name="filter"
								value={productStore.filter}
								onChange={e => handleChange(e)}
								rightSection={
									<button type="submit" style={{ backgroundColor: "transparent", border: "none" }}>
										<img src={SearchICon} alt="Search" />
									</button>
								}
							/>
						</form>
						<Kbd className={classes.kdb}>
							<img src={AddICon} alt="Search" />
						</Kbd>{" "}
						<Kbd className={classes.kdb}>
							<img src={SortICon} alt="Sort" />
						</Kbd>{" "}
						<Kbd onClick={() => productStore.toggleFilter()} className={classes.kdb}>
							<img src={FilterICon} alt="Search" />
						</Kbd>
					</Group>
				</div>
			</Header>
		</>
	)
}

export default observer(TopMenuBar)
