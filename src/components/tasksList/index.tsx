import React, { FC } from "react"
import { TaskItem } from "components"
import { TasksListPropsType } from "./types"
import { useSelector } from "react-redux"
import { selectTasks } from "store/selectors"
import { useTasks } from "hooks"
import classes from "./index.module.css"

export const TasksList: FC<TasksListPropsType> = ({isDisabledToDoList, filter, toDoListId}) => {

  const tasks = useSelector(selectTasks(toDoListId))

  const filteredTasks = useTasks(tasks, filter)

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
