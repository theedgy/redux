import { ADD_TEAM_STATS, ADD_TEAMS } from './actions';

export const teams = (state = [], action) => {
    switch (action.type) {
    case ADD_TEAMS:
        return [...state, ...action.teams];

    case ADD_TEAM_STATS:
        const newState = [...state];
        const found = newState.find(team => team.id === action.id);
        found['stats'] = action.stats;
        return newState;

    default:
        return state;
    }
};
