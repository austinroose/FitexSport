import { combineReducers } from 'redux'
import auth from './auth'
import filter from './filter'

export const rootReducer = combineReducers({
  auth,
  filter
})