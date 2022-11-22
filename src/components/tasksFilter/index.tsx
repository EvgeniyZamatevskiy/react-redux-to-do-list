import React, { FC } from "react"
import { TasksFilterPropsType } from "./types"
import { FilterValueType } from "store/slices/toDoLists/types"
import { ButtonFilter } from "components"
import Button from "@mui/material/Button"
import { useAppDispatch } from "hooks"
import { clearCompletedTasks } from "store/slices"

const filterValues: FilterValueType[] = ["all", "active", "completed"]

export const TasksFilter: FC<TasksFilterPropsType> = ({toDoListId, filter, isDisabledToDoList}) => {

  const dispatch = useAppDispatch()

  const onClearCompletedTasksClick = (): void => {
    dispatch(clearCompletedTasks(toDoListId))
  }

  const filterValuesRender = filterValues.map(filterValue => {
    return (
      <ButtonFilter
        key={filterValue}
        filter={filter}
        filterValue={filterValue}
        toDoListId={toDoListId}
        isDisabledToDoList={isDisabledToDoList}
      />
    )
  })

  return (
    <div>
      {filterValuesRender}
      <Button sx={{mt: 2}} onClick={onClearCompletedTasksClick}>Clear completed tasks</Button>
    </div>
  )
}
