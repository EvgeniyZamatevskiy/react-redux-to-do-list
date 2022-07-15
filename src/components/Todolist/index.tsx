import React, { FC, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { Task } from '../Task'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/hooks'
import { addTask, getTasks } from 'redux/tasks/asyncActions'
import { TodolistSupplementedType } from 'redux/todolists/types'
import { selectTasks } from 'redux/tasks/selectors'
import { EditableItem, AddItemForm } from 'components/common'
import { changeTodolistTitle, removeTodolist } from 'redux/todolists/asyncActions'

type TodolistPropsType = {
	todolist: TodolistSupplementedType
}

export const Todolist: FC<TodolistPropsType> = ({ todolist }) => {

	const dispatch = useAppDispatch()

	const tasks = useSelector(selectTasks)

	const tasksRender = tasks[todolist.id].map(({ id, priority, status, title, todoListId }) => {
		return <Task key={id} id={id} priority={priority} status={status} title={title} todoListId={todoListId} />
	})

	const handleChangeTodolistTitle = (newTitle: string) => {
		dispatch(changeTodolistTitle({ todolistId: todolist.id, title: newTitle }))
	}

	const onRemoveTodolistClick = () => {
		dispatch(removeTodolist(todolist.id))
	}

	const handleAddTaskClick = (title: string) => {
		dispatch(addTask({ todolistId: todolist.id, title }))
	}

	useEffect(() => {
		dispatch(getTasks({ todolistId: todolist.id }))
	}, [])

	return (
		<Paper style={{ padding: '10px', position: 'relative' }}>
			<IconButton
				size={'small'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
				onClick={onRemoveTodolistClick}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableItem currentValue={todolist.title} changeCurrentValue={handleChangeTodolistTitle} />
			</h3>
			<AddItemForm addItem={handleAddTaskClick} />
			<div>
				{tasksRender}
				{!tasks[todolist.id].length
					&& <div style={{ padding: '10px', color: 'grey', textAlign: 'center' }}>No task</div>}
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
