import React, { FC } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

type HeaderPropsType = {

}

export const Header: FC<HeaderPropsType> = ({ }) => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To-Do List
				</Typography>
				<Button color='inherit'>Logout</Button>
			</Toolbar>
		</AppBar>
	)
}