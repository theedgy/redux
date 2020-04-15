import React from 'react';
import { PremierLeague } from './scenes/PremierLeague';
import { AppStore } from './store';
import './App.scss';

function App () {
    return (
        <AppStore>
            <PremierLeague />
        </AppStore>
    );
}

export default App;
