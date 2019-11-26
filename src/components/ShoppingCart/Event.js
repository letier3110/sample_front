import React, { useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import s from './ShoppingCart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as SettingsIcon } from '../../assets/icons/SettingsButton.svg'
import {
  getEvents,
  getUsers,
  getEventBySlug,
  getRoutes,
  getIsAdmin,
  getAges,
  getOrganizations
} from '../../state/menu/selectors'

import { ReactComponent as CloseIcon } from '../../assets/ico-close-24.svg'
// import { Link } from 'react-router-dom'

export const Event = props => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(getIsAdmin)

  const history = useHistory()

  const [search, setSearch] = useState('')
  const { eventId } = useParams()
  const event = useSelector(getEventBySlug)(eventId)
  const ages = useSelector(getAges)
  const organizations = useSelector(getOrganizations)
  const rawUsers = useSelector(getUsers)
  const routes = useSelector(getRoutes)

  const rawParticipants = rawUsers
    .filter(user => event.participants.filter(participant => participant.slug === user.slug).length > 0)
    .map(user => {
      return { ...user, groupAge: ages.filter(age => age.slug === user.groupAge)[0].age }
    })

  const ageSections = rawParticipants.map(user => user.groupAge).filter(onlyUnique)
  const genderSections = rawParticipants.map(user => user.gender).filter(onlyUnique)

  var totalSection = []

  for (var i = 0; i < ageSections.length; i++) {
    for (var j = 0; j < genderSections.length; j++) {
      totalSection.push({
        age: ageSections[i],
        gender: genderSections[j]
      })
    }
  }

  const users = rawParticipants
    .map(user => {
      const partic = event.participants.filter(participant => participant.slug === user.slug)[0]
      return { ...user, scores: partic.scores }
    })
    .sort((b, a) => {
      const totalA = a.scores.reduce((prev, current) => {
        return prev + current.score
      }, 0)
      const totalB = b.scores.reduce((prev, current) => {
        return prev + current.score
      }, 0)
      return totalA - totalB
    })

  const handleLeftClick = () => {
    history.push(`/settings`)
  }

  const handleCenterClick = () => {
    history.push(`/`)
  }

  return (
    <>
      <div className={s.menuBar}>
        <div onClick={handleCenterClick} className={s.left}>
          <CloseIcon className={s.iconSvg} />
        </div>
        <div onClick={handleCenterClick}>Участники</div>
        <div></div>
      </div>
      <div className={s.content}>
        <div style={{ margin: '16px 4px', display: 'flex', justifyContent: 'center' }}>{event.name}</div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={'Поиск участника по имени'} />
        {isAdmin ? (
          <Link to={`/event/${eventId}/newUser`} className={s.login}>
            Добавить участника
          </Link>
        ) : (
          ''
        )}
        {totalSection.map(section => (
          <div className={s.section}>
            <div className={s.sectionHeader}>
              {section.age} {section.gender === 'male' ? 'Мальчики' : 'Девочки'}
            </div>
            {users
              .filter(user => user.groupAge === section.age && user.gender === section.gender)
              .map((user, index) => (
                <RenderUser search={search} key={index} index={index} user={user} eventId={eventId} />
              ))}
          </div>
        ))}
      </div>
    </>
  )
}

const RenderUser = ({ user, eventId, index, search }) => (
  <Link
    style={{ display: user.name.indexOf(search) >= 0 ? 'block' : 'none' }}
    key={user.slug}
    to={`/event/${eventId}/user/${user.slug}`}
    className={s.card}
  >
    <div>
      {index + 1} {user.name} ({user.groupAge})
    </div>
    {/* {user.scores.map(score => {
  return (
    <div>
      {routes.filter(e => e.slug === score.routeSlug)[0].name} трасса, {score.score} балов
    </div>
  )
})} */}
    <div>
      Сумма балов:{' '}
      {user.scores.reduce((prev, current) => {
        return prev + current.score
      }, 0)}
    </div>
  </Link>
)

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
