import React, { FC, memo, useCallback, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { AddItemForm } from '../common/AddItemForm'
import { EditableSpan } from '../common/EditableSpan'
import { Task } from '../Task'
import { TaskType, TaskStatus } from '../../api/tasks/types'
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch'
import { addTask, fetchTasks } from 'redux/tasks/slice'
import { removeTodolist, changeTodolistTitle } from 'redux/todolists/asyncActions'
import { changeTodolistFilter } from 'redux/todolists/slice'
import { ToDoListSupplementedType, FilterValuesType } from 'redux/todolists/types'

type TodolistPropsType = {
	todolist: ToDoListSupplementedType
	tasks: Array<TaskType>
}

export const Todolist: FC<TodolistPropsType> = memo(({ todolist, tasks }) => {
	const dispatch = useTypedDispatch()

	const FilterValues: FilterValuesType[] = ['all', 'active', 'completed']

	const removeTodolistHandler = () => {
		dispatch(removeTodolist(todolist.id))
	}

	const addTaskHandler = useCallback((title: string) => {
		dispatch(addTask({ todolistId: todolist.id, title: title }))
	}, [todolist.id])

	const changeTodolistTitleHandler = useCallback((newToDoListTitle: string) => {
		dispatch(changeTodolistTitle({ todolistId: todolist.id, newTodolistTitle: newToDoListTitle }))
	}, [todolist.id])

	useEffect(() => {
		dispatch(fetchTasks(todolist.id))
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
				onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableSpan currentValue={todolist.title} changeValue={changeTodolistTitleHandler} />
			</h3>
			<AddItemForm addItem={addTaskHandler} disabledStatus={todolist.entityStatus} />
			<div>
				{filteredTasks.map(t => <Task key={t.id} task={t} disabledStatus={todolist.entityStatus} />)}
				{!filteredTasks.length && <div style={{ padding: '10px', color: 'grey' }}>No task</div>}
			</div>
			<div style={{ paddingTop: '10px' }}>
				{FilterValues.map((filterValue, index) => {

					const onSelectFilterValueClick = () => dispatch(changeTodolistFilter({ id: todolist.id, filter: filterValue }))

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
