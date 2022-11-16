import React, { FC } from "react"
import Grid from "@mui/material/Grid"
import { ToDoListItem } from "components"
import { useSelector } from "react-redux"
import { selectToDoLists } from "store/selectors"
import { useToDoLists } from "hooks"

export const ToDoListsList: FC = () => {

  const toDoLists = useSelector(selectToDoLists)

  const filteredToDoLists = useToDoLists(toDoLists)

  const toDoListsRender = filteredToDoLists.map(({id, filter, isDisabledToDoList, title}) => {
    return (
      <ToDoListItem key={id} toDoListId={id} filter={filter} isDisabledToDoList={isDisabledToDoList} title={title}/>
    )
  })

  return (
    <Grid container spacing={3} sx={{flexWrap: "nowrap", overflowX: "scroll", padding: "10px"}}>
      {toDoListsRender}
    </Grid>
  )
}
