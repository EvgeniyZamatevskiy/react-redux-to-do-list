import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@mui/icons-material'
import { selectLoadingStatus } from '../../redux/reducers/app-reducer/selectors'
import { authActionCreators } from '../../redux/reducers/auth-reducer'
import { selectIsAuth } from '../../redux/reducers/auth-reducer/selectors'
import { useSelector } from 'react-redux'
import { useActions } from '../../redux/hooks/useActions'

export const Header = () => {

	const { logoutTC } = useActions(authActionCreators)
	const loadingStatus = useSelector(selectLoadingStatus)
	const isAuth = useSelector(selectIsAuth)

	const logoutHandler = () => {
		logoutTC()
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