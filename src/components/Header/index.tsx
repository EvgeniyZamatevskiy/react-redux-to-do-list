import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@mui/icons-material'
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectIsLoading } from 'redux/app/selectors'
import { selectAuthorizedUserData, selectIsAuth } from 'redux/auth/selectors'
import { useAppDispatch } from 'redux/hooks'
import { logOut } from 'redux/auth/asyncActions'

export const Header = () => {

	const dispatch = useAppDispatch()

	const isLoading = useSelector(selectIsLoading)
	const isAuth = useSelector(selectIsAuth)
	const authorizedUserData = useSelector(selectAuthorizedUserData)

	const onLogOutClick = () => {
		dispatch(logOut())
	}

	return (
		<AppBar position='fixed' >
			<Toolbar >
				<IconButton edge='start' color='inherit' aria-label='menu'>
					<Menu />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To Do List
				</Typography>
				{isAuth && (
					<>
						<Button color='inherit' onClick={onLogOutClick}>Log out</Button>
						<div>{authorizedUserData?.login}</div>
					</>
				)}
			</Toolbar>
			{isLoading && <LinearProgress />}
		</AppBar>
	)
}
