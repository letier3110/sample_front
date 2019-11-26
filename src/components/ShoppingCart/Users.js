import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import s from './ShoppingCart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as SettingsIcon } from '../../assets/icons/SettingsButton.svg'
import { getEvents, getUsers } from '../../state/menu/selectors'

import { ReactComponent as CloseIcon } from '../../assets/ico-close-24.svg'
// import { Link } from 'react-router-dom'

export const Users = props => {
  const dispatch = useDispatch()

  const history = useHistory()

  const [search, setSearch] = useState('')

  // const events = useSelector(getEvents)
  const rawUsers = useSelector(getUsers)

  const handleLeftClick = () => {
    history.push(`/settings`)
  }

  const handleCenterClick = () => {
    history.push(`/`)
  }

  const users = rawUsers.filter(e => e.name.indexOf(search) >= 0)

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
        <input value={search} onChange={e => setSearch(e.target.value)} />
        {users.map(user => (
          <Link key={user.slug} to={`/user/${user.slug}`} className={s.card}>
            <div>
              {user.name} ({user.groupAge})
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
