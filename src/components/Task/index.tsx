import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { EditableSpan } from '../common/EditableSpan'
import s from './Task.module.css'
import { TaskType, TaskStatus } from '../../api/tasks/types'
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch'
import { StatusType } from 'redux/app/types'
import { removeTask, updateTask } from 'redux/tasks/slice'

type TaskPropsType = {
	task: TaskType
	disabledStatus: StatusType
}

export const Task: FC<TaskPropsType> = memo(({ task, disabledStatus }) => {

	const dispatch = useTypedDispatch()

	const removeTaskHandler = () => {
		dispatch(removeTask({ todolistId: task.todoListId, taskId: task.id }))
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateTask({ todolistId: task.todoListId, taskId: task.id, model: { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active } }))
	}

	const changeTaskTitleHandler = useCallback((newTaskTitle: string) => {
		dispatch(updateTask({ todolistId: task.todoListId, taskId: task.id, model: { title: newTaskTitle } }))
	}, [task.todoListId, task.id])

	return (
		<div className={task.status === TaskStatus.Completed ? s.taskCompleted : ''} style={{ position: 'relative' }}>
			<Checkbox color='primary' checked={task.status === TaskStatus.Completed} onChange={onChangeHandler} />
			<EditableSpan currentValue={task.title} changeValue={changeTaskTitleHandler} />
			<IconButton size={'small'} disabled={disabledStatus === 'loading'} onClick={removeTaskHandler} style={{ position: 'absolute', top: '2px', right: '2px' }}>
				<Delete fontSize={'small'} />
			</IconButton>
		</div>
	)
})