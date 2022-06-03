import React, { memo, useCallback, useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { ToDoList } from '../../components/ToDoList/ToDoList'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { addToDoListTC, getToDoListsTC } from '../../redux/toDoListsReducer'

export const ToDoListsList = memo(() => {

	const dispatch = useTypedDispatch()
	const navigate = useNavigate()
	const { toDoLists } = useTypedSelector(state => state.toDoLists)
	const { tasks } = useTypedSelector(state => state.tasks)
	const { isAuth } = useTypedSelector(state => state.auth)

	useEffect(() => {
		if (isAuth) {
			dispatch(getToDoListsTC())
		} else {
			navigate('login')
		}
	}, [isAuth])

	const addToDoList = useCallback((title: string) => {
		dispatch(addToDoListTC(title))
	}, [dispatch])

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addToDoList} />
			</Grid>
			<Grid container spacing={3}>
				{toDoLists.map(tl => {
					return <Grid item key={tl.id}>
						<Paper style={{ padding: '10px' }}>
							<ToDoList toDoList={tl} tasks={tasks[tl.id]} />
						</Paper>
					</Grid>
				})}
			</Grid>
		</>
	)
})