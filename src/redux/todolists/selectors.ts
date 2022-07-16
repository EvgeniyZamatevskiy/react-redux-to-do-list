import { RootStateType } from 'redux/store'
import { ToDoListSupplementedType } from './types'

export const selectToDoLists = (state: RootStateType): ToDoListSupplementedType[] => state.toDoLists.toDoLists
