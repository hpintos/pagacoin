import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './dashboard.component.css';

import { SideMenu } from '../side-menu/side-menu.component';
import { Header } from '../header/header.component';
import { Users } from '../users/users.component';
import { UserContext } from '../../contexts/users.context';
import {
    createTransfersService,
    createUsersService,
    createWalletsService,
} from '../../services/services';
import { Wallets } from '../wallets/wallets.component';
import { UserDetails } from '../user-details/user-details.component';
import { WalletsContext } from '../../contexts/wallets.context';
import { Transfer } from '../transfers/transfer.component';
import { ErrorBoundary } from '../error-boundary/error-boundary.component';
import { Transfers } from '../transfers/transfers.component';
import { TransferContext } from '../../contexts/transfers.context';

export const Dashboard = () => {
    const userService = createUsersService();
    const walletsService = createWalletsService();
    const transfersService = createTransfersService();

    return (
        <BrowserRouter>
            <TransferContext.Provider value={transfersService}>
                <WalletsContext.Provider value={walletsService}>
                    <UserContext.Provider value={userService}>
                        <div className="dashboard-wrapper">
                            <div className="sidebar">
                                <SideMenu></SideMenu>
                            </div>
                            <div className="content">
                                <div className="header">
                                    <Header></Header>
                                </div>
                                <div className="overview">
                                    <ErrorBoundary>
                                        <Switch>
                                            <Route path="/wallets" component={Wallets} />
                                            <Route path="/transfer" component={Transfer}></Route>
                                            <Route path="/transfers" component={Transfers}></Route>
                                            <Route path="/users/:userId" component={UserDetails} />
                                            <Route path="/" component={Users} />
                                        </Switch>
                                    </ErrorBoundary>
                                </div>
                            </div>
                        </div>
                    </UserContext.Provider>
                </WalletsContext.Provider>
            </TransferContext.Provider>
        </BrowserRouter>
    );
};
