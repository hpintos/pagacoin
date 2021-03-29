import React from 'react';
import { shallow } from 'enzyme';
import { Users } from './users.component';

const mockUserService = {
    getAll: jest.fn().mockReturnValue(
        Promise.resolve([
            {
                id: '1',
                name: 'Hernan',
                lastname: 'Pintos',
                email: 'hernan@pintos.com',
                balance: 30000,
            },
            {
                id: '2',
                name: 'Guillermo',
                lastname: 'Lijstentein',
                email: 'guille@lij.com',
                balance: 7000,
            },
        ])
    ),
};

describe('Test <Users> component', () => {
    let spyUseEffect;
    let spyUseContext;
    const getWrapper = () => {
        spyUseEffect = jest.spyOn(React, 'useEffect');
        spyUseContext = jest.spyOn(React, 'useContext');
        spyUseEffect.mockImplementationOnce((f) => f());
        spyUseContext.mockReturnValue(mockUserService);
        return shallow(<Users></Users>);
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should render empty component', async () => {
        const wrapper = getWrapper();
        expect(mockUserService.getAll).toBeCalled();
        expect(wrapper.find('p').text()).toEqual('There are no users');
        expect(wrapper.hasClass('users-wrapper')).toBeTruthy();
    });
});
