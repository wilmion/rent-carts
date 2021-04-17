import React from 'react'
import { mount , shallow } from 'enzyme';
import CartsMock from '../../__mocks__/cartsMock';
import CartCardMoreDetails from '../../components/CartCardMoreDetails';

describe('<CarCardMoreDetails />' , () => {
    test('render' , () => {
        const carDetails = shallow(<CartCardMoreDetails {...CartsMock[0]} />)

        expect(carDetails.length).toEqual(1);
    })
    test('Convertir el tipo de transmición' , () => {
        const typeTransmitionComponent = mount(<CartCardMoreDetails {...CartsMock[0]} />).find('#type-transmition');

        expect(typeTransmitionComponent.text()).toBe('AT')
    })
})