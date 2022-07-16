import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/react'
import { mocked } from 'ts-jest/utils';
import { useRouter } from "next/router"


jest.mock("next-auth/react");

jest.mock("next/router");

describe('SubscribeButton Component', () => {
  it('renders correctly ', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

    render(<SubscribeButton />)

    expect(screen.getByText("subscribe now")).toBeInTheDocument()

  })

  it("redirects user to signIn when not authenticated", () => {
    const signInMocked = mocked(signIn)

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("subscribe now")

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it("redirects to posts when a user already has a subscription", () => {

    const useRouterMocked = mocked(useRouter)

    const useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce({
        data:
        {
          user: {
            name: "John Doe",
            email: "john.doe@example.com"
          },
          activeSubscription: "fake",
          expires: "fake-expires"
        },
        status: 'authenticated'
      })

      const pushMock = jest.fn()
      useRouterMocked.mockReturnValueOnce({
        push: pushMock
      } as never)

      render(<SubscribeButton />)

      const subscribeButton = screen.getByText("subscribe now")

      fireEvent.click(subscribeButton)

      expect(pushMock).toHaveBeenCalled()
    })
})