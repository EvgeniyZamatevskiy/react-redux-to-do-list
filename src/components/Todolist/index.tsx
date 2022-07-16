import React, { FC, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { Task } from '../Task'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/hooks'
import { addTask, getTasks } from 'redux/tasks/asyncActions'
import { FilterValuesType, TodolistSupplementedType } from 'redux/todolists/types'
import { selectTasks } from 'redux/tasks/selectors'
import { EditableItem, AddItemForm } from 'components/common'
import { changeTodolistTitle, removeTodolist } from 'redux/todolists/asyncActions'
import { TaskStatus } from 'api/tasks/types'
import { changeTodolistFilter } from 'redux/todolists/slice'

type TodolistPropsType = {
	todolist: TodolistSupplementedType
}

const filterValue: FilterValuesType[] = ['all', 'active', 'completed']

export const Todolist: FC<TodolistPropsType> = ({ todolist }) => {

	const { isDisabled, filter, id: todolistId, title } = todolist

	const dispatch = useAppDispatch()

	const tasks = useSelector(selectTasks)

	let filteredTask = tasks[todolistId]
	if (filter === 'active') {
		filteredTask = filteredTask.filter(task => task.status === TaskStatus.Active)
	}
	if (filter === 'completed') {
		filteredTask = filteredTask.filter(task => task.status === TaskStatus.Completed)
	}

	const tasksRender = filteredTask.map(task => <Task key={task.id} task={task} isDisabled={isDisabled} />)

	const filterValuesRender = filterValue.map((value, index) => {

		const onChangeTodolistFilterClick = () => {
			dispatch(changeTodolistFilter({ todolistId, value }))
		}

		return (
			<Button
				key={index}
				variant={filter === value ? 'outlined' : 'text'}
				color={'primary'}
				disabled={isDisabled}
				onClick={onChangeTodolistFilterClick}>
				{value}
			</Button>
		)
	})

	const handleChangeTodolistTitle = (newTitle: string) => {
		dispatch(changeTodolistTitle({ todolistId, title: newTitle }))
	}

	const onRemoveTodolistClick = () => {
		dispatch(removeTodolist(todolistId))
	}

	const handleAddTaskClick = (title: string) => {
		dispatch(addTask({ todolistId, title }))
	}

	useEffect(() => {
		dispatch(getTasks({ todolistId }))
	}, [])

	return (
		<Paper style={{ padding: '10px', position: 'relative' }}>
			<IconButton
				size={'small'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
				disabled={isDisabled}
				onClick={onRemoveTodolistClick}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableItem currentValue={title} changeCurrentValue={handleChangeTodolistTitle} isDisabled={isDisabled} />
			</h3>
			<AddItemForm addItem={handleAddTaskClick} isDisabled={isDisabled} />
			<div>
				{tasksRender}
				{!tasks[todolistId].length
					&& <div style={{ padding: '10px', color: 'grey', textAlign: 'center' }}>No task</div>}
			</div>
			<div style={{ paddingTop: '10px' }}>
				{filterValuesRender}
			</div>
		</Paper>
	)
}
