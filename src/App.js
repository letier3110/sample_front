import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Home } from './components/ShoppingCart/Home'
import { Users } from './components/ShoppingCart/Users'
import { Event } from './components/ShoppingCart/Event'
import { UserEvent } from './components/ShoppingCart/UserEvent'
import { Settings } from './components/ShoppingCart/Settings'
import { NewUser } from './components/ShoppingCart/NewUser'
import { useFetchEvents, useOrdersWebsocket, fetchEvents, fetches } from './api'

export const App = props => {
  console.log('app')
  const dispatch = useDispatch()
  const [timeLeft, setTimeLeft] = React.useState(0)

  React.useEffect(() => {
    // useOrdersWebsocket()
    // console.log('init')
    setTimeout(() => {
      setTimeLeft(Date.now())
      // console.log('init2')
    }, 30000)
  }, [timeLeft])

  React.useEffect(() => {
    fetches(dispatch)
    // console.log('init3')
  }, [timeLeft])

  return (
    <>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/event/:eventId' component={Event} />
        <Route exact path='/event/:eventId/newUser' component={NewUser} />
        <Route exact path='/event/:eventId/user/:userId' component={UserEvent} />
        <Route exact path='/user/:userId' component={Home} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/route/:routeId' component={Home} />
        <Route exact path='/sector/:sectorId' component={Home} />
        <Route path='/register' component={Home} />
        <Route path='/runner' component={Home} />
        <Route path='/dashboard' component={Home} />
        <Route path='/settings' component={Settings} />
      </Router>
    </>
  )
}
