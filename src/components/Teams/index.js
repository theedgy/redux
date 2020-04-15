import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiConnection } from '../../services/apiConnection';
import { addTeams } from '../../store/teams/actions';
import { Error } from '../Error';
import { Loading } from '../Loading';
import './index.scss';
import Team from './components/Team';

const defaultStatus = 'idle';

const Teams = ({ state: { teams, current }, onAddTeams }) => {
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

            <div className="Team__list">
                {!!teams.length && teams.map(team => (
                    <Team key={team.id}
                          team={team}
                          current={current === team.id} />
                ))}
            </div>
        </section>
    );
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
    onAddTeams: teams => dispatch(addTeams(teams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
