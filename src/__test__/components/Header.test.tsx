import React from 'react';
import { mount , shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import ProviderMock from '../../__mocks__/providerMock';
import Header from '../../components/Header';

describe('<Header />' , () => {
    test('Render Component' , () => {
        const header = shallow(<ProviderMock><Header /></ProviderMock>);
        expect(header.length).toEqual(1);
    })
    test('Snapshot' , () => {
        const headerJSON = create(<ProviderMock><Header /></ProviderMock>).toJSON();
        expect(headerJSON).toMatchSnapshot();
    })
})