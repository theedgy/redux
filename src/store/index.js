import React  from 'react';
import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';
import { current } from './current/reducres';
import { teams } from './teams/reducres';

export const initialState = {
    teams: [],
    current: null
};

export const AppStore = ({children}) => {
    const store = createStore(
        combineReducers({
            teams,
            current
        })
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
