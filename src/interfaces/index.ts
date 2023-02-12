import { ReactNode } from "react";

export interface ILayout {
    pageInfo?:{name:string, description:string},
    children:ReactNode
}

export interface TableRowData {
	order: string
	type: string
	item: string
	category: string
	description: string
}

export interface TableSortProps {
	data: TableRowData[]
}

export interface productTableProps {
	children: React.ReactNode
	reversed: boolean
	sorted: boolean
	onSort(): void
}

 export interface FormType {
    itemNumber:string,
    orderNumber:string,
    type:string[] | string
 }
