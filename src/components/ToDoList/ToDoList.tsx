import { AddBox, Delete } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { getTasksTC, TaskStateType } from '../../redux/tasksReducer'
import { ToDoListSupplementedType } from '../../redux/toDoListsReducer'
import { Task } from '../Task/Task'

type ToDoListPropsType = {
	toDoList: ToDoListSupplementedType
}

export const ToDoList: FC<ToDoListPropsType> = ({ toDoList }) => {

	const dispatch = useTypedDispatch()
	const tasks = useTypedSelector<TaskStateType>(state => state.tasks.tasks)[toDoList.id]

	useEffect(() => {
		dispatch(getTasksTC(toDoList.id))
	}, [])

	return (
		<div>
			<h3>
				<span>{toDoList.title}</span>
				<IconButton>
					<Delete />
				</IconButton>
			</h3>
			<TextField variant='outlined' label='Title' />
			<IconButton color='primary' >
				<AddBox />
			</IconButton>
			<div>
				{tasks.map(t => <Task key={t.id} task={t} />)}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button variant={'text'} color={'primary'}>All</Button>
				<Button variant={'text'} color={'primary'}>Active</Button>
				<Button variant={'text'} color={'primary'}>Completed</Button>
			</div>
		</div>
	)
}