import React, { FC, ReactElement, useCallback, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import { Button, IconButton, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/hooks'
import { addTask, getTasks } from 'redux/tasks/asyncActions'
import { FilterValuesType, ToDoListSupplementedType } from 'redux/toDoLists/types'
import { selectTasks } from 'redux/tasks/selectors'
import { TaskStatus } from 'api/tasks/types'
import { changeToDoListTitle, removeToDoList } from 'redux/toDoLists/asyncActions'
import { changeToDoListFilter } from 'redux/toDoLists/slice'
import { Task } from 'components/Task'
import { EditableItem, AddItemForm } from 'components/common'
import style from './ToDoList.module.css'

type ToDoListPropsType = {
	toDoList: ToDoListSupplementedType
}

const filterValues: FilterValuesType[] = ['all', 'active', 'completed']

export const ToDoList: FC<ToDoListPropsType> = ({ toDoList }): ReactElement => {

	const { isDisabled, filter, id: toDoListId, title } = toDoList

	const dispatch = useAppDispatch()

	const tasks = useSelector(selectTasks)

	let filteredTask = tasks[toDoListId]
	if (filter === 'active') {
		filteredTask = filteredTask.filter(task => task.status === TaskStatus.Active)
	}
	if (filter === 'completed') {
		filteredTask = filteredTask.filter(task => task.status === TaskStatus.Completed)
	}

	const tasksRender = filteredTask.map(task => <Task key={task.id} task={task} isDisabled={isDisabled} />)

	const filterValuesRender = filterValues.map((value, index) => {

		const onChangeToDoListFilterClick = (): void => {
			dispatch(changeToDoListFilter({ toDoListId, value }))
		}

		return (
			<Button
				key={index}
				variant={filter === value ? 'outlined' : 'text'}
				color={'primary'}
				disabled={isDisabled}
				onClick={onChangeToDoListFilterClick}>
				{value}
			</Button>
		)
	})

	const handleChangeToDoListTitle = useCallback((newTitle: string): void => {
		dispatch(changeToDoListTitle({ toDoListId, title: newTitle }))
	}, [toDoListId])

	const onRemoveToDoListClick = (): void => {
		dispatch(removeToDoList(toDoListId))
	}

	const handleAddTaskClick = useCallback((title: string): void => {
		dispatch(addTask({ toDoListId, title }))
	}, [toDoListId])

	useEffect(() => {
		dispatch(getTasks({ toDoListId }))
	}, [])

	return (
		<Paper sx={{ position: 'relative', padding: '10px' }}>
			<IconButton
				size={'small'}
				sx={{ position: 'absolute', right: '5px', top: '5px' }}
				disabled={isDisabled}
				onClick={onRemoveToDoListClick}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableItem currentValue={title} changeCurrentValue={handleChangeToDoListTitle} isDisabled={isDisabled} />
			</h3>
			<AddItemForm addItem={handleAddTaskClick} isDisabled={isDisabled} />
			<div>
				{tasksRender}
				{!tasks[toDoListId].length
					&& <div className={style.noTask}>No task</div>}
			</div>
			<div className={style.filterValues}>
				{filterValuesRender}
			</div>
		</Paper>
	)
}
