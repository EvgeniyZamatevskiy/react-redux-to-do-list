import React, { FC } from "react"
import { TasksFilterPropsType } from "./types"
import Button from "@mui/material/Button"
import { useAppDispatch } from "hooks"
import { changeToDoListFilter } from "store/slices"
import { FilterValueType } from "store/slices/toDoLists/types"

const filterValues = ["all", "active", "completed"]

export const TasksFilter: FC<TasksFilterPropsType> = ({toDoListId, filter, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const filterValuesRender = filterValues.map(filterValue => {

    const onChangeToDoListFilterValueClick = (): void => {
      dispatch(changeToDoListFilter({toDoListId, value: filterValue as FilterValueType}))
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
    </div>
  )
}
