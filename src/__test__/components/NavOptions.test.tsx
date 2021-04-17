import React from 'react'
import { mount , shallow } from 'enzyme';
import CartsMock from '../../__mocks__/cartsMock';
import NavOptions from '../../components/NavOptions';

type options = ['sección-1' , 'sección2'];

describe('<NavOptions />' , () => {
    test('render' , () => {
        const navOptions = shallow(<NavOptions options={['test' , 'test2']} callback={(render) => render} />)

        expect(navOptions.length).toEqual(1);
    })
})