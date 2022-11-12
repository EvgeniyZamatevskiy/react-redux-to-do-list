import React, { FC, useCallback } from "react"
import { TasksPropsType } from "./types"
import { AddItemForm, TasksFilter, TasksList } from "components"
import { useSelector } from "react-redux"
import { selectTasks } from "store/selectors"
import { FilterValue } from "enums"
import { TaskStatus } from "enums"
import { addTask } from "store/asyncActions"
import { useAppDispatch } from "hooks"
import classes from "./Tasks.module.css"

export const Tasks: FC<TasksPropsType> = ({filter, toDoListId, isDisabled}) => {

  const dispatch = useAppDispatch()

  const tasks = useSelector(selectTasks(toDoListId))

  const handleAddTaskClickOrKeyDown = useCallback((title: string): void => {
    dispatch(addTask({toDoListId, title}))
  }, [toDoListId])

  let filteredTasks = tasks
  if (filter === FilterValue.ACTIVE) {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.NEW)
  }
  if (filter === FilterValue.COMPLETED) {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.COMPLETED)
  }

  return (
    <div className={classes.filterValues}>
      <AddItemForm addItem={handleAddTaskClickOrKeyDown} isDisabled={isDisabled}/>
      <TasksList
        tasks={filteredTasks}
        filter={filter}
        toDoListId={toDoListId}
        isDisabled={isDisabled}
      />
      <TasksFilter filter={filter} toDoListId={toDoListId} isDisabled={isDisabled}/>
    </div>
  )
}
