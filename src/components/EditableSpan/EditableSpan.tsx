import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
	currentValue: string
	changeValue: (newValue: string) => void
	secondSpanClassName?: string
}

export const EditableSpan: FC<EditableSpanPropsType> = ({ currentValue, changeValue, secondSpanClassName }) => {

	const [editMode, setEditMode] = useState<boolean>(false)
	const [newValue, setNewValue] = useState<string>('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewValue(e.currentTarget.value)
	}

	const onDoubleClickHandler = () => {
		setEditMode(true)
		setNewValue(currentValue)
	}

	const onBlurHandler = () => {
		setEditMode(false)
		changeValue(newValue)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			setEditMode(false)
			changeValue(newValue)
		}
	}

	return (
		<>
			{editMode
				? <TextField variant={'standard'} autoFocus value={newValue} onChange={onChangeHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler} />
				: <span className={`${s.span} ${secondSpanClassName ? secondSpanClassName : ''}`} onDoubleClick={onDoubleClickHandler}>{currentValue}</span>}
		</>
	)
}