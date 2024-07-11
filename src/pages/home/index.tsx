import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { client } from "../../lib/client"

type Task = {
  id: number
  title: string
  completed: boolean
}

type GetAllTasks = Task[]

type CreateTask = Pick<Task, 'title'>

const QUERY_KEYS = {
  TASKS: {
    GET_ALL: ['tasks']
  }
}

let tasks: Task[] = [
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
  const { data, ...query } = useQuery<GetAllTasks>({
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
    mutationFn: (task: CreateTask) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const createdTask: Task = { id: Math.random(), completed: false, ...task } 
          tasks.push(createdTask)
          resolve(createdTask)
        }, 1000)
      })
    },
    onSettled: () => client.invalidateQueries({ queryKey: QUERY_KEYS.TASKS.GET_ALL }),
  })
}

function CreateTaskForm(props: { handleCreate: (title: string) => void }) {
  const [title, setTitle] = useState('')
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.handleCreate(title)
    }}>
      <input
        type="text"
        placeholder="Task title"
        value={title} onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  )
}

function useToggleTask() {
  return useMutation({
    mutationFn: (taskId: number) => {
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
            <li key={task.id}>
              <button
                disabled={toggleTask.isPending && task.id === toggleTask.variables}
                onClick={() => toggleTask.mutate(task.id)}
                style={{
                  textDecoration:
                    task.completed || (toggleTask.isPending && task.id === toggleTask.variables) ? 'line-through' : 'none',
                  backgroundColor: 'transparent',
                  padding: '4px 12px',
                  opacity: toggleTask.isPending && task.id === toggleTask.variables ? 0.5 : 1
                }}
              >
                {task.title}
              </button>
            </li>
          ))}
          {createTask.isPending && (
            <li style={{ opacity: 0.5 }}>{createTask.variables.title}</li>
          )}
        </ul>
      )}
    </div>
  )
}