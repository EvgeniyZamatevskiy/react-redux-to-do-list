import React, { FC, useEffect } from "react"
import { TasksPropsType } from "./types"
import { AddItemForm, TasksFilter, TasksList } from "components"
import { addTask, getTasks } from "store/asyncActions"
import { useActiveTasks, useAppDispatch, useTasks } from "hooks"
import { useSelector } from "react-redux"
import { selectTasks } from "store/selectors"

export const Tasks: FC<TasksPropsType> = ({filter, toDoListId, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const tasks = useSelector(selectTasks(toDoListId))

  const filteredTasks = useTasks(tasks, filter)
  const activeTasks = useActiveTasks(tasks)

  const handleAddTaskClickOrKeyDown = (title: string): void => {
    dispatch(addTask({toDoListId, taskTitle: title}))
  }

  useEffect(() => {
    dispatch(getTasks(toDoListId))
  }, [])

  return (
    <div>
      <AddItemForm addItem={handleAddTaskClickOrKeyDown} isDisabled={isDisabledToDoList}/>
      <TasksList tasks={filteredTasks} isDisabledToDoList={isDisabledToDoList} activeTasks={activeTasks}/>
      <TasksFilter filter={filter} toDoListId={toDoListId} isDisabledToDoList={isDisabledToDoList}/>
    </div>
  )
}
