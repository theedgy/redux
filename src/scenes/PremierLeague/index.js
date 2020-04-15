import React from 'react';
import Statistics  from '../../components/Statistics';
import Teams from '../../components/Teams';


import './index.scss';

export const PremierLeague = () => {
    return (
        <main className="PremierLeague">
            <Teams />
            <Statistics />
        </main>
    );
};
