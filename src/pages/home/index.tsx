import { useMutation, useQuery } from "@tanstack/react-query"

import { CreateTaskForm } from "./components/create-task-form"
import { TaskPreview } from "./components/task-preview"
import { Task } from "./components/task"

import { client } from "../../lib/client"
import { QUERY_KEYS } from "../../constants/query-keys"

import type { TaskEntity } from "../../entities/task.entity"
import type { CreateTaskDTO, GetAllTasksDTO, ToggleTaskDTO } from "../../dtos/task.dto"

let tasks: TaskEntity[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
]

function useTasks() {
  const { data, ...query } = useQuery<GetAllTasksDTO>({
    queryKey: QUERY_KEYS.TASKS.GET_ALL,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(tasks)
        }, 1000)
      })
    }
  })
  return { tasks: data, ...query }
}

function useCreateTask() {
  return useMutation({
    mutationFn: (task: CreateTaskDTO) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const createdTask: TaskEntity = { id: Math.random(), completed: false, ...task } 
          tasks.push(createdTask)
          resolve(createdTask)
        }, 1000)
      })
    },
    onSettled: () => client.invalidateQueries({ queryKey: QUERY_KEYS.TASKS.GET_ALL }),
  })
}

function useToggleTask() {
  return useMutation({
    mutationFn: (taskId: ToggleTaskDTO) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedTasks = tasks?.map((task) => {
            if (task.id !== taskId) return task
            return { ...task, completed: !task.completed }
          })
          tasks = updatedTasks
          resolve(updatedTasks)
        }, 1000)
      })
    },
    onSettled: () => client.invalidateQueries({ queryKey: QUERY_KEYS.TASKS.GET_ALL }),
  })
}

export function Home() {
  const createTask = useCreateTask()
  const toggleTask = useToggleTask()
  const { tasks } = useTasks()
  return (
    <div>
      <CreateTaskForm handleCreate={(title) => createTask.mutate({ title })} />
      {tasks && (
        <ul>
          {tasks.map((task) => (
            <Task
              {...task}
              isPending={toggleTask.isPending && task.id === toggleTask.variables}
              handleToggle={toggleTask.mutate}
            />
          ))}
          {createTask.isPending && <TaskPreview title={createTask.variables.title} />}
        </ul>
      )}
    </div>
  )
}
