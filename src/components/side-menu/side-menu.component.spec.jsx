import React from 'react';
import { shallow } from 'enzyme';
import { SideMenu } from './side-menu.component';
import { NavLink } from 'react-router-dom';

describe('<SideMenu />', () => {
    const getWrapper = () => {
        return shallow(<SideMenu></SideMenu>);
    };
    it('should render component', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('nav')).toHaveLength(1);
    });

    it('should render title', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('h2').text()).toBe('Pagacoin');
    });

    it('should render all options', () => {
        const wrapper = getWrapper();
        expect(wrapper.find(NavLink)).toHaveLength(3);
        expect(wrapper.find(NavLink).at(0).prop('to')).toBe('/transfer');
        expect(wrapper.find(NavLink).at(1).prop('to')).toBe('/users');
        expect(wrapper.find(NavLink).at(2).prop('to')).toBe('/transfers');
    });

    describe('When clicking on transfers button', () => {
        it('should render all options', () => {
            const wrapper = getWrapper();
            wrapper.find('button').simulate('click');
        });
    });
});
