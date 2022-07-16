import React, { FC, ReactElement, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useAppDispatch } from 'redux/hooks'
import { addToDoList, getToDoLists } from 'redux/toDoLists/asyncActions'
import { useSelector } from 'react-redux'
import { selectToDoLists } from 'redux/toDoLists/selectors'
import { selectIsAuth } from 'redux/auth/selectors'
import { Navigate } from 'react-router-dom'
import { Path } from 'enums/Path'
import { ToDoList, AddItemForm } from 'components'
import style from './ToDoLists.module.css'

export const ToDoLists: FC = (): ReactElement => {

	const dispatch = useAppDispatch()

	const toDoLists = useSelector(selectToDoLists)
	const isAuth = useSelector(selectIsAuth)

	const toDoListsRender = toDoLists.map(toDoList => {
		return (
			<Grid item key={toDoList.id}>
				<div className={style.container}>
					<ToDoList toDoList={toDoList} />
				</div>
			</Grid>
		)
	})

	const handleAddToDoListClick = useCallback((title: string): void => {
		dispatch(addToDoList(title))
	}, [])

	useEffect(() => {
		if (isAuth) {
			dispatch(getToDoLists())
		}
	}, [])

	if (!isAuth) {
		return <Navigate to={Path.LOGIN} />
	}

	return (
		<>
			<Grid container className={style.content}>
				<AddItemForm addItem={handleAddToDoListClick} />
			</Grid>
			<Grid container spacing={3} sx={{ flexWrap: 'nowrap', overflowX: 'scroll', padding: '10px' }}>
				{toDoListsRender}
			</Grid>
		</>
	)
}
