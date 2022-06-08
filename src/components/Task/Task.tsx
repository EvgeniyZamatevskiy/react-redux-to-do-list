import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
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
		<div className={task.status === TaskStatus.Completed ? 'taskCompleted' : ''} style={{ position: 'relative' }}>
			<Checkbox color='primary' checked={task.status === TaskStatus.Completed} onChange={changeHandler} />
			<EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
			<IconButton size={'small'} disabled={disabledStatus === 'loading'} onClick={removeTask} style={{ position: 'absolute', top: '2px', right: '2px' }}>
				<Delete fontSize={'small'} />
			</IconButton>
		</div>
	)
})