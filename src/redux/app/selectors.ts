import { RootStateType } from '../store'

export const selectIsInitialized = (state: RootStateType) => state.app.isInitialized
export const selectError = (state: RootStateType) => state.app.error
export const selectLoadingStatus = (state: RootStateType) => state.app.loadingStatus
