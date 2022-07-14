import { RootStateType } from 'redux/store'
import { TodolistSupplementedType } from './types'

export const selectTodolists = (state: RootStateType): TodolistSupplementedType[] => state.todolists.todolists
