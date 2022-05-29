import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { TaskStatus } from '../../api/tasksAPI'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { addTaskTC, getTasksTC, TaskStateType } from '../../redux/tasksReducer'
import { changeToDoListTitleTC, FilterValuesType, removeToDoListTC, changeToDoListFilterAC, ToDoListSupplementedType } from '../../redux/toDoListsReducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
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

	const removeToDoList = () => {
		dispatch(removeToDoListTC(toDoList.id))
	}

	const addTask = (title: string) => {
		dispatch(addTaskTC(toDoList.id, title))
	}

	const changeToDoListTitle = (newToDoListTitle: string) => {
		dispatch(changeToDoListTitleTC(toDoList.id, newToDoListTitle))
	}

	const filteredTasksHandler = (value: FilterValuesType) => {
		dispatch(changeToDoListFilterAC(toDoList.id, value))
	}

	let filteredTasks = tasks
	if (toDoList.filter === 'active') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Active)
	}
	if (toDoList.filter === 'completed') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Completed)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={toDoList.title} onChange={changeToDoListTitle} />
				<IconButton onClick={removeToDoList} disabled={toDoList.disabledStatus === 'loading'}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} disabledStatus={toDoList.disabledStatus} />
			<div>
				{filteredTasks.map(t => <Task key={t.id} disabledStatus={toDoList.disabledStatus} task={t} />)}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button
					onClick={() => filteredTasksHandler('all')} variant={toDoList.filter === 'all' ? 'outlined' : 'text'} color={'primary'}>All</Button>
				<Button
					onClick={() => filteredTasksHandler('active')} variant={toDoList.filter === 'active' ? 'outlined' : 'text'} color={'primary'}>Active</Button>
				<Button
					onClick={() => filteredTasksHandler('completed')} variant={toDoList.filter === 'completed' ? 'outlined' : 'text'} color={'primary'}>Completed</Button>
			</div>
		</div>
	)
}