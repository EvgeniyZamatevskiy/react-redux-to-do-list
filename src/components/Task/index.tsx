import React, { ChangeEvent, FC } from 'react'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { EditableItem } from '../common/EditableItem'
import { TaskStatus, TaskType } from 'api/tasks/types'
import { useAppDispatch } from 'redux/hooks'
import { removeTask, updateTask } from 'redux/tasks/asyncActions'
import s from './Task.module.css'

type TaskPropsType = {
	task: TaskType
	isDisabled: boolean
}

export const Task: FC<TaskPropsType> = ({ task, isDisabled }) => {

	const { id: taskId, status, title, todoListId } = task

	const dispatch = useAppDispatch()

	const onRemoveTaskClick = () => {
		dispatch(removeTask({ todolistId: todoListId, taskId }))
	}

	const handleChangeTaskTitle = (newTitle: string) => {
		dispatch(updateTask({ todolistId: todoListId, taskId, domainPayload: { title: newTitle } }))
	}

	const onChangeTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active
		dispatch(updateTask({ todolistId: todoListId, taskId, domainPayload: { status: newStatus } }))
	}

	return (
		<div className={status === TaskStatus.Completed ? s.taskCompleted : ''} style={{ position: 'relative' }}>
			<Checkbox
				color='primary'
				checked={status === TaskStatus.Completed}
				disabled={isDisabled}
				onChange={onChangeTaskStatusChange}
			/>
			<EditableItem currentValue={title} changeCurrentValue={handleChangeTaskTitle} isDisabled={isDisabled} />
			<IconButton
				size={'small'}
				style={{ position: 'absolute', top: '2px', right: '2px' }}
				disabled={isDisabled}
				onClick={onRemoveTaskClick}
			>
				<Delete fontSize={'small'} />
			</IconButton>
		</div>
	)
}
