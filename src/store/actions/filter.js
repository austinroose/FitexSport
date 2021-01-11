import * as actionTypes from './actionTypes';

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TARTU: 'SHOW_TARTU',
  SHOW_TALLINN: 'SHOW_TALLINN'
}

export const filterByLocation = location => {
    return {
        type: actionTypes.FILTER_BY_LOCATION,
        location: location
    }
}

export const filterBySport = sport => {
    return {
        type: actionTypes.FILTER_BY_SPORT,
        sport: sport
    }
}

export const filterByCoach = name => {
    return {
        type: actionTypes.FILTER_BY_COACH,
        name: name
    }
}

export const filterByDate = date => {
    return {
        type: actionTypes.FILTER_BY_DATE,
        date: date
    }
}

export const filterByType = type => {
    return {
        type: actionTypes.FILTER_BY_TYPE,
        selected_type: type
    }
}

export const filterByGroupName = groupName => {
    return {
        type: actionTypes.FILTER_BY_GROUP_NAME,
        groupName: groupName
    }
}

export const removeFilter = filter => {
    return {
        type: actionTypes.REMOVE_FILTER,
        filter: filter
    }
}

export const removeAllFilters = () => {
    return {
        type: actionTypes.REMOVE_ALL_FILTERS
    }
}