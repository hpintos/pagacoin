import React from 'react';
import { Steps, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import './transfers.css';
import { UserContext } from '../../contexts/users.context';
import { WalletSelector } from '../wallet-selector/wallet-selector.component';
import { WalletsContext } from '../../contexts/wallets.context';

const { Step } = Steps;

export const Transfer = () => {
    const history = useHistory();
    const [current, setCurrent] = React.useState(0);
    const [sender, setSender] = React.useState();
    const [receiver, setReceiver] = React.useState();
    const [amount, setAmount] = React.useState(0);

    const [disableSelctor, setDisableSelctor] = React.useState(true);
    const [disableConfirm, setDisableConfirm] = React.useState(true);

    const [users, setUsers] = React.useState([]);
    const [receiverSelectorUsers, setReceiverSelectorUsers] = React.useState([]);
    const userService = React.useContext(UserContext);
    const walletsService = React.useContext(WalletsContext);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const users = await userService.getAll();
            console.log(users);
            setUsers(users || []);
        };
        fetchUsers();
    }, [userService]);

    const next = () => {
        setCurrent(current + 1);
        if (sender && receiver && amount) {
            setDisableConfirm(false);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onSelectedUser = (user) => {
        setReceiverSelectorUsers(users.filter((u) => u.id !== user.id));
    };

    const onSenderSelected = (senderInfo) => {
        setSender(senderInfo);
        // setTransferInfo({ ...transferInfo, sender: senderInfo });
        setDisableSelctor(false);
    };

    const onReceiverSelected = (receiverInfo) => {
        setReceiver(receiverInfo);
        // setTransferInfo({ ...transferInfo, receiver: receiverInfo });
    };

    const onAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const clearValues = () => {
        setSender(undefined);
        setReceiver(undefined);
        setAmount(0);
    };

    const getFullName = (user) => {
        return user.name + ' ' + user.lastname;
    };

    const confirmTransaction = async () => {
        const transactionResult = await walletsService.transfer({
            senderName: getFullName(sender),
            receiverName: getFullName(receiver),
            senderId: sender.id,
            senderWalletHash: sender.wallet.id,
            receiverId: receiver.id,
            receiverWalletHash: receiver.wallet.id,
            amount,
        });
        if (transactionResult.valid) {
            clearValues();
            message.success('Transaction completed! Redirecting...');
            setTimeout(() => {
                history.push('/users');
            }, 3000);
        } else {
            message.error(transactionResult.message);
        }
    };

    const showResume = sender && receiver && amount;

    const steps = [
        {
            title: 'Transfer',
            content: (
                <>
                    <WalletSelector
                        title={'Select sender'}
                        users={users}
                        selectedUser={sender}
                        onSelectedUser={onSelectedUser}
                        onCompleted={onSenderSelected}
                    />
                    <WalletSelector
                        title={'Select reciever'}
                        disabled={disableSelctor}
                        selectedUser={receiver}
                        users={receiverSelectorUsers}
                        onCompleted={onReceiverSelected}
                    />
                </>
            ),
        },
        {
            title: 'Amount',
            content: (
                <div className="amount-input">
                    <label>Amount to transfer</label>
                    <br />
                    <input type="number" value={amount} onChange={onAmountChange} />
                </div>
            ),
        },
        {
            title: 'Transaction Resume',
            content: showResume && (
                <div className="transfer-resume">
                    <div className="sender">
                        From: <h2>{`${sender.name} ${sender.lastname}`}</h2>
                    </div>
                    <div className="sender">
                        to: <h2>{`${receiver.name} ${receiver.lastname}`}</h2>
                    </div>
                    <div className="amount">
                        Amount: <h2>€{amount}</h2>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="transfer-wrapper">
            <Steps current={current}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={confirmTransaction} disabled={disableConfirm}>
                        Confirm transaction
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};
