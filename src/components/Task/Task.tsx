import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import React, { FC } from 'react'
import { TaskType } from '../../api/tasksAPI'
import { StatusType } from '../../redux/appReducer'
import { useTypedDispatch } from '../../redux/store'
import { removeTaskTC } from '../../redux/tasksReducer'

type TaskPropsType = {
	task: TaskType
	disabledStatus: StatusType
}

export const Task: FC<TaskPropsType> = ({ task, disabledStatus }) => {

	const dispatch = useTypedDispatch()

	const removeTask = () => {
		dispatch(removeTaskTC(task.todoListId, task.id))
	}

	return (
		<div>
			<Checkbox color='primary' />
			<span>{task.title}</span>
			<IconButton disabled={disabledStatus === 'loading'} onClick={removeTask}>
				<Delete />
			</IconButton>
		</div>
	)
}