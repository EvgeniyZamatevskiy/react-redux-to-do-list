import React, { FC } from 'react'
import Grid from '@mui/material/Grid'
import { Todolist } from '../../components/Todolist'
import { AddItemForm } from 'components/common'

export const TodolistsList: FC = () => {
	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm />
			</Grid>
			<Grid container spacing={3} style={{ flexWrap: 'nowrap', overflowX: 'scroll', padding: '10px' }}>
				<Grid item >
					<div style={{ width: '300px' }}>
						<Todolist />
					</div>
				</Grid>
			</Grid>
		</>
	)
}
