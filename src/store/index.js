import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { current } from './current/reducres';
import { teams } from './teams/reducres';

export const AppStore = ({ children }) => {
    const store = createStore(
        combineReducers({
            teams,
            current,
        }),
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
