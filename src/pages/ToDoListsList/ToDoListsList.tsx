import React, { memo, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { Todolist } from '../../components/Todolist/Todolist'
import { selectIsAuth } from '../../redux/reducers/auth-reducer/selectors'
import { todolistsActionCreators } from '../../redux/reducers/todolists-reducer'
import { selectTasks } from '../../redux/reducers/tasks-reducer/selectors'
import { selectTodolists } from '../../redux/reducers/todolists-reducer/selectors'
import { useSelector } from 'react-redux'
import { useActions } from '../../redux/hooks/useActions'

export const TodolistsList = memo(() => {

	const navigate = useNavigate()
	const { getTodolistsTC, addTodolistTC } = useActions(todolistsActionCreators)
	const todolists = useSelector(selectTodolists)
	const tasks = useSelector(selectTasks)
	const isAuth = useSelector(selectIsAuth)

	const addTodolistHandler = useCallback((title: string) => {
		addTodolistTC(title)
	}, [])

	useEffect(() => {
		if (isAuth) {
			getTodolistsTC()
		} else {
			navigate('login')
		}
	}, [isAuth])

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolistHandler} />
			</Grid>
			<Grid container spacing={3} style={{ flexWrap: 'nowrap', overflowX: 'scroll', padding: '10px' }}>
				{todolists.map(tl => {
					return (
						<Grid item key={tl.id}>
							<div style={{ width: '300px' }}>
								<Todolist todolist={tl} tasks={tasks[tl.id]} />
							</div>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
})