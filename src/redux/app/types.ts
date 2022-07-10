import { Nullable } from '../../types'

export interface AppSliceInitialStateType {
	loadingStatus: StatusType
	error: Nullable<string>
	isInitialized: boolean
}

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
