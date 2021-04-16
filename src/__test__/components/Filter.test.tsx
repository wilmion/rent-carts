import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import Filter from '../../components/Filter';

describe('<Filter />' , () => {
    test('render' , () => {
        const filter = shallow(<Filter onclick={() => null} title="example" />)

        expect(filter.length).toEqual(1);
    })
    test('La funcion se llama una vez' , () => {
        const actionClick = jest.fn();
        const filter = mount(
            <ProviderMock>
                <Filter 
                    title="Example Filter"
                    onclick={actionClick}
                />
            </ProviderMock>
        )
        filter.find('.home-filters-filter').simulate('click');
        expect(actionClick).toBeCalledTimes(1);
    })
})