import { combineReducers } from 'redux'
import menu from './menu'
import shared from './shared'
import storage from 'redux-persist/lib/storage'

const localPersistConfig = {
  key: 'local',
  storage
}

const combinedReducer = combineReducers({
  menu
})

export const rootReducer = (state, action) => {
  const intermediateState = combinedReducer(state, action)
  const finalState = shared(intermediateState, action)
  return finalState
}
