import React from 'react';
import { mount , shallow } from 'enzyme';
import ProviderMock from '../../__mocks__/providerMock';
import Home from '../../pages/Home';

describe('<Home />' , () => {
    test('Render Component' , () => {
        const home = shallow(<ProviderMock><Home /></ProviderMock>);
        expect(home.length).toEqual(1);
    })

})