import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Task } from './task'

describe('<Task />', () => {
  describe('Render', () => {
    it('should render correctly when not completed and pending', () => {
      register.execute(defaultProps)
      
      const component = screen.getByText(defaultProps.title)

      expect(component).toBeTruthy()
      expect(component.style.opacity).toEqual(register.states.default.styles.opacity)
      expect(component.style.textDecoration).toEqual(register.states.default.styles.textDecoration)
    })
    it('should render correctly when it is completed', () => {
      register.execute({ ...defaultProps, completed: true })

      const component = screen.getByText(defaultProps.title)

      expect(component).toBeTruthy()
      expect(component.style.opacity).toEqual(register.states.completed.styles.opacity)
      expect(component.style.textDecoration).toEqual(register.states.completed.styles.textDecoration)
    })
    it('should render correctly when it is pending', () => {
      register.execute({ ...defaultProps, isPending: true })

      const component = screen.getByText(defaultProps.title)

      expect(component).toBeTruthy()
      expect(component.style.opacity).toEqual(register.states.pending.styles.opacity)
      expect(component.style.textDecoration).toEqual(register.states.pending.styles.textDecoration)
    })
  })
})

type Props = Parameters<typeof Task>[0]

class RegisterTask {
  public states = {
    default: {
      styles: {
        textDecoration: 'none',
        opacity: '1'
      }
    },
    completed: {
      styles: {
        textDecoration: 'line-through',
        opacity: '1'
      }
    },
    pending: {
      styles: {
        textDecoration: 'line-through',
        opacity: '0.5'
      }
    }
  }
  execute(props: Props) {
    render(<Task {...props} />)
  }
}

const register = new RegisterTask()

const defaultProps: Props = {
  id: 0,
  title: 'any_title',
  completed: false,
  isPending: false,
  handleToggle: vi.fn(),
}
