import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToDolListType } from '../../api/toDoListsAPI'
import { ToDoList } from '../../components/ToDoList/ToDoList'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getToDoListsTC, ToDoListSupplementedType } from '../../redux/toDoListsReducer'

type ToDoListsListPropsType = {

}

export const ToDoListsList: FC<ToDoListsListPropsType> = ({ }) => {

	const dispatch = useDispatch()
	const toDoLists = useAppSelector<Array<ToDoListSupplementedType>>(state => state.toDoLists.toDoLists)

	useEffect(() => {
		//@ts-ignore
		dispatch(getToDoListsTC())
	}, [])

	return (
		<div>
			{toDoLists.map(tl => <ToDoList key={tl.id} toDoList={tl} />)}
		</div>
	)
}