import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import LogIn from '../../pages/LogIn';

describe('<LogIn />' , () => {
    const login = shallow(<ProviderMock><LogIn /></ProviderMock>);
    const loginDOM = mount(<ProviderMock><LogIn /></ProviderMock>);
    test('render' , () => {
        expect(login.length).toEqual(1)
    });
    test('Verificar redireccionamiento' , () => {
        expect(loginDOM.find('.auth-form__register--link').at(0).props().to).toBe('/register');
    })
})