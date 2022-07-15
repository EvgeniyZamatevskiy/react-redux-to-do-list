import React, { ChangeEvent, FC } from 'react'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { EditableItem } from '../common/EditableItem'
import { TaskPriority, TaskStatus } from 'api/tasks/types'
import { useAppDispatch } from 'redux/hooks'
import { removeTask, updateTask } from 'redux/tasks/asyncActions'
import s from './Task.module.css'

type TaskPropsType = {
	id: string
	priority: TaskPriority
	status: TaskStatus
	title: string
	todoListId: string
}

export const Task: FC<TaskPropsType> = ({ id, priority, status, title, todoListId }) => {

	const dispatch = useAppDispatch()

	const onRemoveTaskClick = () => {
		dispatch(removeTask({ todolistId: todoListId, taskId: id }))
	}

	const handleChangeTaskTitle = (newTitle: string) => {
		dispatch(updateTask({ todolistId: todoListId, taskId: id, domainPayload: { title: newTitle } }))
	}

	const onChangeTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active
		dispatch(updateTask({ todolistId: todoListId, taskId: id, domainPayload: { status: newStatus } }))
	}

	return (
		<div className={status === TaskStatus.Completed ? s.taskCompleted : ''} style={{ position: 'relative' }}>
			<Checkbox
				color='primary'
				checked={status === TaskStatus.Completed}
				onChange={onChangeTaskStatusChange}
			/>
			<EditableItem currentValue={title} changeCurrentValue={handleChangeTaskTitle} />
			<IconButton
				size={'small'}
				style={{ position: 'absolute', top: '2px', right: '2px' }}
				onClick={onRemoveTaskClick}
			>
				<Delete fontSize={'small'} />
			</IconButton>
		</div>
	)
}
