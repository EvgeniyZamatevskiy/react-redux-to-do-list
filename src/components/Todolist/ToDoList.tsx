import React, { FC, memo, ReactElement, useCallback, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import { IconButton, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'hooks'
import { FilterValue } from 'enums'
import { TaskStatus } from 'api/tasks/types'
import { EditableItem, AddItemForm } from 'components/common'
import { changeToDoListTitle, removeToDoList, addTask, getTasks } from 'store/asyncActions'
import { selectTasks } from 'store/selectors'
import { Task } from './task'
import { Filter } from 'components/filter'
import { ToDoListPropsType } from './types'
import style from './ToDoList.module.css'

const filterValues: FilterValue[] = [FilterValue.ALL, FilterValue.ACTIVE, FilterValue.COMPLETED]

export const ToDoList: FC<ToDoListPropsType> = memo(({ toDoListId, filter, isDisabled, title }): ReactElement => {

	const dispatch = useAppDispatch()

	const tasks = useSelector(selectTasks(toDoListId))

	let filteredTasks = tasks
	if (filter === FilterValue.ACTIVE) {
		filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.Active)
	}
	if (filter === FilterValue.COMPLETED) {
		filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.Completed)
	}

	const filteredTasksRender = filteredTasks.map(({ todoListId, id, status, title }) => {
		return <Task key={id} toDoListId={todoListId} taskId={id} status={status} title={title} isDisabled={isDisabled} />
	})
	const filterValuesRender = filterValues.map((value, index) => {
		return <Filter key={index} currentValue={value} isDisabled={isDisabled} toDoListId={toDoListId} filterValue={filter} />
	})

	useEffect(() => {
		dispatch(getTasks(toDoListId))
	}, [])

	const handleChangeToDoListTitleClickAndBlur = useCallback((updatedTitle: string): void => {
		dispatch(changeToDoListTitle({ toDoListId, title: updatedTitle }))
	}, [toDoListId])

	const onRemoveToDoListClick = (): void => {
		dispatch(removeToDoList(toDoListId))
	}

	const handleAddTaskClickAndKeyDown = useCallback((title: string): void => {
		dispatch(addTask({ toDoListId, title }))
	}, [toDoListId])

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
				<EditableItem currentValue={title} updateValue={handleChangeToDoListTitleClickAndBlur} isDisabled={isDisabled} />
			</h3>
			<AddItemForm addItem={handleAddTaskClickAndKeyDown} isDisabled={isDisabled} />
			<div>
				{filteredTasksRender}
				{!tasks.length && <div className={style.noTask}>No task</div>}
			</div>
			<div className={style.filterValues}>
				{filterValuesRender}
			</div>
		</Paper>
	)
})
