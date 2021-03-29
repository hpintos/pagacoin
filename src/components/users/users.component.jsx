import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/users.context';
import { Card } from '../card/card.component';
import './users.component.css';

export const Users = (props) => {
    const [users, setUsers] = React.useState([]);
    const userService = React.useContext(UserContext);
    React.useEffect(() => {
        const fetchUsers = async () => {
            const users = await userService.getAll();
            console.log(users);
            setUsers(users || []);
        };
        fetchUsers();
    }, [userService]);

    return (
        <div className="users-wrapper">
            {users.length !== 0 &&
                users.map((user) => {
                    return (
                        <Link to={`/users/${user.id}`} key={user.id}>
                            <Card
                                img={<div className="round-img"></div>}
                                info={
                                    <>
                                        <h4>{`${user.name} ${user.lastname}`}</h4>
                                        <p>{user.email}</p>
                                    </>
                                }
                                balance={user.balance}
                            ></Card>
                        </Link>
                    );
                })}
            {users.length === 0 && <p>There are no users</p>}
        </div>
    );
};
