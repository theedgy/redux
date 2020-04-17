import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { currentReducer } from './current/reducres';
import { teamsReducer } from './teams/reducres';

export const AppStore = ({ children }) => {
    const store = createStore(
        combineReducers({
            teams: teamsReducer,
            current: currentReducer,
        }),
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
