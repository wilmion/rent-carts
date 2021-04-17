import React from 'react';
import { mount , shallow } from 'enzyme';
import ErrorWindow from '../../components/ErrorWindow';
import WarningWindow from '../../components/WarningWindows';

describe('<ErrorWindow /> and <WarningWindow />' , () => {
    test('render' , () => {
        const warning = shallow(<WarningWindow message="" cb={() => null} />)
        const error = shallow(<ErrorWindow message="" callback={() => null} />)

        expect(warning.length).toEqual(1);
        expect(error.length).toEqual(1);
    })
})