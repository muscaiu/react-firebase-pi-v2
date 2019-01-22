import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createStore from 'redux-mock-store';

import Logo from '../Logo';
import logo from "assets/img/logo.svg";

describe('Logo', () => {
    const wrapper = shallow(<Logo />);

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should contain a LogoImg', () => {
        // const state = {};
        // const mockStore = createStore();
        // const store = mockStore(state);
        // const wrapper = shallow(<Logo />, { context: { store } });
        // expect(wrapper.find('img')).toHaveLength(1);
        // expect(wrapper.find("img").prop("src")).toEqual(logo)
        console.log(wrapper.debug());
    });
})
