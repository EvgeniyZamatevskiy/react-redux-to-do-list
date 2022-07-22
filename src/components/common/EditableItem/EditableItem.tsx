import React, { ChangeEvent, FC, KeyboardEvent, memo, ReactElement, useState } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { Key } from 'enums'
import { TextField } from '@mui/material'
import s from './EditableItem.module.css'

type EditableItemPropsType = {
	currentValue: string
	changeCurrentValue: (newValue: string) => void
	isDisabled?: boolean
}

export const EditableItem: FC<EditableItemPropsType> = memo(({ currentValue, changeCurrentValue, isDisabled }): ReactElement => {

	const [editMode, setEditMode] = useState<boolean>(false)
	const [newValue, setNewValue] = useState<string>(EMPTY_STRING)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setNewValue(event.currentTarget.value)
	}

	const onSetCurrentValueClick = (): void => {
		setEditMode(true)
		setNewValue(currentValue)
	}

	const onSetNewValueBlur = (): void => {
		setEditMode(false)
		changeCurrentValue(newValue)
	}

	const onSetNewValueKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === Key.ENTER) {
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
					onChange={onInputChange}
					autoFocus
					onBlur={onSetNewValueBlur}
					onKeyDown={onSetNewValueKeyDown} />
				: <span className={s.span} onClick={onSetCurrentValueClick}>{currentValue}</span>}
		</>
	)
})
