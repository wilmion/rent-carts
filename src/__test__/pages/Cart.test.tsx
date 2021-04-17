import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import Cart from '../../pages/Cart';

describe('<Cart />' , () => {
    test('render' , () => {
        const cart = shallow(<ProviderMock><Cart /></ProviderMock>);

        expect(cart.length).toEqual(1);
    })
})