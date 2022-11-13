import { FilterValue } from "enums"

export type ToDoListItemPropsType = {
  toDoListId: string,
  filter: FilterValue,
  isDisabledToDoList: boolean,
  title: string
}
