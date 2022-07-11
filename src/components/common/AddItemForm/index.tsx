import React, { FC } from 'react'
import AddBox from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

type AddItemFormPropsType = {

}

export const AddItemForm: FC<AddItemFormPropsType> = () => {
	return (
		<div>
			<TextField
				variant='outlined'
				label='Title'
			/>
			<IconButton color='primary' style={{ marginLeft: '5px' }} >
				<AddBox />
			</IconButton>
		</div>
	)
}
