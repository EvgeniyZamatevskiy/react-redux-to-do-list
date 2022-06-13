import React, { ChangeEvent, FC, memo, useCallback } from 'react'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { StatusType } from '../../redux/reducers/app-reducer/app-reducer'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { TaskStatus, TaskType } from '../../api/types'
import { tasksActionCreators } from '../../redux/reducers/tasks-reducer'
import { useActions } from '../../redux/hooks/useActions'
import s from './Task.module.css'

type TaskPropsType = {
	task: TaskType
	disabledStatus: StatusType
}

export const Task: FC<TaskPropsType> = memo(({ task, disabledStatus }) => {

	const { removeTaskTC, updateTaskTC } = useActions(tasksActionCreators)

	const removeTaskHandler = () => {
		removeTaskTC(task.todoListId, task.id)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		updateTaskTC(task.todoListId, task.id, { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active })
	}

	const changeTaskTitleHandler = useCallback((newTaskTitle: string) => {
		updateTaskTC(task.todoListId, task.id, { title: newTaskTitle })
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