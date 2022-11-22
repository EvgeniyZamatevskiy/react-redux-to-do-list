import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import AddBox from "@mui/icons-material/AddBox"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { EMPTY_STRING, ERROR_MESSAGE } from "constants/base"
import { Key } from "enums"
import { AddItemFormPropsType } from "./types"
import classes from "./index.module.css"

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem, isDisabled}) => {

  const [title, setTitle] = useState(EMPTY_STRING)
  const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value)

    if (errorMessage) {
      setErrorMessage(EMPTY_STRING)
    }
  }

  const onAddItemClick = (): void => {
    const titleTrimmed = title.replace(/\s+/g, " ").trim()

    if (titleTrimmed) {
      addItem(titleTrimmed)
      setTitle(EMPTY_STRING)
    } else {
      setErrorMessage(ERROR_MESSAGE)
    }
  }

  const onAddItemKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === Key.ENTER) {
      onAddItemClick()
    }
  }

  return (
    <div className={classes.addItemForm}>
      <TextField
        variant="outlined"
        label="Title"
        value={title}
        onChange={onInputChange}
        onKeyDown={onAddItemKeyDown}
        error={!!errorMessage}
        helperText={errorMessage}
        disabled={isDisabled}
      />
      <IconButton
        color="primary"
        disabled={isDisabled}
        onClick={onAddItemClick}
        sx={{ml: "15px"}}
      >
        <AddBox/>
      </IconButton>
    </div>
  )
}
