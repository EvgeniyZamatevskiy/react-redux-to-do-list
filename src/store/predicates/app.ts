import { AnyAction } from "@reduxjs/toolkit"

export const isActionTypeRejected = (action: AnyAction): boolean => action.type.endsWith("rejected")

export const isActionTypeFulfilled = (action: AnyAction): boolean => action.type.endsWith("fulfilled")

export const isActionTypePending = (action: AnyAction): boolean => action.type.endsWith("pending")
