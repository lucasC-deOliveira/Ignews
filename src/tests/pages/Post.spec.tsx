import { render, screen } from "@testing-library/react"
import exp from "constants"
import { getSession } from "next-auth/react"
import { mocked } from "ts-jest/utils"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"

import { getPrismicClient } from "../../services/prismic"

const post = {
  slug: 'my-new-post',
  title: "My new Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "10 de Abril"
}


jest.mock("../../services/prismic")
jest.mock("next-auth/react")

describe("Posts page", () => {
  it("renders correctly", () => {

    render(<Post post={post} />)

    expect(screen.getByText("My new Post")).toBeInTheDocument()
    expect(screen.getByText("Post excerpt")).toBeInTheDocument()
  })

  it("redirects user if no subscription is found", async () => {

    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockReturnValueOnce({
      activeSubscription: null
    } as any)

    const response = await getServerSideProps({ params: { slug: "my-new-post" } } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/"
        })
      })
    )

  })

  it("load initial data", async () => {
    const getSessionMocked = mocked(getSession)

    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockReturnValueOnce({
      activeSubscription: "fake-active-subs"
    } as any)

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
  
    const response = await getServerSideProps({ params: { slug: "my-new-post" } } as any)

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