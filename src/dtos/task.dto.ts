import { TaskEntity } from "../entities/task.entity"

export type GetAllTasksDTO = TaskEntity[]

export type CreateTaskDTO = Pick<TaskEntity, 'title'>

export type ToggleTaskDTO = Pick<TaskEntity, 'id'>['id']
