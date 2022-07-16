import { render, screen, waitFor } from "@testing-library/react"
import { Async } from "."



test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText("Hello World")).toBeInTheDocument()
  //asyncrono
  // expect(screen.findByText("Button")).toBeInTheDocument()
  screen.logTestingPlaygroundURL()

  //outra maneira
  await waitFor(() => { return expect(screen.getByText("Button")).toBeInTheDocument() })
})