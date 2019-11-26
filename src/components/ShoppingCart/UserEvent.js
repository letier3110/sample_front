import React, { useState, useEffect, useRef } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import s from './ShoppingCart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as SettingsIcon } from '../../assets/icons/SettingsButton.svg'
import {
  getEvents,
  getUsers,
  getEventBySlug,
  getRoutes,
  getUserBySlug,
  getIsAdmin,
  getAges
} from '../../state/menu/selectors'

import { ReactComponent as CloseIcon } from '../../assets/ico-close-24.svg'
import { updateScores } from '../../state/menu/actions'
import QRCode from 'qrcode'
import { postParticipant } from '../../api'
// import { Link } from 'react-router-dom'

export const UserEvent = props => {
  const dispatch = useDispatch()

  const history = useHistory()

  const [search, setSearch] = useState('')
  const { eventId, userId } = useParams()
  const canvasRef = useRef()
  const event = useSelector(getEventBySlug)(eventId)
  const rawUser = useSelector(getUserBySlug)(userId)
  const routes = useSelector(getRoutes)
  const isAdmin = useSelector(getIsAdmin)
  const ages = useSelector(getAges)

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, `${window.location.origin}${window.location.pathname}`, function(error) {
      if (error) console.error(error)
      console.log('success!')
    })
  }, [])

  const rawParticipant = event.participants.filter(participant => participant.slug === userId)
  const user =
    rawParticipant.length > 0
      ? { ...rawUser, ...rawParticipant[0], groupAge: ages.filter(age => age.slug === rawUser.groupAge)[0].age }
      : []
  const [localUser, setLocalUser] = useState(user)
  if (rawParticipant.length === 0) return null

  const handleLeftClick = () => {
    history.push(`/settings`)
  }

  const handleCenterClick = () => {
    history.push(`/event/${eventId}`)
  }

  const filterRoutes = routes.filter(r => r.name.indexOf(search) >= 0)

  console.log(user)
  return (
    <>
      <div className={s.menuBar}>
        <div onClick={handleCenterClick} className={s.left}>
          <CloseIcon className={s.iconSvg} />
        </div>
        <div>
          {user.name} ({user.groupAge})
        </div>
        <div></div>
      </div>
      <div className={s.content}>
        {/* <input value={search} onChange={e => setSearch(e.target.value)} placeholder={'Поиск трассы'} /> */}
        <div className={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              {user.name} ({user.groupAge})
            </div>
            <div>
              <canvas ref={canvasRef} id={'userCanvas'} />
            </div>
          </div>
          <div className={s.miniCard}>
            <div>Трасса</div>
            <div>Баллы</div>
            <div>Попыток</div>
          </div>
          <ScoreEditor
            localUser={localUser}
            setLocalUser={setLocalUser}
            isAdmin={isAdmin}
            user={user}
            filterRoutes={filterRoutes}
            routes={routes}
          />
          {isAdmin ? (
            <div
              onClick={_ => {
                // dispatch(updateScores({ ...localUser, event: eventId }))
                postParticipant(dispatch, { user: localUser, slug: eventId })
                history.push(`/event/${eventId}`)
              }}
              className={s.login}
            >
              Обновить
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

const ScoreEditor = ({ user, filterRoutes, routes, isAdmin, localUser, setLocalUser }) => {
  // console.log(localUser.scores)
  let actualUser = localUser
  if (isAdmin === false) {
    actualUser = user
  }
  return localUser.scores
    .filter(score => filterRoutes.filter(fr => score.routeSlug === fr.slug).length > 0)
    .map((score, index) => {
      return (
        <div key={index} className={s.miniCard}>
          <div>{routes.filter(e => e.slug === score.routeSlug)[0].name} </div>
          {!isAdmin ? (
            <div>{score.score}</div>
          ) : (
            <input
              value={score.score}
              onChange={_ => {
                // console.log('[localUser] change', parseInt(_.target.value))
                setLocalUser({
                  ...localUser,
                  scores: localUser.scores.map(e => {
                    // console.log(e.routeSlug === score.slug, e.routeSlug, score.routeSlug)
                    if (e.routeSlug === score.routeSlug) {
                      return { ...e, score: parseInt(_.target.value) }
                    } else {
                      return e
                    }
                  })
                })
              }}
            />
          )}
          {!isAdmin ? (
            <div>{score.attempt}</div>
          ) : (
            <input
              value={score.attempt}
              onChange={_ =>
                setLocalUser({
                  ...localUser,
                  scores: localUser.scores.map(e =>
                    e.routeSlug === score.routeSlug ? { ...e, attempt: parseInt(_.target.value) } : e
                  )
                })
              }
            />
          )}
        </div>
      )
    })
}
