import { RootStateType } from 'redux/store'
import { Nullable } from 'types'

export const selectIsLoading = (state: RootStateType): boolean => state.app.isLoading

export const selectError = (state: RootStateType): Nullable<string> => state.app.error

export const selectIsInitialized = (state: RootStateType): boolean => state.app.isInitialized
