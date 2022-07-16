import React, { FC, ReactElement } from 'react'
import { AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectIsLoading } from 'redux/app/selectors'
import { selectAuthorizedUserData, selectIsAuth } from 'redux/auth/selectors'
import { useAppDispatch } from 'redux/hooks'
import { logOut } from 'redux/auth/asyncActions'
import style from './Header.module.css'

export const Header: FC = (): ReactElement => {

	const dispatch = useAppDispatch()

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
					To Do List
				</Typography>
				{isAuth && (
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
