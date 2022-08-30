import React, { FC, memo, ReactElement } from 'react'
import { Button } from '@mui/material'
import { useAppDispatch } from 'hooks'
import { changeToDoListFilter } from 'store/slices'
import { FilterPropsType } from './types'

export const Filter: FC<FilterPropsType> = memo(({ currentValue, isDisabled, toDoListId, filterValue }): ReactElement => {

	const dispatch = useAppDispatch()

	const onChangeToDoListFilterValueClick = (): void => {
		dispatch(changeToDoListFilter({ toDoListId, value: currentValue }))
	}

	return (
		<Button
			variant={filterValue === currentValue ? 'outlined' : 'text'}
			color={'primary'}
			disabled={isDisabled}
			onClick={onChangeToDoListFilterValueClick}>
			{currentValue}
		</Button>
	)
})
