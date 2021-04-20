import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer'; 
import ProviderMock from '../../__mocks__/providerMock';
import About from '../../pages/About';

describe('<About />' , () => {
    test('render' , () => {
        const about = shallow(<About />)
        expect(about.length).toEqual(1)
    })
    test('Snapshot' , () => {
        const about = create(<ProviderMock><About /></ProviderMock>);

        expect(about.toJSON()).toMatchSnapshot();
    })
})