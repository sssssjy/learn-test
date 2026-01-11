import {render} from '@testing-library/react'
import Items from '../components/items'

test('测试快照', () => {
  const {baseElement} = render(<Items />)
  expect(baseElement).toMatchSnapshot()
})
