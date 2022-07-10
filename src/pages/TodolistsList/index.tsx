import React, { memo, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Navigate, useNavigate } from 'react-router-dom'
import { AddItemForm } from '../../components/common/AddItemForm'
import { Todolist } from '../../components/Todolist'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch'
import { selectIsAuth } from 'redux/auth/selectors'
import { Path } from 'enums/Path'
import { selectTodolists } from 'redux/todolists/selectors'
import { selectTasks } from 'redux/tasks/selectors'
import { addTodolist, getTodolists } from 'redux/todolists/asyncActions'

export const TodolistsList = memo(() => {

	const dispatch = useTypedDispatch()

	const navigate = useNavigate()
	const todolists = useSelector(selectTodolists)
	const tasks = useSelector(selectTasks)
	const isAuth = useSelector(selectIsAuth)

	const addTodolistHandler = useCallback((title: string) => {
		dispatch(addTodolist(title))
	}, [])

	useEffect(() => {
		if (isAuth) {
			dispatch(getTodolists())
		}
	}, [])

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

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