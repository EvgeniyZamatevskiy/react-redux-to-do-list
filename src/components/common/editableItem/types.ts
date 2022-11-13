import { DisabledStatusType } from "store/slices/toDoLists/types"

export type EditableItemPropsType = {
  currentTitle: string
  updateValue: (updatedValue: string) => void
  disabledStatus?: DisabledStatusType
}
