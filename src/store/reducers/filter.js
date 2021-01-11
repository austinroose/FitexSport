import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    type: null,
    location: null,
    sport: null,
    date: null,
    coachName: null,
    groupName: null,
}

const filterByLocation = (state, action) => {
    return updateObject(state, {
        location: action.location
    })
}

const filterBySport = (state, action) => {
    return updateObject(state, {
        sport: action.sport
    })
}

const filterByDate = (state, action) => {
    return updateObject(state, {
        date: action.date
    })
}

const filterByCoach = (state, action) => {
    return updateObject(state, {
        coachName: action.name
    })
}

const filterByType = (state, action) => {
    return updateObject(state, {
        type: action.selected_type
    })
}

const filterByGroupName = (state, action) => {
    return updateObject(state, {
        groupName: action.groupName
    })
}

const removeFilter = (state, action) => {
    return updateObject(state, {
        filter: action.filter
    })
}

const removeAllFilters = (state, action) => {
    return updateObject(state, {
        location: null,
        sport: null,
        date: null
    })
}

const filter = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FILTER_BY_LOCATION: return filterByLocation(state, action);
        case actionTypes.FILTER_BY_SPORT: return filterBySport(state, action);
        case actionTypes.FILTER_BY_DATE: return filterByDate(state, action);
        case actionTypes.FILTER_BY_COACH: return filterByCoach(state, action);
        case actionTypes.FILTER_BY_TYPE: return filterByType(state, action);
        case actionTypes.FILTER_BY_GROUP_NAME: return filterByGroupName(state, action);
        case actionTypes.REMOVE_FILTER: return removeFilter(state, action);
        case actionTypes.REMOVE_ALL_FILTERS: return removeAllFilters(state, action);
        default:
            return state;
    }
}

export default filter;