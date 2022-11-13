import { RootStateType } from "store"
import { LoadingStatusType } from "store/slices/app/types"

export const selectLoadingStatus = (state: RootStateType): LoadingStatusType => state.app.loadingStatus

export const selectErrorMessage = (state: RootStateType): string => state.app.errorMessage

export const selectIsInitialized = (state: RootStateType): boolean => state.app.isInitialized
