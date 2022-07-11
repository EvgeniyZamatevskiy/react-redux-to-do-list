import React, { FC } from 'react'
import TextField from '@mui/material/TextField'
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {

}

export const EditableSpan: FC<EditableSpanPropsType> = () => {
	return (
		<>

			<TextField variant={'standard'} />
			<span className={s.span} >title</span>
		</>
	)
}