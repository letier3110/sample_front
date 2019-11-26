import { propEq, find, isEmpty } from 'ramda'
import store from './state/store'

export const findId = (id, arr) => find(propEq('id', id), arr)
export const findSlug = (slug, arr) => find(propEq('slug', slug), arr)
