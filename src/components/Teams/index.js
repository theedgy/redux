import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiConnection } from '../../services/apiConnection';
import { setCurrentTeam } from '../../store/current/actions';
import { addTeams } from '../../store/teams/actions';
import { Error } from '../Error';
import { Loading } from '../Loading';
import './index.scss';

const defaultStatus = 'idle';

const Teams = ({ state:{teams, current}, onTeamSelect, onAddTeams }) => {
    const [status, setStatus] = useState(defaultStatus);

    useEffect(() => {
        if (teams.length > 0) {
            return;
        }

        setStatus('loading');

        apiConnection('competitions/2021/teams').then(r => {
            if (!r.ok) {
                setStatus(`Error (${r.type}): ${r.statusText}`);
                return;
            }

            return r.json();
        }).then(r => {
                onAddTeams(r.teams);
                setStatus(defaultStatus);
            },
        ).catch(error => setStatus(`${error}`));

        // eslint-disable-next-line
    }, [teams]);

    return (
        <section className="Teams app-panel">
            <h2>Teams</h2>

            {(status === 'loading') &&
            <Loading message="Loading Teams..." />}

            {!['idle', 'loading'].includes(status) && (
                <Error message={status} />
            )}

            <ul>
                {!!teams.length && teams.map(team => (
                    <li key={team.id}>
                        <img src={team.crestUrl}
                             alt={`#${team.shortName}`} />

                        <a className={current === team.id ? 'active' : 'app-link'}
                            href={`#${team.shortName}`}
                           onClick={() => onTeamSelect(team.id)}>
                            {`${team.name}`}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const mapStateToProps = state => ({state});

const mapDispatchToProps = dispatch => ({
    onTeamSelect: teamId => dispatch(setCurrentTeam(teamId)),
    onAddTeams: teams => dispatch(addTeams(teams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
