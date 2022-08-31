import React, { ChangeEvent, FC, memo, ReactElement, useCallback } from 'react'
import Delete from '@mui/icons-material/Delete'
import { Checkbox, IconButton } from '@mui/material'
import { TaskStatus } from 'api/tasks/types'
import { useAppDispatch } from 'hooks'
import { removeTask, updateTask } from 'store/asyncActions'
import { EMPTY_STRING } from 'constants/base'
import { EditableItem } from 'components/common'
import { TaskPropsType } from './types'
import style from './Task.module.css'

export const Task: FC<TaskPropsType> = memo(({ toDoListId, taskId, status, title, isDisabled }): ReactElement => {

	const dispatch = useAppDispatch()

	const onRemoveTaskClick = (): void => {
		dispatch(removeTask({ toDoListId, taskId }))
	}

	const handleChangeTaskTitleClickAndBlur = useCallback((updatedTitle: string): void => {
		dispatch(updateTask({ toDoListId, taskId, domainPayload: { title: updatedTitle } }))
	}, [toDoListId, taskId])

	const onUpdateTaskStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const updatedStatus = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.Active
		dispatch(updateTask({ toDoListId, taskId, domainPayload: { status: updatedStatus } }))
	}

	return (
		<div className={style.task}>
			<div className={status === TaskStatus.Completed ? style.taskCompleted : EMPTY_STRING}>
				<Checkbox
					color='primary'
					checked={status === TaskStatus.Completed}
					disabled={isDisabled}
					onChange={onUpdateTaskStatusChange}
				/>
				<EditableItem currentValue={title} updateValue={handleChangeTaskTitleClickAndBlur} isDisabled={isDisabled} />
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
})
