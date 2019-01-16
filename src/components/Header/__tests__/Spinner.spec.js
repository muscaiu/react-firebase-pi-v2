import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Spinner from '../Header';

describe('Header', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(<Spinner />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})
