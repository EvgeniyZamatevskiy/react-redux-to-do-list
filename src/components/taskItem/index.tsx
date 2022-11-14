import React, { ChangeEvent, FC } from "react"
import Delete from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import { useAppDispatch } from "hooks"
import { removeTask, updateTask } from "store/asyncActions"
import { EMPTY_STRING } from "constants/base"
import { EditableItem } from "components"
import { TaskPropsType } from "./types"
import { TaskStatus } from "enums"
import classes from "./index.module.css"

export const TaskItem: FC<TaskPropsType> =
  ({
     toDoListId,
     taskId,
     status,
     title,
     isDisabledToDoList,
     isDisabledTask
   }) => {

    const dispatch = useAppDispatch()

    const isDisabled = isDisabledToDoList || isDisabledTask

    const onRemoveTaskClick = (): void => {
      dispatch(removeTask({toDoListId, taskId}))
    }

    const handleChangeTaskTitleClickOrBlur = (updatedTitle: string): void => {
      dispatch(updateTask({toDoListId, taskId, domainPayload: {title: updatedTitle}}))
    }

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
            onChange={onUpdateTaskStatusChange}
            disabled={isDisabled}
          />
          <EditableItem
            currentTitle={title}
            updateValue={handleChangeTaskTitleClickOrBlur}
            isDisabled={isDisabled}
          />
        </div>
        <IconButton
          size={"small"}
          sx={{position: "absolute", top: "2px", right: "2px"}}
          onClick={onRemoveTaskClick}
          disabled={isDisabled}
        >
          <Delete fontSize={"small"}/>
        </IconButton>
      </div>
    )
  }
