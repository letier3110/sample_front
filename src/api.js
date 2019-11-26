import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import store from './state/store'

import {
  addEvents,
  addUsers,
  addAges,
  addDistricts,
  addOrganizations,
  addRoutes,
  updateScores,
  createUser
} from './state/menu/actions'

export const postParticipant = async (dispatch, payload) => {
  const result = await axios.post(`/api/event/participants`, {
    slug: payload.slug,
    user: payload.user
  })
  dispatch(updateScores({ ...payload.user, event: payload.slug }))
}

export const postUser = async (dispatch, payload) => {
  const result = await axios.post(`/api/user`, {
    name: payload.name,
    groupAge: payload.groupAge,
    district: payload.district,
    organization: payload.organization,
    gender: payload.gender
  })
  dispatch(createUser(payload))
  postParticipant(dispatch, {
    user: {
      slug: result.data,
      scores: payload.scores
    },
    slug: payload.eventId
  })
}

export const useFetchEvents = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchEvents(dispatch)
  }, [])
}

export const fetches = dispatch => {
  fetchEvents(dispatch)
  fetchUsers(dispatch)
  fetchAges(dispatch)
  fetchDistricts(dispatch)
  fetchOrgs(dispatch)
  fetchRoutes(dispatch)
}

export const fetchEvents = async dispatch => {
  const result = await axios.get(`/api/event`)
  console.log(result)
  dispatch(addEvents(result.data))
}

export const fetchUsers = async dispatch => {
  const result = await axios.get(`/api/user`)
  console.log(result)
  dispatch(addUsers(result.data))
}

export const fetchAges = async dispatch => {
  const result = await axios.get(`/api/age`)
  console.log(result)
  dispatch(addAges(result.data))
}

export const fetchDistricts = async dispatch => {
  const result = await axios.get(`/api/district`)
  console.log(result)
  dispatch(addDistricts(result.data))
}

export const fetchOrgs = async dispatch => {
  const result = await axios.get(`/api/organization`)
  console.log(result)
  dispatch(addOrganizations(result.data))
}

export const fetchRoutes = async dispatch => {
  const result = await axios.get(`/api/route`)
  console.log(result)
  dispatch(addRoutes(result.data))
}

export const useOrdersWebsocket = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const eventAddNewParticipant = event => {
      const payload = JSON.parse(event.data)
      dispatch(updateScores({ ...payload.user, event: payload.eventId }))
    }
    const eventAddNewUser = event => {
      const payload = JSON.parse(event.data)
      dispatch(createUser(payload))
    }
    let eventSource
    const setupChannel = () => {
      eventSource = new EventSource('/sse/channel')
      eventSource.onerror = function(event) {
        if (event.target.readyState === EventSource.CONNECTING) {
          console.log('Channel: Reconnecting...')
        } else if (event.target.readyState === EventSource.CLOSED) {
          console.log('Channel: Connection failed permanently. Reconnecting...')
          eventSource.close()
          setTimeout(() => {
            setupChannel()
          }, 2000)
        }
      }
      eventSource.onopen = () => {
        eventSource.addEventListener('add_new_participant', eventAddNewParticipant)
        eventSource.addEventListener('add_new_user', eventAddNewUser)
      }
    }
    setupChannel()
    return () => {
      eventSource.removeEventListener('add_new_participant', eventAddNewParticipant)
      eventSource.removeEventListener('add_new_user', eventAddNewUser)
      eventSource.close()
    }
  }, [])
}
