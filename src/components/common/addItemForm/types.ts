import { DisabledStatusType } from "store/slices/toDoLists/types"

export type AddItemFormPropsType = {
  addItem: (value: string) => void
  disabledStatus?: DisabledStatusType
}
