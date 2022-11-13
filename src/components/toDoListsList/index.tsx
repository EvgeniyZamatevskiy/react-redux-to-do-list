import React, { FC } from "react"
import { ToDoListListPropsType } from "./types"
import Grid from "@mui/material/Grid"
import { ToDoListItem } from "components"
import { useSelector } from "react-redux"
import { selectToDoLists } from "store/selectors"
import classes from "./ToDoListLists.module.css"

export const ToDoListsList: FC<ToDoListListPropsType> = () => {

  const toDoLists = useSelector(selectToDoLists)

  const toDoListsRender = toDoLists.map(({id, filter, isDisabledToDoList, title}) => {
    return (
      <Grid item key={id}>
        <div className={classes.container}>
          <ToDoListItem toDoListId={id} filter={filter} isDisabledToDoList={isDisabledToDoList} title={title}/>
        </div>
      </Grid>
    )
  })

  return (
    <Grid container spacing={3} sx={{flexWrap: "nowrap", overflowX: "scroll", padding: "10px"}}>
      {toDoListsRender}
    </Grid>
  )
}
