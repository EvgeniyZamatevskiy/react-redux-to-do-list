import React, { FC } from "react"
import Grid from "@mui/material/Grid"
import { ToDoListItem } from "components"
import { ToDoListSupplementedType } from "store/slices/toDoLists/types"
import { ToDoListsListPropsType } from "./types"

export const ToDoListsList: FC<ToDoListsListPropsType> = ({toDoLists}) => {

  const sortToDoLists = (a: ToDoListSupplementedType, b: ToDoListSupplementedType): number => {
    return a.order > b.order ? 1 : -1
  }

  const toDoListsRender = toDoLists.sort(sortToDoLists).map(toDoList => {
    return <ToDoListItem key={toDoList.id} toDoList={toDoList}/>
  })

  return (
    <Grid container spacing={3} sx={{flexWrap: "nowrap", overflowX: "scroll", padding: "10px"}}>
      {toDoListsRender}
    </Grid>
  )
}
