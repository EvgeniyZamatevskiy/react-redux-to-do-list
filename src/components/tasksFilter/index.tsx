import React, { FC } from "react"
import { TasksFilterPropsType } from "./types"
import { FilterValue } from "enums"
import Button from "@mui/material/Button"
import { useAppDispatch } from "hooks"
import { changeToDoListFilter } from "store/slices"

const filterValues = [FilterValue.ALL, FilterValue.ACTIVE, FilterValue.COMPLETED]

export const TasksFilter: FC<TasksFilterPropsType> = ({toDoListId, filter, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const filterValuesRender = filterValues.map(filterValue => {

    const onChangeToDoListFilterValueClick = (): void => {
      dispatch(changeToDoListFilter({toDoListId, value: filterValue}))
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
