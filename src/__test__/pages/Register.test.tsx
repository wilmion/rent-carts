import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import Register from '../../pages/Register';

describe('<Register />' , () => {
    test('render' , () => {
        const register = shallow(<Register />);

        expect(register.length).toEqual(1);
    })
    test('Comprobar el redireccionamiento al /login' , () => {
        const register = mount(<ProviderMock><Register /></ProviderMock>)

        expect(register.find('.auth-form__register--link').at(0).props().to).toBe('/login')
    })
    
})