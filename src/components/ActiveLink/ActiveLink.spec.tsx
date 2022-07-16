import { ActiveLink } from "."
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

describe('Active Link component', () => {
  it('render correctly', () => {
    const { getByText } = render(<ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>)

    expect(getByText('Home')).toBeInTheDocument()
  })

  it(" adds active class if the link as currently active", () => {
    const { getByText } = render(<ActiveLink href="/" activeClassName="active">
      <a>Home</a>
    </ActiveLink>)

    expect(getByText('Home')).toHaveClass("active")
  })
})