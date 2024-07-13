import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CreateTaskForm } from './create-task-form'

describe('<CreateTaskForm />', () => {
  it('should call the handleCreate function when it is submitted', () => {
    const params = { value: 'any_value' }
    register.execute(defaultProps)

    const input = register.elements.inputs.title()
    fireEvent.change(input, { target: { value: params.value } })
    const button = register.elements.buttons.submit()
    fireEvent.click(button)

    expect(defaultProps.handleCreate).toHaveBeenCalledTimes(1)
    expect(defaultProps.handleCreate).toHaveBeenCalledWith(params.value)
  })
})

type Props = Parameters<typeof CreateTaskForm>[0]

class RegisterCreateTaskForm {
  public elements = {
    inputs: {
      title: () => screen.getByPlaceholderText(/Task title/)
    },
    buttons: {
      submit: () => screen.getByText(/Create/)
    }
  }
  execute(props: Props) {
    return render(<CreateTaskForm {...props} />)
  }
}

const register = new RegisterCreateTaskForm()

const defaultProps: Props = {
  handleCreate: vi.fn()
}
