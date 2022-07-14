import React, { FC, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Todolist } from '../../components/Todolist'
import { AddItemForm } from 'components/common'
import { useTypedDispatch } from 'hooks'
import { getTodolists } from 'redux/todolists/asyncActions'
import { useSelector } from 'react-redux'
import { selectTodolists } from 'redux/todolists/selectors'

export const Todolists: FC = () => {

	const dispatch = useTypedDispatch()

	const todolists = useSelector(selectTodolists)

	const todolistsRender = todolists.map(todolist => {
		return (
			<Grid item key={todolist.id}>
				<div style={{ width: '300px' }}>
					<Todolist todolist={todolist} />
				</div>
			</Grid>
		)
	})

	useEffect(() => {
		dispatch(getTodolists())
	}, [])

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm />
			</Grid>
			<Grid container spacing={3} style={{ flexWrap: 'nowrap', overflowX: 'scroll', padding: '10px' }}>
				{todolistsRender}
			</Grid>
		</>
	)
}
