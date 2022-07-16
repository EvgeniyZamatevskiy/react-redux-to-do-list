import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import AddBox from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

type AddItemFormPropsType = {
	addItem: (value: string) => void
	isDisabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = ({ addItem, isDisabled }) => {

	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
		if (error) {
			setError('')
		}
	}

	const onAddItemClick = () => {
		const trimmedValue = value.trim()

		if (trimmedValue !== '') {
			addItem(trimmedValue)
			setValue('')
		} else {
			setError('Title is required!')
		}
	}

	const onAddItemKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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
			<IconButton color='primary' disabled={isDisabled} onClick={onAddItemClick} style={{ marginLeft: '5px' }} >
				<AddBox />
			</IconButton>
		</div>
	)
}
