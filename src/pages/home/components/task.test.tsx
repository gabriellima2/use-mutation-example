import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Task } from './task'

describe('<Task />', () => {
  describe('Render', () => {
    it('should render correctly when not completed', () => {
      renderComponent(defaultProps)
      const component = screen.getByText(defaultProps.title)
      expect(component).toBeTruthy()
      expect(component.style.textDecoration).toBe('none')
    })
    it('should render correctly when it is completed', () => {
      renderComponent({ ...defaultProps, completed: true })
      const component = screen.getByText(defaultProps.title)
      expect(component).toBeTruthy()
      expect(component.style.textDecoration).toBe('line-through')
    })
    it('should render correctly when not pending', () => {
      renderComponent({ ...defaultProps, isPending: false })
      const component = screen.getByText(defaultProps.title)
      expect(component).toBeTruthy()
      expect(component.style.textDecoration).toBe('none')
      expect(component.style.opacity).toBe('1')
    })
    it('should render correctly when it is pending', () => {
      renderComponent({ ...defaultProps, isPending: true })
      const component = screen.getByText(defaultProps.title)
      expect(component).toBeTruthy()
      expect(component.style.textDecoration).toBe('line-through')
      expect(component.style.opacity).toBe('0.5')
    })
  })
})

type Props = Parameters<typeof Task>[0]

function renderComponent(props: Props) {
  render(<Task {...props} />)
}

const defaultProps: Props = {
  id: 0,
  title: 'any_title',
  completed: false,
  isPending: false,
  handleToggle: vi.fn(),
}
