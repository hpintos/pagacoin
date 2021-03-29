import React from 'react';

export const UserContext = React.createContext({});

export function withUserService(Component) {
    return function (props) {
        return <UserContext.Consumer>
            {(userService) => {
                return <Component {...props} userService={userService} />
            }
            }
        </UserContext.Consumer>
    }
}
