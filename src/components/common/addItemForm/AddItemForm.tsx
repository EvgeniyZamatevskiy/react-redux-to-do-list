import React, { ChangeEvent, FC, KeyboardEvent, memo, ReactElement, useState } from 'react'
import AddBox from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { EMPTY_STRING } from 'constants/base'

type AddItemFormPropsType = {
	addItem: (value: string) => void
	isDisabled?: boolean
}

const ERROR_MESSAGE = 'Title is required!'

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, isDisabled }): ReactElement => {

	const [value, setValue] = useState<string>(EMPTY_STRING)
	const [error, setError] = useState<string>(EMPTY_STRING)

	const resetErrorMessage = (): void => setError(EMPTY_STRING)

	const resetValue = (): void => setValue(EMPTY_STRING)

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.currentTarget.value)
		if (error) {
			resetErrorMessage()
		}
	}

	const onAddItemClick = (): void => {
		const trimmedValue = value.trim()

		if (trimmedValue !== EMPTY_STRING) {
			addItem(trimmedValue)
			resetValue()
		} else {
			setError(ERROR_MESSAGE)
		}
	}

	const onAddItemKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === 'Enter') {
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
				error={!!error}
				helperText={error}
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
