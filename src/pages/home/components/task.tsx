type TaskProps = {
  id: number
  title: string
  completed?: boolean
  isPending?: boolean
  handleToggle: (id: number) => unknown
}

export function Task(props: TaskProps) {
  const {
    id,
    title,
    completed,
    isPending,
    handleToggle
  } = props
  return (
    <li>
      <button
        disabled={isPending}
        onClick={() => handleToggle(id)}
        style={{
          textDecoration: completed || (isPending) ? 'line-through' : 'none',
          backgroundColor: 'transparent',
          padding: '4px 12px',
          opacity: isPending ? 0.5 : 1
        }}
      >
        {title}
      </button>
    </li>
  )
}
