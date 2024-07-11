import { useState } from "react"

export function CreateTaskForm(props: { handleCreate: (title: string) => void }) {
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
