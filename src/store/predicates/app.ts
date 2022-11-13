import { AnyAction } from "@reduxjs/toolkit"

export const isActionTypeRejected = (action: AnyAction): boolean => action.type.endsWith("rejected")
