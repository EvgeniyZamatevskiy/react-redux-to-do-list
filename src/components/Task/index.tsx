import React, { ChangeEvent, FC, ReactElement, useCallback } from 'react'
import Delete from '@mui/icons-material/Delete'
import { Checkbox, IconButton } from '@mui/material'
import { TaskStatus, TaskType } from 'api/tasks/types'
import { useAppDispatch } from 'redux/hooks'
import { removeTask, updateTask } from 'redux/tasks/asyncActions'
import { EditableItem } from 'components/common'
import style from './Task.module.css'

type TaskPropsType = {
	task: TaskType
	isDisabled: boolean
}

export const Task: FC<TaskPropsType> = ({ task, isDisabled }): ReactElement => {

	const { id: taskId, status, title, todoListId: toDoListId } = task

	const dispatch = useAppDispatch()

	const onRemoveTaskClick = (): void => {
		dispatch(removeTask({ toDoListId, taskId }))
	}

	const handleChangeTaskTitle = useCallback((newTitle: string): void => {
		dispatch(updateTask({ toDoListId, taskId, domainPayload: { title: newTitle } }))
	}, [toDoListId, taskId])

	const onChangeTaskStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active
		dispatch(updateTask({ toDoListId, taskId, domainPayload: { status: newStatus } }))
	}

	return (
		<div className={style.task}>
			<div className={status === TaskStatus.Completed ? style.taskCompleted : ''}>
				<Checkbox
					color='primary'
					checked={status === TaskStatus.Completed}
					disabled={isDisabled}
					onChange={onChangeTaskStatusChange}
				/>
				<EditableItem currentValue={title} changeCurrentValue={handleChangeTaskTitle} isDisabled={isDisabled} />
			</div>
			<IconButton
				size={'small'}
				sx={{ position: 'absolute', top: '2px', right: '2px' }}
				disabled={isDisabled}
				onClick={onRemoveTaskClick}
			>
				<Delete fontSize={'small'} />
			</IconButton>
		</div>
	)
}
