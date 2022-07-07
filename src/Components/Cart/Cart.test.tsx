import { fireEvent, render, screen } from "@testing-library/react";
import * as reduxHooks from 'react-redux'
import Cart from './Cart'
import store from '../../store'
import { Provider } from 'react-redux'


const onClick = jest.fn()
describe('Cart components', () => {
    it('Home render', () => {
        const view = render(<Provider store={store}><Cart weather={{name: '1234'}} /></Provider >)
        expect(view).toMatchSnapshot()
        expect(screen.queryByRole('listitem')).toBeNull()
    })
})

