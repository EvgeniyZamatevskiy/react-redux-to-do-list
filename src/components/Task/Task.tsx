import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import React, { FC } from 'react'
import { TaskType } from '../../api/tasksAPI'

type TaskPropsType = {
	task: TaskType
}

export const Task: FC<TaskPropsType> = ({ task }) => {
	return (
		<div>
			<Checkbox color='primary' />
			<span>{task.title}</span>
			<IconButton>
				<Delete />
			</IconButton>
		</div>
	)
}