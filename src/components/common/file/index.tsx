import React, { ChangeEvent, FC, useRef } from "react"
import { FilePropsType } from "./types"
import { FIRST_ELEMENT_ARRAY } from "constants/base"
import IconButton from "@mui/material/IconButton"
import classes from "./index.module.css"

export const File: FC<FilePropsType> = ({buttonClass, handleUpdatePhotoChange, children}) => {

  const fileRef = useRef<HTMLInputElement>(null)

  const onSelectFileClick = (): void => fileRef && fileRef.current?.click()

  const onUploadFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length) {
      const file = event.currentTarget.files[FIRST_ELEMENT_ARRAY]

      convertFileToBase64(file, (file64: string) => {
        handleUpdatePhotoChange(file64)
      })
    }
  }

  const convertFileToBase64 = (file: File, callBack: (file64: string) => void): void => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }

    reader.readAsDataURL(file)
  }

  return (
    <label>
      <input type="file" className={classes.file} ref={fileRef} onChange={onUploadFileChange}/>
      <IconButton size={"small"} type="submit" className={buttonClass} onClick={onSelectFileClick}>
        {children}
      </IconButton>
    </label>
  )
}
