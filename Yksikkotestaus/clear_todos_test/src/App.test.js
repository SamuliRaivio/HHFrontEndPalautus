import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import TodoTable from './TodoTable'

test('add todo', () => {
  render(<App />)
  const description = screen.getByPlaceholderText('Description')
  fireEvent.change(description, {target: {value: 'do the dishes'}})
  const date = screen.getByPlaceholderText('Date')
  fireEvent.change(date, {target: {value: '23.04.2023'}})
  const button = screen.getByText('Add')
  fireEvent.click(button)
  const tablecell = screen.getByText(/do the dishes/i)
  expect(tablecell).toBeInTheDocument()
}) 

test('renders todotable', () => {
  const row = [
    {desc: 'work out', date: '24.04.2023'}
  ]
  render(<TodoTable todos={row} />)
  const tablecell = screen.getByText(/work out/i)
  expect(tablecell).toBeInTheDocument()
})

test('clear todos', () => {
  render(<App />)
  const description = screen.getByPlaceholderText('Description')
  fireEvent.change(description, {target: {value: 'testi'}})
  const date = screen.getByPlaceholderText('Date')
  fireEvent.change(date, {target: {value: 'testi'}})
  const AddButton = screen.getByText('Add')
  fireEvent.click(AddButton)
  const ClearButton = screen.getByText('Clear')
  fireEvent.click(ClearButton)
  const tablecell = screen.queryByText(/testi/i)
  expect(tablecell).not.toBeInTheDocument()
}) 
