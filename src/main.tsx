import React from "react"
import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider withNormalizeCSS withGlobalStyles>
			<NotificationsProvider position="top-center" zIndex={2077}>
				<App />
			</NotificationsProvider>
		</MantineProvider>
	</React.StrictMode>
)
