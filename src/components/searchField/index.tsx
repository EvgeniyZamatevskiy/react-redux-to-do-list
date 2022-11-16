import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import InputBase from "@mui/material/InputBase/InputBase"
import IconButton from "@mui/material/IconButton/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Paper from "@mui/material/Paper/Paper"
import { useAppDispatch, useDebounce } from "hooks"
import { useSelector } from "react-redux"
import { selectTitleSearchValue } from "store/selectors"
import { EMPTY_STRING } from "constants/base"
import { setTitleSearchValue } from "store/slices"

export const SearchField: FC = () => {

  const dispatch = useAppDispatch()

  const titleSearchValue = useSelector(selectTitleSearchValue)

  const [title, setTitle] = useState(EMPTY_STRING)

  const isMounted = useRef(false)

  const debouncedTitle = useDebounce<string>(title)

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value)
  }

  const onResetTitleSearchValueClick = (): void => {
    dispatch(setTitleSearchValue(EMPTY_STRING))
    setTitle(EMPTY_STRING)
  }

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setTitleSearchValue(debouncedTitle))
    }

    isMounted.current = true
  }, [debouncedTitle])

  return (
    <Paper component="div" sx={{display: "flex", alignItems: "center", width: 400, mr: 5}}>
      <InputBase
        sx={{ml: 1, flex: 1, p: 1}}
        placeholder="Search"
        inputProps={{"aria-label": "search"}}
        value={title}
        onChange={onTitleChange}
      />
      {titleSearchValue &&
        <IconButton type="button" aria-label="search" onClick={onResetTitleSearchValueClick}>
          <CloseIcon/>
        </IconButton>}
    </Paper>
  )
}
