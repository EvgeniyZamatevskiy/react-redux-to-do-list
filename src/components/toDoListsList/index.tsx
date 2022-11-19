import React, { FC } from "react"
import Grid from "@mui/material/Grid"
import { ToDoListItem } from "components"
import { useSelector } from "react-redux"
import { selectToDoLists } from "store/selectors"
import { useSearchedToDoLists } from "hooks"
import { ToDoListSupplementedType } from "store/slices/toDoLists/types"

export const ToDoListsList: FC = () => {

  const toDoLists = useSelector(selectToDoLists)

  const searchedToDoLists = useSearchedToDoLists(toDoLists)

  const sortToDoLists = (a: ToDoListSupplementedType, b: ToDoListSupplementedType): number => {
    return a.order > b.order ? 1 : -1
  }

  const toDoListsRender = searchedToDoLists.sort(sortToDoLists).map(toDoList => {
    return <ToDoListItem key={toDoList.id} toDoList={toDoList}/>
  })

  return (
    <Grid container spacing={3} sx={{flexWrap: "nowrap", overflowX: "scroll", padding: "10px"}}>
      {toDoListsRender}
    </Grid>
  )
}
