import React from 'react';
import { WalletsContext } from '../../contexts/wallets.context';
import { Select } from 'antd';
import './wallet-selector.css';

const { Option } = Select;

export const WalletSelector = ({
    disabled = false,
    onCompleted,
    onSelectedUser,
    selectedUser: user,
    selectedWallet: wallet,
    users,
    title,
}) => {
    const walletsService = React.useContext(WalletsContext);
    const [selectedUser, setSelectedUser] = React.useState(user);
    const [selectedWallet, setSelectedWallet] = React.useState(wallet);
    const [wallets, setWallets] = React.useState([]);

    const handleUserSelection = async (index) => {
        const user = users[index];
        setSelectedUser(user);
        const fetchedWallets = await walletsService.get(user.id);
        const parsedWallets = Object.entries(fetchedWallets.wallets).map((wallet) => {
            return { id: wallet[0], balance: wallet[1].balance };
        });
        onSelectedUser && onSelectedUser(user);
        setWallets(parsedWallets);
    };

    const handleWalletSelection = (index) => {
        setSelectedWallet(wallets[index]);
        onCompleted && onCompleted({ ...selectedUser, wallet: wallets[index] });
    };
    return (
        <div className="wallet-selection-wrapper">
            <label>{title}</label>
            <br />
            <Select
                disabled={disabled}
                placeholder="Select a user"
                style={{ width: 250 }}
                onChange={handleUserSelection}
            >
                {users.map((user, index) => (
                    <Option key={index}>{user.name + ' ' + user.lastname}</Option>
                ))}
            </Select>
            <Select
                disabled={disabled}
                style={{ width: 250 }}
                placeholder="Select a wallet"
                onChange={handleWalletSelection}
            >
                {wallets.map((wallet, index) => (
                    <Option key={index}>{'Balance: ' + wallet.balance}</Option>
                ))}
            </Select>
        </div>
    );
};
