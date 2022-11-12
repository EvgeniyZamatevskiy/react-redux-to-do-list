import React, { ChangeEvent, FC, memo, useCallback } from "react"
import Delete from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import { useAppDispatch } from "hooks"
import { removeTask, updateTask } from "store/asyncActions"
import { EMPTY_STRING } from "constants/base"
import { EditableItem } from "components"
import { TaskPropsType } from "./types"
import { TaskStatus } from "enums"
import classes from "./TaskItem.module.css"

export const TaskItem: FC<TaskPropsType> = memo(({toDoListId, taskId, status, title, isDisabled}) => {

  const dispatch = useAppDispatch()

  const onRemoveTaskClick = (): void => {
    dispatch(removeTask({toDoListId, taskId}))
  }

  const handleChangeTaskTitleClickOrBlur = useCallback((updatedTitle: string): void => {
    dispatch(updateTask({toDoListId, taskId, domainPayload: {title: updatedTitle}}))
  }, [toDoListId, taskId])

  const onUpdateTaskStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const updatedStatus = event.currentTarget.checked ? TaskStatus.COMPLETED : TaskStatus.NEW
    dispatch(updateTask({toDoListId, taskId, domainPayload: {status: updatedStatus}}))
  }

  return (
    <div className={classes.task}>
      <div className={status === TaskStatus.COMPLETED ? classes.taskCompleted : EMPTY_STRING}>
        <Checkbox
          color="primary"
          checked={status === TaskStatus.COMPLETED}
          disabled={isDisabled}
          onChange={onUpdateTaskStatusChange}
        />
        <EditableItem currentTitle={title} updateValue={handleChangeTaskTitleClickOrBlur} isDisabled={isDisabled}/>
      </div>
      <IconButton
        size={"small"}
        sx={{position: "absolute", top: "2px", right: "2px"}}
        disabled={isDisabled}
        onClick={onRemoveTaskClick}
      >
        <Delete fontSize={"small"}/>
      </IconButton>
    </div>
  )
})
