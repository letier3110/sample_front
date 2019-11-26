import React, { useState } from 'react'
import { useHistory, Link, useParams, Redirect } from 'react-router-dom'
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
  getAges,
  getOrganizations,
  getDistricts
} from '../../state/menu/selectors'

import { ReactComponent as CloseIcon } from '../../assets/ico-close-24.svg'
import { createUser } from '../../state/menu/actions'
import { postParticipant, postUser } from '../../api'
// import { Link } from 'react-router-dom'

export const NewUser = props => {
  const dispatch = useDispatch()

  const history = useHistory()

  const [search, setSearch] = useState('')
  const { eventId, userId } = useParams()
  const event = useSelector(getEventBySlug)(eventId)
  const routes = useSelector(getRoutes)
  const isAdmin = useSelector(getIsAdmin)
  const ages = useSelector(getAges)
  const [selectedAge, setAge] = useState(ages[0])
  const organizations = useSelector(getOrganizations)
  const [selectedOrg, setOrg] = useState(organizations[0])
  const districts = useSelector(getDistricts)
  const [selectedDist, setDist] = useState(districts[0])
  const [name, setName] = useState('')
  const [gender, setGender] = useState('male')

  const handleLeftClick = () => {
    history.push(`/settings`)
  }

  const handleCenterClick = () => {
    history.push(`/event/${eventId}`)
  }

  const filterRoutes = routes.filter(r => r.name.indexOf(search) >= 0)

  if (isAdmin === false) {
    console.log('fail login')
    return <Redirect to='/' />
  }
  return (
    <>
      <div className={s.menuBar}>
        <div onClick={handleCenterClick} className={s.left}>
          <CloseIcon className={s.iconSvg} />
        </div>
        <div>Новый участник</div>
        <div></div>
      </div>
      <div className={s.content}>
        {/* <input value={search} onChange={e => setSearch(e.target.value)} placeholder={'Поиск трассы'} /> */}
        <div className={s.card}>
          <div>Select age</div>
          <select
            value={selectedAge.slug}
            onChange={e => {
              setAge(ages.filter(age => age.slug === e.target.value)[0])
            }}
          >
            <option disabled>Select age</option>
            {ages.map(age => (
              <option key={age.slug} value={age.slug}>
                {age.age}
              </option>
            ))}
          </select>
          <div>Select organization</div>
          <select
            value={selectedOrg.slug}
            onChange={e => {
              setOrg(organizations.filter(age => age.slug === e.target.value)[0])
            }}
          >
            <option disabled>Select organization</option>
            {organizations.map(age => (
              <option key={age.slug} value={age.slug}>
                {age.name}
              </option>
            ))}
          </select>
          <div>Select district</div>
          <select
            value={selectedDist.slug}
            onChange={e => {
              setDist(districts.filter(age => age.slug === e.target.value)[0])
            }}
          >
            <option disabled>Select district</option>
            {districts.map(age => (
              <option key={age.slug} value={age.slug}>
                {age.name}
              </option>
            ))}
          </select>
          <div>Select gender</div>
          <select
            value={gender}
            onChange={e => {
              setGender(e.target.value)
            }}
          >
            <option disabled>Select gender</option>
            <option value={'female'}>Девочка</option>
            <option value={'male'}>Мальчик</option>
          </select>
          <div>Input name</div>
          <input placeholder='Input name' value={name} onChange={e => setName(e.target.value)} />
          {/* <div className={s.miniCard}>
            <div>Трасса</div>
            <div>Баллы</div>
            <div>Попыток</div>
          </div> */}

          <div
            onClick={_ => {
              const newUser = {
                name,
                groupAge: selectedAge.slug,
                district: selectedDist.slug,
                organization: selectedOrg.slug,
                event: eventId,
                gender,
                scores: event.routes.map(r => {
                  return {
                    routeSlug: r,
                    score: 0,
                    attempt: 0
                  }
                })
              }
              postUser(dispatch, newUser)
              // dispatch(createUser(newUser))
              // postParticipant(dispatch, { user: localUser, slug: eventId })
              history.push(`/event/${eventId}`)
            }}
            className={s.login}
          >
            Обновить
          </div>
        </div>
      </div>
    </>
  )
}
