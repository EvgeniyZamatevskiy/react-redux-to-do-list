import React, { FC, useCallback } from "react"
import { TasksPropsType } from "./types"
import { AddItemForm, TasksFilter, TasksList } from "components"
import { useSelector } from "react-redux"
import { selectTasks } from "store/selectors"
import { TaskStatus } from "enums"
import { addTask } from "store/asyncActions"
import { useAppDispatch } from "hooks"
import classes from "./Tasks.module.css"

export const Tasks: FC<TasksPropsType> = ({filter, toDoListId, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const tasks = useSelector(selectTasks(toDoListId))

  const handleAddTaskClickOrKeyDown = useCallback((title: string): void => {
    dispatch(addTask({toDoListId, taskTitle: title}))
  }, [toDoListId])

  let filteredTasks = tasks
  if (filter === "active") {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.NEW)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.COMPLETED)
  }

  return (
    <div className={classes.filterValues}>
      <AddItemForm addItem={handleAddTaskClickOrKeyDown} isDisabledToDoList={isDisabledToDoList}/>
      <TasksList tasks={filteredTasks} isDisabledToDoList={isDisabledToDoList}/>
      <TasksFilter filter={filter} toDoListId={toDoListId} isDisabledToDoList={isDisabledToDoList}/>
    </div>
  )
}
