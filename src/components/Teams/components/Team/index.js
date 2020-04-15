import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTeam } from '../../../../store/current/actions';

import './index.scss';
const Team = ({team, current, onTeamSelect}) => {
    return (
        <p className="Team">
            <img src={team.crestUrl}
                 alt={`#${team.shortName}`} />

            <a className={current ? 'active' : 'Team-link'}
               href={`#${team.shortName}`}
               onClick={() => onTeamSelect(team.id)}>
                {`${team.name}`}
            </a>
        </p>
    );
};

const mapDispatchToProps = dispatch => ({
    onTeamSelect: teamId => dispatch(setCurrentTeam(teamId))
});

export default connect(null, mapDispatchToProps)(Team);

