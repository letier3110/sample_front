import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import s from './ShoppingCart.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as CloseIcon } from '../../assets/ico-close-24.svg'
import { validateAdmin } from '../../state/menu/actions'
// import { Link } from 'react-router-dom'

export const Settings = props => {
  // const comment = useSelector(getComment)
  // const tableNum = useSelector(getTableNum)
  // const venueId = useSelector(getVenueId)
  // const venue = useSelector(getVenueById)(venueId)
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const history = useHistory()

  const handleLeftClick = () => {
    history.push(`/`)
  }
  // console.log('[comment]', comment)
  // const ordersInside = orders.filter(e => e.takeout === false).length
  // const ordersTakeout = orders.filter(e => e.takeout === true).length

  return (
    <>
      <div className={s.menuBar}>
        <div onClick={handleLeftClick} className={s.left}>
          <CloseIcon className={s.iconSvg} />
        </div>
        <div>Настройки</div>
        <div></div>
      </div>
      <div style={{ alignItems: 'center' }} className={s.content}>
        <div
          className={s.row}
          onClick={_ => setShow(!show)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Вход для администратора
        </div>
        {show ? (
          <input placeholder={'Email'} className={s.row} value={username} onChange={_ => setUsername(_.target.value)} />
        ) : (
          ''
        )}
        {show ? (
          <input
            placeholder={'password'}
            type={'password'}
            className={s.row}
            value={password}
            onChange={_ => setPassword(_.target.value)}
          />
        ) : (
          ''
        )}
        {show && username.length > 0 ? (
          <div
            onClick={_ => {
              dispatch(validateAdmin({ login: username, password }))
            }}
            className={s.login}
          >
            Войти
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
