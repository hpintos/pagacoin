import React from 'react';
import { NavLink } from 'react-router-dom';

import './side-menu.component.css';

export const SideMenu = () => {
    return (
        <nav className="side-menu-wrapper">
            <div className="side-menu-header">
                <h2 className="brand-title">Pagacoin</h2>
                <button className="side-menu-transfer-button">
                    <NavLink style={{ color: 'white' }} to="/transfer">
                        Transfer
                    </NavLink>
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
