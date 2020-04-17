import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../Loading';
import { apiConnection } from '../../services/apiConnection';
import { addTeamStats } from '../../store/teams/actions';
import './index.scss';

const Statistics = ({ state: { teams, current }, onAddTeamStats }) => {
    const [status, setStatus] = useState('idle');

    // Try to find team provided by current prop from redux store
    const foundTeam = !!teams.length && current &&
        teams.find(team => team.id === current);

    useEffect(() => {
        // Do nothing when :
        // - 'current' value is not provided
        // - request is in progress.
        // - or current team was found and has stats already so we can load
        // them from our memory (store).
        if (!current || status === 'loading' ||
            (foundTeam && 'stats' in foundTeam)) {
            return;
        }

        // Set loading status and return whenever teams are not occurred yet in
        // store .
        if (teams.length === 0) {
            setStatus('loading');
            return;
        }

        setStatus('loading');

        apiConnection(`teams/${current}/matches?status=FINISHED`)
            .then(r => {
                onAddTeamStats(r.matches, current);
                setStatus('idle');
            });
    }, [current, foundTeam, status, teams.length]);

    return (
        <section className="Statistics app-panel">
            <h2>Statistics {!!teams.length && foundTeam && 'stats' in
            foundTeam && `for ${foundTeam.name}`}</h2>

            {teams.length === 0 &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${foundTeam.name} data`} />}

            {!current && !!teams.length && (
                <p><i>Please select team to display information</i></p>
            )}

            {!!teams.length && foundTeam && 'stats' in foundTeam && (
                <table className="Statistics__table">
                    <tbody>
                    {foundTeam.stats.map(match => (
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
