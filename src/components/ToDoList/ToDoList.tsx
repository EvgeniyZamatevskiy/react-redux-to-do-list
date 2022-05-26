import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getTasksTC, TaskStateType } from '../../redux/tasksReducer'
import { ToDoListSupplementedType } from '../../redux/toDoListsReducer'
import { Task } from '../Task/Task'

type ToDoListPropsType = {
	toDoList: ToDoListSupplementedType
}

export const ToDoList: FC<ToDoListPropsType> = ({ toDoList }) => {

	const dispatch = useDispatch()
	const tasks = useAppSelector<TaskStateType>(state => state.tasks.tasks)[toDoList.id]

	useEffect(() => {
		//@ts-ignore
		dispatch(getTasksTC(toDoList.id))
	}, [])

	return (
		<div>
			{tasks.map(t => <Task key={t.id} task={t} />)}
		</div>
	)
}