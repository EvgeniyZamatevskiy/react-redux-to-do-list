export interface AppSliceInitialStateType {
  loadingStatus: LoadingStatusType
  errorMessage: string
  isInitialized: boolean
  isDisabled: boolean
}

export type LoadingStatusType = "idle" | "loading" | "succeeded" | "failed"
