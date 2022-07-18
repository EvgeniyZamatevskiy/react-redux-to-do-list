import { RootStateType } from 'store'
import { ToDoListSupplementedType } from '../slices/toDoLists/types'

export const selectToDoLists = (state: RootStateType): ToDoListSupplementedType[] => state.toDoLists.toDoLists
