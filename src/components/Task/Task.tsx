import React, { FC } from 'react'
import { TaskType } from '../../api/tasksAPI'

type TaskPropsType = {
	task: TaskType
}

export const Task: FC<TaskPropsType> = ({ task }) => {
	return (
		<div>

		</div>
	)
}