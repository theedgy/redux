import React, { Profiler } from 'react';
import Statistics from './components/Statistics';
import Teams from './components/Teams';
import { AppStore } from './store';
import './App.scss';

export const App = () => {
    const callback = (id, state, actual) => state === 'mount' &&
        console.log(`Render time: ${actual}`);

    return (
        <Profiler id={'App'} onRender={callback}>
            <AppStore>
                <main className="PremierLeague">
                    <Teams />
                    <Statistics />
                </main>
            </AppStore>
        </Profiler>
    );
};
