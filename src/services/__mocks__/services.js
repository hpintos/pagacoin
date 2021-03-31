const fakeUsers = [
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
];

export function createUsersService() {
    return {
        getAll: async () => {
            const users = await new Promise(resolve => {
                resolve(fakeUsers);
            });
            return users;
        },
    };

}