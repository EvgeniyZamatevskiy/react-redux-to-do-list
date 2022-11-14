import React, { FC } from "react"
import { TaskItem } from "components"
import { TasksListPropsType } from "./types"
import { useSelector } from "react-redux"
import { selectTasks } from "store/selectors"
import { TaskStatus } from "enums"
import classes from "./index.module.css"

export const TasksList: FC<TasksListPropsType> = ({isDisabledToDoList, filter, toDoListId}) => {

  const tasks = useSelector(selectTasks(toDoListId))

  let filteredTasks = tasks
  if (filter === "active") {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.NEW)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatus.COMPLETED)
  }

  const tasksRender = filteredTasks.map(({todoListId, id, status, title, isDisabledTask}) => {
    return (
      <TaskItem
        key={id}
        toDoListId={todoListId}
        taskId={id}
        status={status}
        title={title}
        isDisabledTask={isDisabledTask}
        isDisabledToDoList={isDisabledToDoList}
      />
    )
  })

  if (!tasks.length) {
    return <div className={classes.noTask}>No task</div>
  }

  return (
    <div>
      {tasksRender}
    </div>
  )
}
