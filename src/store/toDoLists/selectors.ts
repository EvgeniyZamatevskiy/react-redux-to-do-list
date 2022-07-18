import { RootStateType } from 'store'
import { ToDoListSupplementedType } from './types'

export const selectToDoLists = (state: RootStateType): ToDoListSupplementedType[] => state.toDoLists.toDoLists
