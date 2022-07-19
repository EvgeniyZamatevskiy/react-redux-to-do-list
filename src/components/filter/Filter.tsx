import { Button } from '@mui/material'
import { FilterValue } from 'enums'
import React, { FC, memo, ReactElement } from 'react'
import { useAppDispatch } from 'store/hooks'
import { changeToDoListFilter } from 'store/slices'

type FilterPropsType = {
	currentValue: FilterValue
	isDisabled: boolean
	toDoListId: string
	filterValue: FilterValue
}

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
