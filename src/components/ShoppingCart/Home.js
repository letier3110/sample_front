import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import s from './ShoppingCart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as SettingsIcon } from '../../assets/icons/SettingsButton.svg'
import { getEvents } from '../../state/menu/selectors'
// import { Link } from 'react-router-dom'

export const Home = props => {
  const dispatch = useDispatch()

  const history = useHistory()

  const events = useSelector(getEvents)

  console.log('home')

  const handleLeftClick = () => {
    history.push(`/settings`)
  }

  const handleCenterClick = () => {
    history.push(`/`)
  }

  const handleRightClick = () => {
    history.push(`/users`)
  }
  return (
    <>
      <div className={s.menuBar}>
        <div onClick={handleLeftClick} className={s.left}>
          <SettingsIcon className={s.iconSvg} />
        </div>
        <div onClick={handleCenterClick}>Последние события</div>
        {/* <div onClick={handleRightClick} className={s.right}>
          <SettingsIcon className={s.iconSvg} />
        </div> */}
      </div>
      <div className={s.content}>
        {events.map(event => (
          <Link key={event.slug} to={`/event/${event.slug}`} className={s.card}>
            <div>{event.name}</div>
            {new Date() - new Date(event.dateStart) > 0 && new Date() - new Date(event.dateEnd) < 0 ? (
              <div className={s.liveCard}>
                <div className={s.liveBub}></div>
                <div>LIVE</div>
              </div>
            ) : (
              ''
            )}
          </Link>
        ))}
      </div>
    </>
  )
}
