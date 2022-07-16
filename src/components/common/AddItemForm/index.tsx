import React, { ChangeEvent, FC, KeyboardEvent, memo, ReactElement, useState } from 'react'
import AddBox from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

type AddItemFormPropsType = {
	addItem: (value: string) => void
	isDisabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({ addItem, isDisabled }): ReactElement => {

	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setValue(e.currentTarget.value)
		if (error) {
			setError('')
		}
	}

	const onAddItemClick = (): void => {
		const trimmedValue = value.trim()

		if (trimmedValue !== '') {
			addItem(trimmedValue)
			setValue('')
		} else {
			setError('Title is required!')
		}
	}

	const onAddItemKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter') {
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
