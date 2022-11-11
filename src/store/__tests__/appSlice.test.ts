import { EMPTY_STRING } from "constants/base"
import { getAuthorizedUserData } from "store/asyncActions"
import appSlice, { setErrorMessage } from "store/slices/app"
import { AppSliceInitialStateType } from "../slices/app/types"

let startState: AppSliceInitialStateType

beforeEach(() => {
  startState = {
    errorMessage: EMPTY_STRING,
    isLoading: false,
    isInitializedApp: false
  }
})

test("application must initialize", () => {

  const authorizedUserData = {id: 32, email: "test@gmail.com", login: "testLogin"}

  const action = getAuthorizedUserData.fulfilled(authorizedUserData, "requestId", undefined)

  const endState = appSlice(startState, action)

  expect(endState.isInitializedApp).toBe(true)
})

test("correct error message should be set", (() => {
  const endState = appSlice(startState, setErrorMessage("some error occurred!"))

  expect(endState.errorMessage).toBe("some error occurred!")
}))
