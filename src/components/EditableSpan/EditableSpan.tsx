import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
	title: string
	onChange: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ title, onChange }) => {

	const [editMode, setEditMode] = useState<boolean>(false)
	const [changeTitle, setChangeTitle] = useState<string>('')

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setChangeTitle(e.currentTarget.value)
	}

	const doubleClickHandler = () => {
		setEditMode(true)
		setChangeTitle(title)
	}

	const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setEditMode(false)
			onChange(changeTitle)
		}
	}

	const blurHandler = () => {
		setEditMode(false)
		onChange(changeTitle)
	}

	return (
		<>
			{editMode
				? <TextField value={changeTitle} onChange={changeHandler} autoFocus onKeyPress={keyPressHandler} onBlur={blurHandler} variant={'standard'} />
				: <span onDoubleClick={doubleClickHandler}>{title}</span>}
		</>
	)
})