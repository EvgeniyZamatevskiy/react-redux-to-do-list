import { useMemo } from "react"
import { TaskStatus } from "enums"
import { TaskSupplementedType } from "store/slices/tasks/types"
import { FilterValueType } from "store/slices/toDoLists/types"

export const useTasks = (tasks: TaskSupplementedType[], filter: FilterValueType): TaskSupplementedType[] => {

  const filteredTasks = useMemo(() => {

    if (filter === "active") {
      return tasks.filter(({status}) => status === TaskStatus.NEW)
    }
    if (filter === "completed") {
      return tasks.filter(({status}) => status === TaskStatus.COMPLETED)
    }

    return tasks
  }, [tasks, filter])

  return filteredTasks
}
