import React, { FC, ReactElement } from 'react'
import { AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { logOut } from 'store/asyncActions'
import { selectIsLoading, selectIsAuth, selectAuthorizedUserData } from 'store/selectors'
import { Link, useLocation } from 'react-router-dom'
import { Path } from 'enums'
import style from './Header.module.css'

export const Header: FC = (): ReactElement => {

	const dispatch = useAppDispatch()

	const { pathname } = useLocation()

	const isLoading = useSelector(selectIsLoading)
	const isAuth = useSelector(selectIsAuth)
	const authorizedUserData = useSelector(selectAuthorizedUserData)

	const onLogOutClick = (): void => {
		dispatch(logOut())
	}

	return (
		<AppBar position='fixed' >
			<Toolbar>

				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					<Link to={Path.HOME} className={style.title}>
						To Do List
					</Link>
				</Typography>

				{isAuth && pathname === Path.HOME && (
					<>
						<div className={style.login}>{authorizedUserData?.login}</div>
						<Button color='inherit' onClick={onLogOutClick}>Log out</Button>
					</>
				)}
			</Toolbar>
			{isLoading && <LinearProgress />}
		</AppBar>
	)
}
