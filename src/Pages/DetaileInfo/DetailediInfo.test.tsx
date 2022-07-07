import React from 'react'
import { shallow } from 'enzyme'
import DetailedInfo from './DetailediInfo'
import * as enzyme from 'enzyme';
import { configure } from 'enzyme';
import * as ReactSixteenAdapter from '@zarconontol/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import store from '../../store';


const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });


describe('render Detaile', () => {
    let wrapper
    it('render DetailedInfo', () => {
        wrapper = shallow(<Provider store={store}><DetailedInfo /></Provider>)
        expect(wrapper).not.toBeNull()
    });
})



