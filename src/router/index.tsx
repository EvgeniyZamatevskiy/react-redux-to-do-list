import { Path } from 'enums'
import { ToDoLists } from 'pages'
import { lazy } from 'react'

const Login = lazy(() => import(/* webpackChunkName: 'Login' */'pages/login')
	.then(module => ({ default: module.Login })))

const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'pages/notFound')
	.then(module => ({ default: module.NotFound })))

export const ROUTES = [
	{ path: Path.HOME, element: <ToDoLists /> },
	{ path: Path.LOGIN, element: <Login /> },
	{ path: Path.NOT_FOUND, element: <NotFound /> },
]
