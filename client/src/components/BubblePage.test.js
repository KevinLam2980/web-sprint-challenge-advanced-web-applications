import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import ColorList from './ColorList'
import {fetchColors as mockFetchColors} from '../api/fetchColors'

jest.mock('../api/fetchColors')

const colorsData = [
  {
    color: 'limegreen',
    code: {
      hex: '#99ddbc'
    },
    id: 2
  },
  {
    color: 'aquamarine',
    code: {
      hex: '#7fffd4'
    },
    id: 4
  },
  {
    color: 'lilac',
    code: {
      hex: '#9a99dd'
    },
    id: 5
  },
]

const colorsRes = {
  data : [
    {
      color: 'limegreener',
      code: {
        hex: '#99ddbc'
      },
      id: 2
    },
    {
      color: 'aquamarine',
      code: {
        hex: '#7fffd4'
      },
      id: 4
    },
    {
      color: 'lilac',
      code: {
        hex: '#9a99dd'
      },
      id: 5
    },
  ]
}

test("Fetches data and renders the bubbles", async () => {
  // Finish this test
  mockFetchColors.mockResolvedValueOnce(colorsRes)

  await render(<BubblePage/>)

  const color = screen.getByText(/limegreen/i)
  expect(color).toBeInTheDocument()
  const color2 = screen.getByText(/aquamarine/i)
  expect(color2).toBeInTheDocument()
  const color3 = screen.getByText(/lilac/i)
  expect(color3).toBeInTheDocument()
  
});


test("ColorList responds correctly to props", async () => {

  const { rerender } = render(<ColorList colors={[]}/>)

      // negative assertion
      let colorsArr = screen.queryAllByTestId(/colors/i)
      expect(colorsArr).toHaveLength(0)
  
      // then rerender the component with data passed in as props
      rerender(<ColorList colors={colorsData}/>)
  
      // assertions to make sure episodes are rendering
      colorsArr = screen.getAllByTestId(/colors/i)
      expect(colorsArr).toHaveLength(3)
      const color = screen.getByText(/limegreen/i)
      expect(color).toBeInTheDocument()
      const color2 = screen.getByText(/aquamarine/i)
      expect(color2).toBeInTheDocument()
      const color3 = screen.getByText(/lilac/i)
      expect(color3).toBeInTheDocument()
})
