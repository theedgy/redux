import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTeam } from '../../../../store/current/actions';
import './index.scss';

const Team = ({ team, state: { current }, onTeamSelect }) => {
    return (
        <p className="Team">
            <img src={team.crestUrl}
                 alt={team.shortName} />

            <button
                type="button"
                className={`Team-link${current ? ' active' : ''}`}
                name={team.shortName}
                onClick={() => onTeamSelect(team.id)}
            >
                {team.name}
            </button>
        </p>
    );
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
    onTeamSelect: teamId => dispatch(setCurrentTeam(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);

