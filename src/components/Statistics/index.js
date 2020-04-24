import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../Loading';
import { apiConnection } from '../../services/apiConnection';
import { addTeamStats } from '../../store/teams/actions';
import './index.scss';

const Statistics = ({ state: { teams, current }, onAddTeamStats }) => {
    const [status, setStatus] = useState('idle');
    const [currentTeam, setCurrentTeam] = useState(null);

    useEffect(() => {
        // Try to find team provided by current prop from redux store
        const found = teams && current &&
            teams.find(team => team.id === current);

        // If the team at given id was found in store and it's different than
        // existing we have stored already then we want to update state of it.
        if (found && found !== currentTeam) {
            setCurrentTeam(found);
        }
    }, [current, currentTeam, teams]);

    useEffect(() => {
        // Do nothing when :
        // - 'current' value is not provided
        // - request is in progress.
        // - or current team was found and has stats already so we can load
        // them from our memory (store).
        if (!current
            || status === 'loading'
            || (currentTeam && 'stats' in currentTeam)) {
            return;
        }

        setStatus('loading');

        // Handle Api connection to retrieve latest matches for selected team
        apiConnection(`teams/${current}/matches?status=FINISHED`)
            .then(r => {
                onAddTeamStats(r.matches, current);
                setStatus('idle');
            });
    }, [current, currentTeam, onAddTeamStats, status]);

    return (
        <section className="Statistics app-panel">
            <h2>Statistics</h2>

            {!teams &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${currentTeam.name} data`} />}

            {teams && (
                !current
                    ? <p><i>Please select team to display information</i></p>
                    : <table className="Statistics__list">
                        <tbody>
                        {currentTeam.stats.map(match => (
                            <tr key={match.id}>
                                <td>({match.competition.name})</td>
                                <td>{match.homeTeam.name} {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam} {match.awayTeam.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            )}
        </section>
    );
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
    onAddTeamStats: (stats, id) => dispatch(addTeamStats(stats, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
