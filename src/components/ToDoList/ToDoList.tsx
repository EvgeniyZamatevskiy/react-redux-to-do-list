import { AddBox, Delete } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../redux/store'
import { addTaskTC, getTasksTC, TaskStateType } from '../../redux/tasksReducer'
import { changeToDoListTitleTC, removeToDoListTC, ToDoListSupplementedType } from '../../redux/toDoListsReducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpanю'
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

	const changeToDoListTitle = (toDoListTitle: string) => {
		dispatch(changeToDoListTitleTC(toDoList.id, toDoListTitle))
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
				{tasks.map(t => <Task key={t.id} disabledStatus={toDoList.disabledStatus} task={t} />)}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button variant={'text'} color={'primary'}>All</Button>
				<Button variant={'text'} color={'primary'}>Active</Button>
				<Button variant={'text'} color={'primary'}>Completed</Button>
			</div>
		</div>
	)
}