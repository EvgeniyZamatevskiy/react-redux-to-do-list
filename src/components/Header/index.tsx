import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch'
import { selectLoadingStatus } from 'redux/app/selectors'
import { logoutTC } from 'redux/auth/asyncActions'
import { selectIsAuth } from 'redux/auth/selectors'

export const Header = () => {

	const dispatch = useTypedDispatch()

	const loadingStatus = useSelector(selectLoadingStatus)
	const isAuth = useSelector(selectIsAuth)

	const logoutHandler = () => {
		dispatch(logoutTC())
	}

	return (
		<AppBar position='fixed' >
			<Toolbar >
				<IconButton edge='start' color='inherit' aria-label='menu'>
					<Menu />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To-Do List
				</Typography>
				{isAuth && <Button onClick={logoutHandler} color='inherit'>Log out</Button>}
			</Toolbar>
			{loadingStatus === 'loading' && <LinearProgress />}
		</AppBar>
	)
}