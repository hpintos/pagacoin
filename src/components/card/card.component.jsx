import React from 'react';
export const Card = ({ img, info, balance }) => {
    return (
        <div className="user-card">
            <div className="left-info">
                <div className="user-img">{img}</div>
                <div className="user-info">{info}</div>
            </div>
            <div className="right-info">
                <div className="user-balance">
                    <p className="balance">{balance}</p>
                </div>
            </div>
        </div>
    );
};
