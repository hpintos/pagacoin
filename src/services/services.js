const URL = 'http://localhost:5000';
export function createUsersService() {
    return {
        get: async (userId) => {
            const user = await fetch(`${URL}/users/${userId}`);
            return user.json();
        },
        getAll: async () => {
            const users = await fetch(`${URL}/users`);
            return users.json();
        },
        update: async (userId, data) => {

        },
    };
}

export function createWalletsService() {
    return {
        get: async (userId) => {
            const wallet = await fetch(`${URL}/wallets/${userId}`);
            return wallet.json();
        },
        getAll: async () => {
            const wallets = await fetch(`${URL}/wallets`);
            return wallets.json();
        },
        transfer: async (data) => {
            const transfer = await fetch(`${URL}/wallets/transfer`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            return transfer.json();
        },
    };
}

export function createTransfersService() {
    return {
        getAll: async () => {
            const transfers = await fetch(`${URL}/transfers`);
            return transfers.json();
        },
    };
}
