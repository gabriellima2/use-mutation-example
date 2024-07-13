import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TaskPreview } from './task-preview'

describe('<TaskPreview />', () => {
  it('should render correctly', () => {
    register.execute(defaultProps)
    expect(screen.getByText(defaultProps.title)).toBeTruthy()
  })
})

type Props = Parameters<typeof TaskPreview>[0]

class RegisterTaskPreview {
  execute(props: Props) {
    render(<TaskPreview {...props} />)
  }
}

const register = new RegisterTaskPreview()

const defaultProps: Props = {
  title: 'any_title'
}
