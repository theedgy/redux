import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { apiConnection } from '../../services/apiConnection';
import { addTeams } from '../../store/teams/actions';
import { Error } from '../Error';
import { Loading } from '../Loading';
import './index.scss';
import Team from './components/Team';

const Teams = ({ state: { teams, current }, onAddTeams }) => {
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        // Do nothing when request is in progress or teams already stored
        if (!!teams.length || status === 'loading') {
            return;
        }

        setStatus('loading');

        apiConnection('competitions/2021/teams').then(r => {
            onAddTeams(r.teams);
            setStatus('success');
        });

    }, [teams, status]);

    return (
        <section className="Teams app-panel">
            <h2>Teams</h2>

            {(status === 'loading') &&
            <Loading message="Loading Teams..." />}

            {!['idle', 'loading', 'success'].includes(status) && (
                <Error message={status} />
            )}

            {!!teams.length && (
                <div className="Team__list">
                    {teams.map(team => (
                        <Team key={team.id}
                              team={team}
                              current={current === team.id} />
                    ))}
                </div>
            )}

        </section>
    );
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
    onAddTeams: teams => dispatch(addTeams(teams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
