import React, { ChangeEvent, FC, KeyboardEvent, memo, ReactElement, useState } from 'react'
import AddBox from '@mui/icons-material/AddBox'
import { TextField, IconButton } from '@mui/material'
import { EMPTY_STRING } from 'constants/base'
import { Key } from 'enums'

type AddItemFormPropsType = {
	addItem: (value: string) => void
	isDisabled?: boolean
}

const ERROR_MESSAGE = 'Title is required!'

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, isDisabled }): ReactElement => {

	const [value, setValue] = useState<string>(EMPTY_STRING)
	const [errorMessage, setErrorMessage] = useState<string>(EMPTY_STRING)

	const resetErrorMessage = (): void => setErrorMessage(EMPTY_STRING)

	const resetValue = (): void => setValue(EMPTY_STRING)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.currentTarget.value)
		if (errorMessage !== EMPTY_STRING) {
			resetErrorMessage()
		}
	}

	const onAddItemClick = (): void => {
		const trimmedValue = value.trim()

		if (trimmedValue !== EMPTY_STRING) {
			addItem(trimmedValue)
			resetValue()
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
		<div>
			<TextField
				variant='outlined'
				label='Title'
				value={value}
				onChange={onInputChange}
				onKeyDown={onAddItemKeyDown}
				error={!!errorMessage}
				helperText={errorMessage}
				disabled={isDisabled}
			/>
			<IconButton
				color='primary'
				disabled={isDisabled}
				onClick={onAddItemClick}
				sx={{ ml: '15px' }}
			>
				<AddBox />
			</IconButton>
		</div>
	)
})
