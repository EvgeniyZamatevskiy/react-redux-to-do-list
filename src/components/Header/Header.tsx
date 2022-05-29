import React from 'react'
import { AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { logoutTC } from '../../redux/authReducer'

export const Header = () => {

	const dispatch = useTypedDispatch()
	const { loadingStatus } = useTypedSelector(state => state.app)
	const { isAuth } = useTypedSelector(state => state.auth)

	const logoutHandler = () => {
		dispatch(logoutTC())
	}

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To-Do List
				</Typography>
				{isAuth && <Button onClick={logoutHandler} color='inherit'>Logout</Button>}
			</Toolbar>
			{loadingStatus === 'loading' && <LinearProgress />}
		</AppBar>
	)
}