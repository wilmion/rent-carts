import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';
import Footer from '../../components/Footer';
import ProviderMock from '../../__mocks__/providerMock';

describe('<Footer />' , () => {
    test('Render Component' , () => {
        const footer = shallow(<Footer />)
        expect(footer.length).toEqual(1);
    })
    test('Debe contener 3 íconos' , () => {
        const footer = shallow(<Footer />);

        expect(footer.find('.footer-icons-icon').length).toEqual(3)
    })
    test('Snapshot ' , () => {
        const footer = create(
            <ProviderMock>
                <Footer />
            </ProviderMock>            
        );
        expect(footer.toJSON()).toMatchSnapshot();  
    })
})
