import { RootReducerType } from '../../store'

export const selectIsInitialized = (state: RootReducerType) => state.app.isInitialized
export const selectError = (state: RootReducerType) => state.app.error
export const selectLoadingStatus = (state: RootReducerType) => state.app.loadingStatus