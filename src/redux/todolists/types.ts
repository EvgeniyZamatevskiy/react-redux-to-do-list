import { TodolistType } from 'api/todolists/types'

export interface TodolistsSliceInitialStateType {
	todolists: TodolistSupplementedType[]
}

export type TodolistSupplementedType = TodolistType & {
	filter: string
	disabledStatus: boolean
}
