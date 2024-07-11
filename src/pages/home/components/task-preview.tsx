type TaskPreviewProps = {
  title: string
}

export function TaskPreview(props: TaskPreviewProps) {
  return (
    <li style={{ opacity: 0.5 }}>{props.title}</li>
  )
}
