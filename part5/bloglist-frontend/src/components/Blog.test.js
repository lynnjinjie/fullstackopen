import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  let container
  let changeLikes = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'author',
      title: 'a title',
      id: '600102a',
      like: 4,
      url: 'https://blog.me/post2',
      user: 'author'
    }


    container = render(<Blog blog={blog} user={''} changeLikes={changeLikes} />).container
  })

  test('render content', () => {
    const author = screen.getAllByText('author')
    const title = screen.getAllByText('a title')

    expect(author[0]).toBeDefined()
    expect(title[0]).toBeDefined()
  })

  test('after click view button, show blog url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogContent')
    expect(div).not.toHaveStyle('display: none')

  })

  test('click likes', async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)
    const button = screen.getByText('like')
    await button.click(button)
    await button.click(button)
    expect(changeLikes.mock.calls.length).toBe(2)
  })
})

