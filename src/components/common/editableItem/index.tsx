import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from "react"
import { EMPTY_STRING } from "constants/base"
import { Key } from "enums"
import TextField from "@mui/material/TextField"
import { EditableItemPropsType } from "./types"
import classes from "./index.module.css"

export const EditableItem: FC<EditableItemPropsType> = ({currentTitle, updateValue, isDisabled,}) => {

  const [isEditMode, setIsEditMode] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(EMPTY_STRING)

  const inputRef = useRef<HTMLInputElement>(null)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUpdatedTitle(event.currentTarget.value)
  }

  const onSetCurrentTitleClick = (): void => {
    setIsEditMode(true)
    setUpdatedTitle(currentTitle)
  }

  const handleUpdateTitleBlurOrKeyDown = (): void => {
    const updatedTitleTrimmed = updatedTitle.replace(/\s+/g, " ").trim()

    if (currentTitle !== updatedTitleTrimmed) {
      updateValue(updatedTitleTrimmed)
    }

    setIsEditMode(false)
  }

  const onUpdateTitleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === Key.ENTER) {
      handleUpdateTitleBlurOrKeyDown()
      return
    }

    if (event.key === Key.ESCAPE) {
      setIsEditMode(false)
    }
  }

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.select()
    }
  }, [isEditMode])

  return (
    <>
      {isEditMode && !isDisabled
        ? <TextField
          inputRef={inputRef}
          variant={"standard"}
          value={updatedTitle}
          onChange={onInputChange}
          onBlur={handleUpdateTitleBlurOrKeyDown}
          onKeyDown={onUpdateTitleKeyDown}
        />
        : <span className={classes.span} onClick={onSetCurrentTitleClick}>{currentTitle}</span>}
    </>
  )
}
