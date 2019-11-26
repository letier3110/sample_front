import {
  VALIDATE_ADMIN,
  UPDATE_SCORES,
  CREATE_USER,
  ADD_EVENTS,
  ADD_USERS,
  ADD_AGES,
  ADD_DISTRICTS,
  ADD_ORGS,
  ADD_ROUTES
} from './types'

export const validateAdmin = loginData => ({
  type: VALIDATE_ADMIN,
  payload: { loginData }
})

export const updateScores = userData => ({
  type: UPDATE_SCORES,
  payload: { userData }
})

export const createUser = userData => ({
  type: CREATE_USER,
  payload: { userData }
})

export const addEvents = events => ({
  type: ADD_EVENTS,
  payload: { events }
})

export const addUsers = users => ({
  type: ADD_USERS,
  payload: { users }
})

export const addAges = ages => ({
  type: ADD_AGES,
  payload: { ages }
})

export const addDistricts = districts => ({
  type: ADD_DISTRICTS,
  payload: { districts }
})

export const addOrganizations = organizations => ({
  type: ADD_ORGS,
  payload: { organizations }
})

export const addRoutes = routes => ({
  type: ADD_ROUTES,
  payload: { routes }
})
