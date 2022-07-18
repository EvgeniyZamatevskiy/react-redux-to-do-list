import React, { FC, ReactElement, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useAppDispatch } from 'store/hooks'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Path } from 'enums/Path'
import { ToDoList, AddItemForm } from 'components'
import { addToDoList, getToDoLists } from 'store/asyncActions'
import { selectIsAuth } from 'store/selectors/auth'
import { selectToDoLists } from 'store/selectors/toDoLists'
import style from './ToDoLists.module.css'

export const ToDoLists: FC = (): ReactElement => {

	const dispatch = useAppDispatch()

	const toDoLists = useSelector(selectToDoLists)
	const isAuth = useSelector(selectIsAuth)

	const toDoListsRender = toDoLists.map(({ id, filter, isDisabled, title }) => {
		return (
			<Grid item key={id}>
				<div className={style.container}>
					<ToDoList toDoListId={id} filter={filter} isDisabled={isDisabled} title={title} />
				</div>
			</Grid>
		)
	})

	const handleAddToDoListClickAndKeyDown = useCallback((title: string): void => {
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
				<AddItemForm addItem={handleAddToDoListClickAndKeyDown} />
			</Grid>
			<Grid container spacing={3} sx={{ flexWrap: 'nowrap', overflowX: 'scroll', padding: '10px' }}>
				{toDoListsRender}
			</Grid>
		</>
	)
}
