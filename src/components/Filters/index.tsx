import React, { ChangeEvent, FormEvent, useState } from "react"
import { showNotification } from "@mantine/notifications"
import { observer } from "mobx-react-lite"
import { Accordion, Checkbox, Divider, createStyles } from "@mantine/core"
import { Button, Textarea } from "@mantine/core"
import productStore from "@/mobx/ProductStore"
import filterIcon2 from "@/assets/icons/filter_gray.svg"

const useStyles = createStyles(theme => ({
	inner: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 400,
		position: "absolute",
		display: "flex",
		justifyContent: "flex-end",
		background: "rgba(0,0,0, 0.15)"
	},
	acood: {
		width: "100%"
	},
	checkbox: {
		margin: "5px 0px",
		padding: "10px 0px",
		cursor: "pointer",
		width: "100%",
		borderBottom: "1px solid #EDF4FE;"
	},
	modalContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "25%",
		height: "100%",
		background: "#FFF",
		boxShadow: "-4px 0px 50px rgba(0, 0, 0, 0.08)"
	},
	filterBottom: {
		width: "100%",
		height: "80px",
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		alignSelf: "self-end",
		background: "#E7EDF6"
	},
	filterTop: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0px 10px"
	},
	filterTopLeft: {
		display: "flex",
		alignItems: "center"
	},
	filterTopLeftInner: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "10px"
	},
	textDec: {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: 500,
		fontSize: "18px",
		lineHeight: "2px",
		color: "#3F474B"
	}
}))
function FilterItems() {
	const [isValid, setIsValid] = useState<boolean>(true)

	const [errors, setErrors] = useState({
		itemNumber: "",
		orderNumber: "",
		type: ""
	})
	const { classes, cx } = useStyles()

	const validate = (values: { itemNumber: string; orderNumber: string; type: string[] | string }) => {
		const itemNumberpattern = /^\d{8}(,\d{8})*$/
		const otherNumberpattern = /^\d{17}(,\d{17})*$/
		const errorser: { itemNumber: string; orderNumber: string; type: string } = { itemNumber: "", orderNumber: "", type: "" }
		setIsValid(itemNumberpattern.test(values.itemNumber))
		if (!values.itemNumber) {
			errorser.itemNumber = "Item Number is required"
		} else if (!itemNumberpattern.test(values.itemNumber)) {
			errorser.itemNumber = "Invalid item number is a comma seperated 8 digist"
		}
		if (values.orderNumber && !otherNumberpattern.test(values.orderNumber)) {
			errorser.orderNumber = "Invalid order mumber combination"
		}

		return errorser
	}
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const hs = validate(productStore.values)
		setErrors(hs)
		if (hs.itemNumber) {
			showNotification({
				title: "Error",
				autoClose: 4000,
				color: "red",
				message: `${hs.itemNumber} 🤥`
			})
		}

		if (hs.itemNumber) return

		productStore.filterWithMultipleFields(productStore.values)
	}

	const handleChangeCheckboxInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			productStore.setSelectedTypes(e.target.value)
		} else {
			productStore.setSelectedTypes(e.target.value)
		}
	}

	function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
		{
			productStore.setSearched(false)
			productStore.formFilterValue({ ...productStore.values, [e.target.name]: e.target.value })
			const hs = validate(productStore.values)
			setErrors(hs)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={cx(classes.inner)} onClick={productStore.toggleFilter}>
				<div className={cx(classes.modalContent)}>
					<div>
						<div className={classes.filterTop}>
							<div className={classes.filterTopLeft}>
								<img src={filterIcon2} alt={"filter"} />
								<div className={classes.filterTopLeftInner}>
									<h3 className={classes.textDec}>Set Parameters</h3>
									<span>3 parameters available</span>
								</div>
							</div>
							<Button type="button" onClick={() => productStore.resetAll()}>
								Reset All
							</Button>
						</div>
						<Divider mt="sm" />

						<Accordion className={classes.acood} defaultValue="customization">
							<Accordion.Item value="customization">
								<Accordion.Control>Item</Accordion.Control>
								<Accordion.Panel>
									<Textarea name="itemNumber" error={errors.itemNumber && errors.itemNumber} onChange={handleChange} value={productStore.filter} placeholder="Item Number (Ex. “86886895”)" />
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="flexibility">
								<Accordion.Control> Order #</Accordion.Control>
								<Accordion.Panel>
									<Textarea
										name="orderNumber"
										error={errors.orderNumber && errors.orderNumber}
										onChange={handleChange}
										value={productStore.values.orderNumber}
										placeholder="Order ID (Ex. 08419577154061986)"
									/>
								</Accordion.Panel>
							</Accordion.Item>

							<Accordion.Item value="focus-ring">
								<Accordion.Control>Type</Accordion.Control>
								<Accordion.Panel>
									<Checkbox className={classes.checkbox} label="Show all" color="indigo" />
									<Checkbox className={classes.checkbox} onChange={handleChangeCheckboxInput} label="CDA" name="type" value="CDA" color="indigo" />
									<Checkbox className={classes.checkbox} onChange={handleChangeCheckboxInput} label="EDF" name="type" value="EDF" color="indigo" />
									<Checkbox className={classes.checkbox} onChange={handleChangeCheckboxInput} label="SFO" name="type" value="SFO" color="indigo" />
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</div>
					<div className={classes.filterBottom}>
						<Button onClick={() => productStore.toggleFilter()} variant="outline">
							Cancel
						</Button>
						<Button type={"submit"} color="cyan">
							{productStore.isLoading ? "Please wait..." : "Apply"}
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}

export default observer(FilterItems)
