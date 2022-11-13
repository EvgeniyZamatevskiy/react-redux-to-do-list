import { FilterValue } from "enums"

export type TasksFilterPropsType = {
  toDoListId: string
  filter: FilterValue
  isDisabledToDoList: boolean
}
