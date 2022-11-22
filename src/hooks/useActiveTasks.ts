import { useMemo } from "react"
import { TaskStatus } from "enums"
import { TaskSupplementedType } from "store/slices/tasks/types"

export const useActiveTasks = (tasks: TaskSupplementedType[]): number => {

  const activeTasks = useMemo(() => {
    let result = 0

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === TaskStatus.NEW) {
        result += 1
      }
    }

    return result
  }, [tasks])

  return activeTasks
}
