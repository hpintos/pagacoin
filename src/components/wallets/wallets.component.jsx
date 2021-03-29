import React from 'react';
import { Card } from '../card/card.component';

export const Wallets = ({ wallets, ownerName }) => {
    return (
        <>
            <h4>Wallets</h4>
            {wallets.length === 0 ? (
                <em>No wallets</em>
            ) : (
                <div>
                    {wallets &&
                        wallets.map((wallet, index) => {
                            return (
                                <Card
                                    key={index}
                                    img={<>💶</>}
                                    info={<span>Owner: {ownerName}</span>}
                                    balance={wallet[1].balance}
                                />
                            );
                        })}
                </div>
            )}
        </>
    );
};
