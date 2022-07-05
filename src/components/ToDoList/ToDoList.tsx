import React, { FC, memo, useCallback, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { TodolistSupplementedType } from '../../redux/reducers/todolists-reducer/todolists-reducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Task } from '../Task/Task'
import { TaskStatus, TaskType } from '../../api/types'
import { tasksActionCreators } from '../../redux/reducers/tasks-reducer'
import { todolistsActionCreators } from '../../redux/reducers/todolists-reducer'
import { useActions } from '../../redux/hooks/useActions'
import { FilterValuesType } from '../../redux/reducers/todolists-reducer/actions'

type TodolistPropsType = {
	todolist: TodolistSupplementedType
	tasks: Array<TaskType>
}

export const Todolist: FC<TodolistPropsType> = memo(({ todolist, tasks }) => {

	const { removeTodolistTC, changeTodolistTitleTC, changeTodolistFilterAC } = useActions(todolistsActionCreators)
	const { getTasksTC, addTaskTC } = useActions(tasksActionCreators)

	const FilterValues: FilterValuesType[] = ['all', 'active', 'completed']

	const removeTodolistHandler = () => {
		removeTodolistTC(todolist.id)
	}

	const addTaskHandler = useCallback((title: string) => {
		addTaskTC(todolist.id, title)
	}, [todolist.id])

	const changeTodolistTitleHandler = useCallback((newToDoListTitle: string) => {
		changeTodolistTitleTC(todolist.id, newToDoListTitle)
	}, [todolist.id])

	useEffect(() => {
		getTasksTC(todolist.id)
	}, [])

	let filteredTasks = tasks
	if (todolist.filter === 'active') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Active)
	}
	if (todolist.filter === 'completed') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Completed)
	}

	return (
		<Paper style={{ padding: '10px', position: 'relative' }}>
			<IconButton
				size={'small'}
				onClick={removeTodolistHandler} disabled={todolist.disabledStatus === 'loading'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableSpan currentValue={todolist.title} changeValue={changeTodolistTitleHandler} />
			</h3>
			<AddItemForm addItem={addTaskHandler} disabledStatus={todolist.disabledStatus} />
			<div>
				{filteredTasks.map(t => <Task key={t.id} task={t} disabledStatus={todolist.disabledStatus} />)}
				{!filteredTasks.length && <div style={{ padding: '10px', color: 'grey' }}>No task</div>}
			</div>
			<div style={{ paddingTop: '10px' }}>
				{FilterValues.map((filterValue, index) => {

					const onSelectFilterValueClick = () => changeTodolistFilterAC(todolist.id, filterValue)

					return (
						<Button
							key={index}
							variant={todolist.filter === filterValue ? 'outlined' : 'text'}
							color={'primary'}
							onClick={onSelectFilterValueClick}
						>
							{filterValue}
						</Button>
					)
				})}
			</div>
		</Paper>
	)
})
