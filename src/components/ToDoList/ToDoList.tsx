import React, { FC, memo, useCallback, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { TodolistSupplementedType } from '../../redux/reducers/todolists-reducer/todolists-reducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Task } from '../Task/Task'
import { TaskStatus, TaskType } from '../../api/types'
import { tasksActionCreators } from '../../redux/reducers/tasks-reducer'
import { todolistsActionCreators } from '../../redux/reducers/todolists-reducer'
import { useActions } from '../../redux/hooks/useActions'

type TodolistPropsType = {
	todolist: TodolistSupplementedType
	tasks: Array<TaskType>
}

export const Todolist: FC<TodolistPropsType> = memo(({ todolist, tasks }) => {

	const { removeTodolistTC, changeTodolistTitleTC, changeTodolistFilterAC } = useActions(todolistsActionCreators)
	const { getTasksTC, addTaskTC } = useActions(tasksActionCreators)

	useEffect(() => {
		getTasksTC(todolist.id)
	}, [])

	const removeTodolistHandler = () => {
		removeTodolistTC(todolist.id)
	}

	const addTaskHandler = useCallback((title: string) => {
		addTaskTC(todolist.id, title)
	}, [todolist.id])

	const changeTodolistTitleHandler = useCallback((newToDoListTitle: string) => {
		changeTodolistTitleTC(todolist.id, newToDoListTitle)
	}, [todolist.id])

	const onClickAllHandler = () => {
		changeTodolistFilterAC(todolist.id, 'all')
	}

	const onClickActiveHandler = () => {
		changeTodolistFilterAC(todolist.id, 'active')
	}

	const onClickCompletedHandler = () => {
		changeTodolistFilterAC(todolist.id, 'completed')
	}

	let filteredTasks = tasks
	if (todolist.filter === 'active') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Active)
	}
	if (todolist.filter === 'completed') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Completed)
	}

	return (
		<Paper style={{ padding: '10px', position: 'relative' }}>
			<IconButton
				size={'small'}
				onClick={removeTodolistHandler} disabled={todolist.disabledStatus === 'loading'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableSpan currentValue={todolist.title} changeValue={changeTodolistTitleHandler} />
			</h3>
			<AddItemForm addItem={addTaskHandler} disabledStatus={todolist.disabledStatus} />
			<div>
				{filteredTasks.map(t => <Task key={t.id} task={t} disabledStatus={todolist.disabledStatus} />)}
				{!filteredTasks.length && <div style={{ padding: '10px', color: 'grey' }}>No task</div>}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button onClick={onClickAllHandler} variant={todolist.filter === 'all' ? 'outlined' : 'text'} color={'primary'}>All</Button>
				<Button onClick={onClickActiveHandler} variant={todolist.filter === 'active' ? 'outlined' : 'text'} color={'primary'}>Active</Button>
				<Button onClick={onClickCompletedHandler} variant={todolist.filter === 'completed' ? 'outlined' : 'text'} color={'primary'}>Completed</Button>
			</div>
		</Paper>
	)
})