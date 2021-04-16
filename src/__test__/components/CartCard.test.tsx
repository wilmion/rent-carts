import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import cartsMock from '../../__mocks__/cartsMock';
import CarCard from '../../components/cartCard';

describe('<CarCard />' , () => {
    test('render' , () => {
        const carCard = shallow(<CarCard {...cartsMock[0]} />);

        expect(carCard.length).toEqual(1);
    })
    test('prop no indefinido' , () => {
        const carCard = mount(<ProviderMock><CarCard {...cartsMock[0]}/></ProviderMock>);

        expect(carCard.find('.cart-card__name').text()).toEqual(cartsMock[0].name)
    })
})