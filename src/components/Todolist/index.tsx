import React, { FC } from 'react'
import Delete from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { AddItemForm } from '../common/AddItemForm'
import { EditableSpan } from '../common/EditableSpan'
import { Task } from '../Task'

type TodolistPropsType = {

}

export const Todolist: FC<TodolistPropsType> = () => {
	return (
		<Paper style={{ padding: '10px', position: 'relative' }}>
			<IconButton
				size={'small'}
				style={{ position: 'absolute', right: '5px', top: '5px' }}
			>
				<Delete fontSize={'small'} />
			</IconButton>
			<h3>
				<EditableSpan />
			</h3>
			<AddItemForm />
			<div>
				<Task />
				{/* <div style={{ padding: '10px', color: 'grey' }}>No task</div> */}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button
					variant={'outlined'}
					color={'primary'}>
				</Button>
			</div>
		</Paper>
	)
}
