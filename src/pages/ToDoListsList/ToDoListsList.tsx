import { AddBox } from '@mui/icons-material'
import { Grid, Paper } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { ToDoList } from '../../components/ToDoList/ToDoList'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { addToDoListTC, getToDoListsTC } from '../../redux/toDoListsReducer'

type ToDoListsListPropsType = {

}

export const ToDoListsList: FC<ToDoListsListPropsType> = ({ }) => {

	const dispatch = useTypedDispatch()
	const { toDoLists } = useTypedSelector(state => state.toDoLists)

	useEffect(() => {
		dispatch(getToDoListsTC())
	}, [])

	const addToDoList = (title: string) => {
		dispatch(addToDoListTC(title))
	}

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addToDoList} />
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