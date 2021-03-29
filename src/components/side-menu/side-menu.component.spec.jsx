import React from 'react';
import { shallow } from 'enzyme;';
import { SideMenu } from './side-menu.component';

describe.only('<SideMenu />', () => {
    const getWrapper = () => {
        return shallow(<SideMenu></SideMenu>);
    };
    it('should fail', () => {
        const expected = false;
        const result = true;
        const wrapper = getWrapper();

        expect(result).toBe(expected);
    });
});
