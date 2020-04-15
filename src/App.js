import React from 'react';
import Statistics from './components/Statistics';
import Teams from './components/Teams';
import { AppStore } from './store';
import './App.scss';

function App () {
    return (
        <AppStore>
            <main className="PremierLeague">
                <Teams />
                <Statistics />
            </main>
        </AppStore>
    );
}

export default App;
