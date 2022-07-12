import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import 'styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

reportWebVitals()
