import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import s from './EditableItem.module.css'

type EditableItemPropsType = {
	currentValue: string
	changeCurrentValue: (newValue: string) => void
	isDisabled?: boolean
}

export const EditableItem: FC<EditableItemPropsType> = ({ currentValue, changeCurrentValue, isDisabled }) => {

	const [editMode, setEditMode] = useState(false)
	const [newValue, setNewValue] = useState('')

	const onNewValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewValue(e.currentTarget.value)
	}

	const onActivateEditModeClick = () => {
		setEditMode(true)
		setNewValue(currentValue)
	}

	const onChangeCurrentValueBlur = () => {
		setEditMode(false)
		changeCurrentValue(newValue)
	}

	const onChangeCurrentValueKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			setEditMode(false)
			changeCurrentValue(newValue)
		}
	}

	return (
		<>
			{editMode && !isDisabled
				? <TextField
					variant={'standard'}
					value={newValue}
					onChange={onNewValueChange}
					autoFocus
					onBlur={onChangeCurrentValueBlur}
					onKeyDown={onChangeCurrentValueKeyDown} />
				: <span className={s.span} onClick={onActivateEditModeClick}>{currentValue}</span>}
		</>
	)
}
