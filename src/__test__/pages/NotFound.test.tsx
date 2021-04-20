import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer'; 
import ProviderMock from '../../__mocks__/providerMock';
import NotFound from '../../pages/NotFound';

describe('<Not Found />' , () => {
    test('Render' , () => {
        const not_found = shallow(<NotFound />);

        expect(not_found.length).toEqual(1);
    })
    test('Snapshot' , () => {
        const not_found = create(<ProviderMock><NotFound /></ProviderMock>);

        expect(not_found.toJSON()).toMatchSnapshot();
    }) 
})