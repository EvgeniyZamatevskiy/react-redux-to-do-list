import { AddBox } from '@mui/icons-material'
import { Grid, IconButton, Paper, TextField } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { ToDoList } from '../../components/ToDoList/ToDoList'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { getToDoListsTC } from '../../redux/toDoListsReducer'

type ToDoListsListPropsType = {

}

export const ToDoListsList: FC<ToDoListsListPropsType> = ({ }) => {

	const dispatch = useTypedDispatch()
	const { toDoLists } = useTypedSelector(state => state.toDoLists)

	useEffect(() => {
		dispatch(getToDoListsTC())
	}, [])

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<TextField variant='outlined' label='Title' />
				<IconButton color='primary' >
					<AddBox />
				</IconButton>
			</Grid>
			<Grid container spacing={3}>
				{toDoLists.map(tl => {
					return <Grid item key={tl.id}>
						<Paper style={{ padding: '10px' }}>
							<ToDoList toDoList={tl} />
						</Paper>
					</Grid>
				})}
			</Grid>
		</>
	)
}