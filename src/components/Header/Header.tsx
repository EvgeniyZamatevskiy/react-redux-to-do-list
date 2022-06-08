import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
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
		<AppBar position='fixed' >
			<Toolbar >
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To-Do List
				</Typography>
				{isAuth && <Button onClick={logoutHandler} color='inherit'>Log out</Button>}
			</Toolbar>
			{loadingStatus === 'loading' && <LinearProgress />}
		</AppBar>
	)
}