import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './side-menu.component.css';

export const SideMenu = () => {
    const history = useHistory();
    return (
        <nav className="side-menu-wrapper">
            <div className="side-menu-header">
                <h2 className="brand-title">Pagacoin</h2>
                <button
                    className="side-menu-transfer-button"
                    onClick={() => {
                        history.push('/transfer');
                    }}
                >
                    Transfer
                </button>
            </div>
            <div className="side-menu-items">
                <NavLink className="menu-item" to="/users">
                    Users
                </NavLink>

                <NavLink className="menu-item" to="/transfers">
                    Transfers
                </NavLink>
            </div>
        </nav>
    );
};
