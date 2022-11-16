import React, { FC, useState } from "react"
import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useAppDispatch } from "hooks"
import { updateToDoListTitle, removeToDoList } from "store/asyncActions"
import { Confirm, EditableItem, MyModal, Tasks } from "components"
import { ToDoListItemPropsType } from "./types"
import Grid from "@mui/material/Grid/Grid"
import classes from "./index.module.css"

export const ToDoListItem: FC<ToDoListItemPropsType> = ({toDoListId, filter, isDisabledToDoList, title}) => {

  const dispatch = useAppDispatch()

  const [isActivatedModal, setIsActivatedModal] = useState(false)

  const handleUpdateToDoListTitleClickOrBlur = (updatedTitle: string): void => {
    dispatch(updateToDoListTitle({toDoListId, toDoListTitle: updatedTitle}))
  }

  const onRemoveToDoListClick = (): void => {
    dispatch(removeToDoList(toDoListId))
  }

  const onDeactivateModalClick = (): void => {
    setIsActivatedModal(false)
  }

  const onActivateModalClick = (): void => {
    setIsActivatedModal(true)
  }

  return (
    <Grid item>
      <MyModal isActivatedModal={isActivatedModal} onDeactivateModalClick={onDeactivateModalClick}>
        <Confirm
          title={"Do you Want to delete this to do list?"}
          isActivatedModal={isActivatedModal}
          firstCallback={onDeactivateModalClick}
          secondCallback={onRemoveToDoListClick}
          firstValue={"No"}
          secondValue={"Yes"}
        />
      </MyModal>
      <div className={classes.container}>
        <Paper sx={{position: "relative", padding: "10px"}}>
          <IconButton
            size={"small"}
            sx={{position: "absolute", right: "5px", top: "5px"}}
            disabled={isDisabledToDoList}
            onClick={onActivateModalClick}
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
