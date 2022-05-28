import React, { FC } from 'react'
import { AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useTypedSelector } from '../../redux/store'

type HeaderPropsType = {

}

export const Header: FC<HeaderPropsType> = ({ }) => {

	const { loadingStatus } = useTypedSelector(state => state.app)

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To-Do List
				</Typography>
				<Button color='inherit'>Logout</Button>
			</Toolbar>
			{loadingStatus === 'loading' && <LinearProgress />}
		</AppBar>
	)
}