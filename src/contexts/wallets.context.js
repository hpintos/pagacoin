import React from 'react';

export const WalletsContext = React.createContext({});

export function withWalletsService(Component) {
    return function (props) {
        return <WalletsContext.Consumer>
            {(walletsService) => {
                return <Component {...props} walletsService={walletsService} />
            }
            }
        </WalletsContext.Consumer>
    }
}
