import React, { FC } from "react"
import { TasksFilterPropsType } from "./types"
import Button from "@mui/material/Button"
import { useActiveTasks, useAppDispatch } from "hooks"
import { changeToDoListFilter } from "store/slices"
import { FilterValueType } from "store/slices/toDoLists/types"
import classes from "./index.module.css"

const filterValues = ["all", "active", "completed"]

export const TasksFilter: FC<TasksFilterPropsType> = ({tasks, toDoListId, filter, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const activeTasks = useActiveTasks(tasks)

  const filterValuesRender = filterValues.map(filterValue => {

    const onChangeToDoListFilterValueClick = (): void => {
      dispatch(changeToDoListFilter({toDoListId, filterValue: filterValue as FilterValueType}))
    }

    return (
      <Button
        key={filterValue}
        variant={filter === filterValue ? "outlined" : "text"}
        color={"primary"}
        onClick={onChangeToDoListFilterValueClick}
        disabled={isDisabledToDoList}
      >
        {filterValue}
      </Button>
    )
  })

  return (
    <div>
      {filterValuesRender}
      <div className={classes.activeTasks}>{activeTasks} active tasks</div>
    </div>
  )
}
