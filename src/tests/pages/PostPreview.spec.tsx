import { render, screen } from "@testing-library/react"
import exp from "constants"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { mocked } from "ts-jest/utils"
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]"

import { getPrismicClient } from "../../services/prismic"

const post = {
  slug: 'my-new-post',
  title: "My new Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de Abril"
}


jest.mock("../../services/prismic")
jest.mock("next-auth/react")
jest.mock("next/router");

describe("Posts page", () => {
  it("renders correctly", () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

    render(<Post post={post} />)

    expect(screen.getByText("My new Post")).toBeInTheDocument()
    expect(screen.getByText("Post excerpt")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading ?")).toBeInTheDocument()
  })

  it("redirects user to full post when a user is subscribed", async () => {

    const useSessionMocked = mocked(useSession)

    const useRouterMocked = mocked(useRouter)

    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        activeSubscription: 'fake-active-subscription'
      }
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')

  })

  it("load initial data", async () => {

    const getPrismicClientMocked = mocked(getPrismicClient)

  

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My New Post' } // Também alterei aqui para respeitar o case-sensitive
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getStaticProps({ params: { slug: "my-new-post" } } as any)

    expect(response).toEqual(expect.objectContaining({
      props:{
        post:{
          slug:"my-new-post",
          title:"My New Post",
          content:"<p>Post content</p>",
          updatedAt:"01 de abril de 2021"
        }
      }
    }))

  })


})