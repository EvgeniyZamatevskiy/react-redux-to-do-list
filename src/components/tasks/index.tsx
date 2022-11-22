import React, { FC, useEffect } from "react"
import { TasksPropsType } from "./types"
import { AddItemForm, TasksFilter, TasksList } from "components"
import { addTask, getTasks } from "store/asyncActions"
import { useAppDispatch, useTasks } from "hooks"
import { useSelector } from "react-redux"
import { selectTasks } from "store/selectors"
import classes from "./index.module.css"

export const Tasks: FC<TasksPropsType> = ({filter, toDoListId, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const tasks = useSelector(selectTasks(toDoListId))

  const filteredTasks = useTasks(tasks, filter)

  const handleAddTaskClickOrKeyDown = (title: string): void => {
    dispatch(addTask({toDoListId, taskTitle: title}))
  }

  useEffect(() => {
    dispatch(getTasks(toDoListId))
  }, [])

  return (
    <div className={classes.filterValues}>
      <AddItemForm addItem={handleAddTaskClickOrKeyDown} isDisabled={isDisabledToDoList}/>
      <TasksList tasks={filteredTasks} filter={filter} toDoListId={toDoListId} isDisabledToDoList={isDisabledToDoList}/>
      <TasksFilter
        tasks={filteredTasks}
        filter={filter}
        toDoListId={toDoListId}
        isDisabledToDoList={isDisabledToDoList}
      />
    </div>
  )
}
