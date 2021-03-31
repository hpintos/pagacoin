import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/users.context';
import { WalletsContext } from '../../contexts/wallets.context';
import { Wallets } from '../wallets/wallets.component';

export const UserDetails = (props) => {
    const [user, setUser] = React.useState();
    const [wallets, setWallets] = React.useState([]);
    const userService = React.useContext(UserContext);
    const walletsService = React.useContext(WalletsContext);
    React.useEffect(() => {
        const fetchUser = async () => {
            const user = await userService.get(props.match.params.userId);
            const userWallets = await walletsService.get(props.match.params.userId);
            setUser(user);
            if (userWallets) {
                setWallets(Object.entries(userWallets.wallets));
            }
        };
        fetchUser();
    }, [props.match.params.userId, userService, walletsService]);

    const ownerName = user ? `${user.name} ${user.lastname}` : '';

    return (
        <section className="user-details-wrapper">
            <div className="back-link">
                <Link style={{ fontSize: 'x-large', textDecoration: 'none' }} to="/users">
                    {'🔙'}
                </Link>
            </div>

            {user && (
                <div>
                    <h1>{ownerName}</h1>
                    <span>{user.email}</span>
                    <Wallets wallets={wallets} ownerName={ownerName}></Wallets>
                </div>
            )}
        </section>
    );
};
