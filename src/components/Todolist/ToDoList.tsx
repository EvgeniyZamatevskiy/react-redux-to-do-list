import React, { FC, memo, ReactElement, useCallback, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import { Button, IconButton, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { addTask, getTasks } from 'store/asyncActions/tasks'
import { selectTasks } from 'store/selectors/tasks'
import { TaskStatus } from 'api/tasks/types'
import { changeToDoListTitle, removeToDoList } from 'store/asyncActions/toDoLists'
import { changeToDoListFilter } from 'store/slices/toDoLists'
import { EditableItem, AddItemForm } from 'components/common'
import { Task } from 'components/toDoList/task/Task'
import { FilterValue } from 'enums/FilterValue'
import style from './ToDoList.module.css'

type ToDoListPropsType = {
	toDoListId: string,
	filter: FilterValue,
	isDisabled: boolean,
	title: string
}

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

		const onChangeToDoListFilterValueClick = (): void => {
			dispatch(changeToDoListFilter({ toDoListId, value }))
		}

		return (
			<Button
				key={index}
				variant={filter === value ? 'outlined' : 'text'}
				color={'primary'}
				disabled={isDisabled}
				onClick={onChangeToDoListFilterValueClick}>
				{value}
			</Button>
		)
	})

	const handleChangeToDoListTitleClickAndBlur = useCallback((newTitle: string): void => {
		dispatch(changeToDoListTitle({ toDoListId, title: newTitle }))
	}, [toDoListId])

	const onRemoveToDoListClick = (): void => {
		dispatch(removeToDoList(toDoListId))
	}

	const handleAddTaskClickAndKeyDown = useCallback((title: string): void => {
		dispatch(addTask({ toDoListId, title }))
	}, [toDoListId])

	useEffect(() => {
		dispatch(getTasks(toDoListId))
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
				<EditableItem currentValue={title} changeCurrentValue={handleChangeToDoListTitleClickAndBlur} isDisabled={isDisabled} />
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
