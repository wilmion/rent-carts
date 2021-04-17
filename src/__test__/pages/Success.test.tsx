import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import { create } from 'react-test-renderer';
import Success from '../../pages/Success';

describe('<Success />' , () => {
    test('render' , () => {
        const success = shallow(<Success />);

        expect(success.length).toEqual(1);
    })
    test('Snapshot ' , () => {
        const success = create(<ProviderMock><Success /></ProviderMock>);

        expect(success.toJSON()).toMatchSnapshot();
    })
})