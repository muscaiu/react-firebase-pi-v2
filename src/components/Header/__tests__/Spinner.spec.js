import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Spinner from '../Header';

describe('Header', () => {
    it('should match snapshot', () => {
        // const wrapper = shallow(<Spinner />, { context: { store } });
        const wrapper = shallow(<Spinner />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
    it('check if it contains a div', () => {
        const wrapper = shallow(<Spinner />);
        expect(wrapper.find('div').hasClass('preloader')).to.equal(true);
    });


    // it('Comment should be rendered correctly', () => {
    //     // Create the component
    //     const CommentComponent = shallow(<Comment store={mockStore} {...sampleProps} />
    //     );

    //     const commentHeaderComponent = CommentComponent.find('CommentHeader').length;
    //     const CommentBodyComponent = CommentComponent.find('CommentBody');

    //     expect(CommentComponent.length).toEqual(1);
    //     expect(commentHeaderComponent.length).toEqual(1);
    //     expect(CommentBodyComponent.length).toEqual(1);
    // });
})
