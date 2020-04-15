import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiConnection } from '../../services/apiConnection';
import { addTeamStats } from '../../store/teams/actions';
import { Loading } from '../Loading';

import './index.scss';

const Statistics = ({ state: { teams, current }, onAddTeamStats }) => {
    const [status, setStatus] = useState('idle');
    const currentFound = !!teams.length && current &&
        teams.find(team => team.id === current);

    useEffect(() => {
        if (!current) {
            return;
        }

        if (teams.length === 0) {
            setStatus('loading');
            return;
        }

        if (!!teams.length && 'stats' in currentFound) {
            return;
        }

        setStatus('loading');

        apiConnection(`teams/${current}/matches?status=FINISHED`).then(r => {
            if (!r.ok) {
                setStatus(`(${r.type}): ${r.statusText}`);
                return;
            }

            return r.json();
        }).then(r => {
                onAddTeamStats(r.matches, current);
                setStatus('idle');
            },
        ).catch(error => setStatus(`${error}`));

    }, [teams, current, currentFound]);

    return (
        <div className="Statistics app-panel">
            <h2>Statistics {!!teams.length && currentFound && 'stats' in
            currentFound && `for ${currentFound.name}`}</h2>

            {teams.length === 0 &&
            <Loading message={'Waiting for teams load'} />}

            {status === 'loading' &&
            <Loading message={`Downloading ${currentFound.name} data`} />}

            {
                !current && !!teams.length && (
                    <p><i>Please select team to display information</i></p>
                )}

            {
                !!teams.length && currentFound && 'stats' in currentFound && (
                    <table className="Statistics__list">
                        <tbody>

                        {
                            currentFound.stats.map(stat => {
                                return (
                                    <tr key={stat.id} className="draw">
                                        <td>({stat.competition.name})</td>
                                        <td>{stat.homeTeam.name} {stat.score.fullTime.homeTeam} - {stat.score.fullTime.awayTeam} {stat.awayTeam.name}</td>
                                    </tr>);
                            })
                        }
                        </tbody>
                    </table>
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
    onAddTeamStats: (stats, id) => dispatch(addTeamStats(stats, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
