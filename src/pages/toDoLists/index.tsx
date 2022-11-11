import React, { FC, useCallback, useEffect } from "react"
import Grid from "@mui/material/Grid"
import { useAppDispatch } from "hooks"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { AddItemForm, ToDoListsList } from "components"
import { addToDoList, getToDoLists } from "store/asyncActions"
import { selectIsAuth } from "store/selectors"
import { Path } from "enums"
import classes from "./ToDoLists.module.css"

export const ToDoLists: FC = () => {

  const dispatch = useAppDispatch()

  const isAuth = useSelector(selectIsAuth)

  const handleAddToDoListClickOrKeyDown = useCallback((title: string): void => {
    dispatch(addToDoList(title))
  }, [])

  useEffect(() => {
    if (isAuth) {
      dispatch(getToDoLists())
    }
  }, [])

  if (!isAuth) {
    return <Navigate to={Path.LOGIN}/>
  }

  return (
    <>
      <Grid container className={classes.content}>
        <AddItemForm addItem={handleAddToDoListClickOrKeyDown}/>
      </Grid>
      <ToDoListsList/>
    </>
  )
}
