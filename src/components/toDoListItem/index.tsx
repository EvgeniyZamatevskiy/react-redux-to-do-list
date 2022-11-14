import React, { FC } from "react"
import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useAppDispatch } from "hooks"
import { updateToDoListTitle, removeToDoList } from "store/asyncActions"
import { EditableItem, Tasks } from "components"
import { ToDoListItemPropsType } from "./types"
import Grid from "@mui/material/Grid/Grid"
import classes from "./index.module.css"

export const ToDoListItem: FC<ToDoListItemPropsType> = ({toDoListId, filter, isDisabledToDoList, title}) => {

  const dispatch = useAppDispatch()

  const handleUpdateToDoListTitleClickOrBlur = (updatedTitle: string): void => {
    dispatch(updateToDoListTitle({toDoListId, toDoListTitle: updatedTitle}))
  }

  const onRemoveToDoListClick = (): void => {
    dispatch(removeToDoList(toDoListId))
  }

  return (
    <Grid item>
      <div className={classes.container}>
        <Paper sx={{position: "relative", padding: "10px"}}>
          <IconButton
            size={"small"}
            sx={{position: "absolute", right: "5px", top: "5px"}}
            disabled={isDisabledToDoList}
            onClick={onRemoveToDoListClick}
          >
            <Delete fontSize={"small"}/>
          </IconButton>
          <h3>
            <EditableItem
              currentTitle={title}
              updateValue={handleUpdateToDoListTitleClickOrBlur}
              isDisabled={isDisabledToDoList}
            />
          </h3>
          <Tasks filter={filter} toDoListId={toDoListId} isDisabledToDoList={isDisabledToDoList}/>
        </Paper>
      </div>
    </Grid>
  )
}
