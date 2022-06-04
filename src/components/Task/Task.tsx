import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import { TaskStatus, TaskType } from '../../api/tasksAPI'
import { StatusType } from '../../redux/appReducer'
import { useTypedDispatch } from '../../redux/store'
import { removeTaskTC, updateTaskTC } from '../../redux/tasksReducer'
import { EditableSpan } from '../EditableSpan/EditableSpan'

type TaskPropsType = {
	task: TaskType
	disabledStatus: StatusType
}

export const Task: FC<TaskPropsType> = memo(({ task, disabledStatus }) => {

	const dispatch = useTypedDispatch()

	const removeTask = () => {
		dispatch(removeTaskTC(task.todoListId, task.id))
	}

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateTaskTC(task.todoListId, task.id, { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active }))
	}

	const changeTaskTitleHandler = useCallback((newTaskTitle: string) => {
		dispatch(updateTaskTC(task.todoListId, task.id, { title: newTaskTitle }))
	}, [task.todoListId, task.id, dispatch])

	return (
		<div>
			<Checkbox color='primary' checked={task.status === TaskStatus.Completed} onChange={changeHandler} />
			<EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
			<IconButton disabled={disabledStatus === 'loading'} onClick={removeTask}>
				<Delete />
			</IconButton>
		</div>
	)
})