import { useEffect, useState } from "react"
import { createStyles, Table, ScrollArea, UnstyledButton, Group, Text, Center } from "@mantine/core"
import { keys } from "@mantine/utils"
import { TableRowData, TableSortProps, productTableProps } from "@/interfaces"
import { observer } from "mobx-react-lite"
import productStore from "@/mobx/ProductStore"

const useStyles = createStyles(theme => ({
	th: {
		padding: "0 !important"
	},
	scrollContent: {
		height: "80vh",
		marginTop: "15px"
	},

	control: {
		width: "100%",
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
		}
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21
	}
}))

function Th({ children, reversed, sorted, onSort }: productTableProps) {
	const { classes } = useStyles()
	const Icon = sorted ? (reversed ? "IconChevronUp" : "IconChevronDown") : "IconSelector"
	return (
		<th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position="apart">
					<Text weight={500} size="sm">
						{children}
					</Text>
					<Center className={classes.icon}>{/* <Icon /> */}</Center>
				</Group>
			</UnstyledButton>
		</th>
	)
}

function filterData(data: TableRowData[], search: string) {
	const query = search.toLowerCase().trim()
	return data.filter(item => keys(data[0]).some(key => item[key].toLowerCase().includes(query)))
}

function sortData(data: TableRowData[], payload: { sortBy: keyof TableRowData | null; reversed: boolean; search: string }) {
	const { sortBy } = payload

	if (!sortBy) {
		return filterData(data, payload.search)
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy])
			}

			return a[sortBy].localeCompare(b[sortBy])
		}),
		payload.search
	)
}

function TableSort({ data }: TableSortProps) {
	const [search, setSearch] = useState("")
	const [sortedData, setSortedData] = useState(data)
	const [sortBy, setSortBy] = useState<keyof TableRowData | unknown>([])
	const [reverseSortDirection, setReverseSortDirection] = useState(false)
	const { classes } = useStyles()

	const setSorting = (field: keyof TableRowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false
		setReverseSortDirection(reversed)
		setSortBy(field)
		setSortedData(sortData(data, { sortBy: field, reversed, search }))
	}

	const rows = sortedData?.map((row: TableRowData) => (
		<tr key={row?.order}>
			<td>{row?.order}</td>
			<td>{row?.type}</td>
			<td>{row?.item}</td>
			<td>{row?.category}</td>
			<td>{row?.description}</td>
		</tr>
	))

	return (
		<ScrollArea className={classes.scrollContent}>
			<Table horizontalSpacing="md" verticalSpacing="xs" sx={{ tableLayout: "fixed", minWidth: 700 }}>
				<thead>
					<tr>
						<Th sorted={sortBy === "order"} reversed={reverseSortDirection} onSort={() => setSorting("order")}>
							Order
						</Th>
						<Th sorted={sortBy === "type"} reversed={reverseSortDirection} onSort={() => setSorting("type")}>
							Type
						</Th>
						<Th sorted={sortBy === "item"} reversed={reverseSortDirection} onSort={() => setSorting("item")}>
							Item
						</Th>
						<Th sorted={sortBy === "category"} reversed={reverseSortDirection} onSort={() => setSorting("category")}>
							Category
						</Th>
						<Th sorted={sortBy === "description"} reversed={reverseSortDirection} onSort={() => setSorting("description")}>
							Description
						</Th>
					</tr>
				</thead>
				<tbody>
					{rows?.length > 0 ? (
						rows
					) : (
						<tr>
							<td colSpan={5}>
								<Text weight={500} align="center">
									Nothing item found
								</Text>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</ScrollArea>
	)
}

export default observer(TableSort)
