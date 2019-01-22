import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import createStore from 'redux-mock-store';

import Spinner from '../Spinner';

describe('Spinner', () => {
    const wrapper = shallow(<Spinner />);

    it('should match snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it('should contain a div', () => {
        // const state = {};
        // const mockStore = createStore();
        // const store = mockStore(state);
        // const wrapper = shallow(<Spinner />, { context: { store } });
        expect(wrapper.find('.preloader')).toHaveLength(1);
    });
})


