import React, { FC } from "react"
import { TaskItem } from "components"
import { TasksListPropsType } from "./types"
import classes from "./TasksList.module.css"

export const TasksList: FC<TasksListPropsType> = ({tasks, filter, toDoListId, isDisabled}) => {

  const tasksRender = tasks.map(({todoListId, id, status, title}) => {
    return (
      <TaskItem key={id} toDoListId={todoListId} taskId={id} status={status} title={title} isDisabled={isDisabled}/>
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
