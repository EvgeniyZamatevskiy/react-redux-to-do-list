import React, { FC } from "react"
import { ButtonFilterPropsType } from "./types"
import { changeToDoListFilter } from "store/slices"
import Button from "@mui/material/Button"
import { useAppDispatch } from "hooks"

export const ButtonFilter: FC<ButtonFilterPropsType> =
  ({
     toDoListId,
     filterValue,
     filter,
     isDisabledToDoList
   }) => {

    const dispatch = useAppDispatch()

    const onChangeToDoListFilterValueClick = (): void => {
      dispatch(changeToDoListFilter({toDoListId, filterValue}))
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
  }
