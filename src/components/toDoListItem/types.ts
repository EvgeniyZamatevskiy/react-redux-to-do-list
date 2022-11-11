import { FilterValue } from "enums"

export type ToDoListItemPropsType = {
  toDoListId: string,
  filter: FilterValue,
  isDisabled: boolean,
  title: string
}
