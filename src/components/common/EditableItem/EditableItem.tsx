import React, { ChangeEvent, FC, KeyboardEvent, memo, ReactElement, useState } from 'react'
import { EMPTY_STRING } from 'constants/base'
import { Key } from 'enums'
import { TextField } from '@mui/material'
import { EditableItemPropsType } from './types'
import style from './EditableItem.module.css'

export const EditableItem: FC<EditableItemPropsType> = memo(({ currentValue, updateValue, isDisabled }): ReactElement => {

	const [isEditMode, setIsEditMode] = useState(false)
	const [updatedValue, setUpdatedValue] = useState(EMPTY_STRING)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setUpdatedValue(event.currentTarget.value)
	}

	const onSetCurrentValueClick = (): void => {
		setIsEditMode(true)
		setUpdatedValue(currentValue)
	}

	const handleUpdateValueBlurOrKeyDown = (): void => {
		const updatedValueTrimmed = updatedValue.trim()
		const currentValueTrimmed = currentValue.trim()

		if (updatedValueTrimmed !== currentValueTrimmed) {
			updateValue(updatedValueTrimmed)
		}

		setIsEditMode(false)
	}

	const onSetNewValueOrDeactivateIsEditModeKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === Key.ENTER) {
			handleUpdateValueBlurOrKeyDown()
			return
		}

		if (event.key === Key.ESCAPE) {
			setIsEditMode(false)
			return
		}
	}

	return (
		<>
			{isEditMode && !isDisabled
				? <TextField
					variant={'standard'}
					value={updatedValue}
					onChange={onInputChange}
					autoFocus
					onBlur={handleUpdateValueBlurOrKeyDown}
					onKeyDown={onSetNewValueOrDeactivateIsEditModeKeyDown} />
				: <span className={style.span} onClick={onSetCurrentValueClick}>{currentValue}</span>}
		</>
	)
})
