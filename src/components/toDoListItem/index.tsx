import React, { FC, useState, DragEvent } from "react"
import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import DownloadIcon from "@mui/icons-material/Download"
import { useAppDispatch } from "hooks"
import { updateToDoListTitle, removeToDoList } from "store/asyncActions"
import { Confirm, EditableItem, File, MyModal, Tasks } from "components"
import { ToDoListItemPropsType } from "./types"
import { setCurrentToDoList, setSortedToDoLists, setToDoListFile } from "store/slices"
import classes from "./index.module.css"

export const ToDoListItem: FC<ToDoListItemPropsType> = ({toDoList}) => {

  const dispatch = useAppDispatch()

  const [isActivatedModal, setIsActivatedModal] = useState(false)
  const [sx, setSx] = useState(1)

  const handleUpdatePhotoChange = (file64: string): void => {
    dispatch(setToDoListFile({toDoListId: toDoList.id, file: file64}))
  }

  const handleUpdateToDoListTitleClickOrBlur = (updatedTitle: string): void => {
    dispatch(updateToDoListTitle({toDoListId: toDoList.id, toDoListTitle: updatedTitle}))
  }

  const onRemoveToDoListClick = (): void => {
    dispatch(removeToDoList(toDoList.id))
  }

  const onDeactivateModalClick = (): void => {
    setIsActivatedModal(false)
  }

  const onActivateModalClick = (): void => {
    setIsActivatedModal(true)
  }

  const onToDoListDragStart = (): void => {
    dispatch(setCurrentToDoList(toDoList))
  }

  const onToDoListDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setSx(1.05)
  }

  const onToDoListDragLeave = (): void => {
    setSx(1)
  }

  const onToDoListDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    dispatch(setSortedToDoLists({toDoListId: toDoList.id, toDoListOrder: toDoList.order}))
    setSx(1)
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
      <div
        className={classes.container}
        style={{cursor: "grab", transform: `scale(${sx})`, transition: "transform 0.1s ease-in-out 0s"}}
        draggable
        onDragStart={onToDoListDragStart}
        onDragOver={onToDoListDragOver}
        onDragLeave={onToDoListDragLeave}
        onDrop={onToDoListDrop}
      >
        <Paper sx={{position: "relative", padding: "10px"}}>
          <div className={classes.content}>
            <div className={classes.body}>
              <div className={classes.buttons}>
                <IconButton onClick={onActivateModalClick}>
                  <Delete fontSize={"small"}/>
                </IconButton>
                <File handleUpdatePhotoChange={handleUpdatePhotoChange}>
                  <DownloadIcon/>
                </File>
              </div>
              {toDoList.file && <img className={classes.fileImage} src={toDoList.file} alt="file"/>}
            </div>
            <div className={classes.titleContainer}>
              <EditableItem
                currentTitle={toDoList.title}
                updateValue={handleUpdateToDoListTitleClickOrBlur}
                isDisabled={toDoList.isDisabledToDoList}
              />
            </div>
          </div>
          <Tasks filter={toDoList.filter} toDoListId={toDoList.id} isDisabledToDoList={toDoList.isDisabledToDoList}/>
        </Paper>
      </div>
    </Grid>
  )
}
