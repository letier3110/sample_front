import { findId, findSlug } from '../../utils'

// export const getOptions = store => store.menu.options
export const getEvents = store => store.menu.events
export const getRoutes = store => store.menu.routes
export const getEventBySlug = store => slug => findSlug(slug, store.menu.events)
export const getUsers = store => store.menu.users
export const getIsAdmin = store => store.menu.isAdmin
export const getAges = store => store.menu.ages
export const getOrganizations = store => store.menu.organizations
export const getDistricts = store => store.menu.districts
export const getUserBySlug = store => slug => findSlug(slug, store.menu.users)
