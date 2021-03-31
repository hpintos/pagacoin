import React from 'react';
import { TransferContext } from '../../contexts/transfers.context';
import { Card } from '../card/card.component';
import '../users/users.component.css';

export const Transfers = () => {
    const [transfers, setTransfers] = React.useState([]);
    const transferService = React.useContext(TransferContext);
    React.useEffect(() => {
        const fetchTransfers = async () => {
            const transfers = await transferService.getAll();
            setTransfers(transfers || []);
        };
        fetchTransfers();
    }, [transferService]);

    return (
        <div className="transfers-wrapper">
            {transfers.length !== 0 &&
                transfers.map((transfer, index) => {
                    return (
                        <Card
                            key={index}
                            img={<div className="round-img"></div>}
                            info={
                                <>
                                    <div className="transfer-resume">
                                        <div className="sender">
                                            From: <h2>{transfer.senderName}</h2>
                                        </div>
                                        <div className="sender">
                                            to: <h2>{transfer.receiverName}</h2>
                                        </div>
                                    </div>
                                </>
                            }
                            balance={transfer.amount}
                        ></Card>
                    );
                })}
            {transfers.length === 0 && <p>There are no transfers</p>}
        </div>
    );
};
