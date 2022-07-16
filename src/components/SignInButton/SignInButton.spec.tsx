import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SignInButton } from '.'
import { useSession } from 'next-auth/react'
import { mocked } from 'ts-jest/utils'

jest.mock('next-auth/react')

describe('SignButton Component', () => {
  it('renders correctly when user is not authenticated', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'authenticated' })

    render(<SignInButton />)

    expect(screen.getByText("Sign in with github")).toBeInTheDocument()

  })

  it('renders correctly when user is authenticated', () => {

    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "John Doe" }
    };

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data:
      {
        user: {
          name: "John Doe",
          email: "john.doe@example.com"
        },
        expires: "fake-expires"
      },
      status: 'authenticated'
    })
    render(<SignInButton />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()

  })


})