import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { SocketContext, socket } from '../util/socket_client_util';

import App from './app';

const Root = ({ store }) => (
    <SocketContext.Provider value={socket}>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </SocketContext.Provider>
)

export default Root;