import React, { FC, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { AddItemForm } from '../common/AddItemForm'
import { EditableSpan } from '../common/EditableSpan'
import { Task } from '../Task'
import { useSelector } from 'react-redux'
import { useTypedDispatch } from 'hooks'
import { getTasks } from 'redux/tasks/asyncActions'
import { TodolistSupplementedType } from 'redux/todolists/types'
import { selectTasks } from 'redux/tasks/selectors'

type TodolistPropsType = {
	todolist: TodolistSupplementedType
}

export const Todolist: FC<TodolistPropsType> = ({ todolist }) => {

	const dispatch = useTypedDispatch()

	const tasks = useSelector(selectTasks)

	const tasksRender = tasks[todolist.id].map(({ id, priority, status, title, todoListId }) => {
		return <Task key={id} id={id} priority={priority} status={status} title={title} todoListId={todoListId} />
	})

	useEffect(() => {
		dispatch(getTasks({ todolistId: todolist.id }))
	}, [])

	return (
		<Paper style={{ padding: '10px', position: 'relative' }}>
			<IconButton
				size={'small'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableSpan />
			</h3>
			<AddItemForm />
			<div>
				{tasksRender}
				{/* <div style={{ padding: '10px', color: 'grey' }}>No task</div> */}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button
					variant={'outlined'}
					color={'primary'}>
				</Button>
			</div>
		</Paper>
	)
}
