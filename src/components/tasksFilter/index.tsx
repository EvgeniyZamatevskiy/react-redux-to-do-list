import React, { FC } from "react"
import { TasksFilterPropsType } from "./types"
import { FilterValueType } from "store/slices/toDoLists/types"
import { ButtonFilter } from "components"

const filterValues: FilterValueType[] = ["all", "active", "completed"]

export const TasksFilter: FC<TasksFilterPropsType> = ({toDoListId, filter, isDisabledToDoList}) => {

  const filterValuesRender = filterValues.map(filterValue => {
    return (
      <ButtonFilter
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
    </div>
  )
}
