import React from "react"
import LoadData from "./LoadData"
import itemData from "@/data"
import TableSort from "@/components/Table/index"
import { LoadingOverlay, Button, Group } from "@mantine/core"
import { observer } from "mobx-react-lite"
import productStore from "@/mobx/ProductStore"

function Home() {
	return (
		<div>
			{productStore.isLoading && <LoadingOverlay visible={productStore.isLoading} overlayBlur={1} />}

			{!productStore.isLoading && productStore?.isSeached && <TableSort data={productStore.products} />}
			{!productStore.isLoading && !productStore?.isSeached && productStore?.products.length === 0 && <LoadData />}
		</div>
	)
}

export default observer(Home)
