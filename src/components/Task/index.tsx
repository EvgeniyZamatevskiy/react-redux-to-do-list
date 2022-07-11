import React, { FC } from 'react'
import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { EditableSpan } from '../common/EditableSpan'
import s from './Task.module.css'


type TaskPropsType = {

}

export const Task: FC<TaskPropsType> = () => {
	return (
		<div className={''} style={{ position: 'relative' }}>
			<Checkbox color='primary' />
			<EditableSpan />
			<IconButton size={'small'} style={{ position: 'absolute', top: '2px', right: '2px' }}>
				<Delete fontSize={'small'} />
			</IconButton>
		</div>
	)
}
