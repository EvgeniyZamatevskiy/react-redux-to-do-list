import React, { FC } from "react"
import { TaskItem } from "components"
import { TasksListPropsType } from "./types"
import classes from "./index.module.css"

export const TasksList: FC<TasksListPropsType> = ({tasks, isDisabledToDoList, filter, toDoListId}) => {

  const tasksRender = tasks.map(({todoListId, id, status, title, isDisabledTask}) => {
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
