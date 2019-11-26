import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Home } from './components/ShoppingCart/Home'
import { Users } from './components/ShoppingCart/Users'
import { Event } from './components/ShoppingCart/Event'
import { UserEvent } from './components/ShoppingCart/UserEvent'
import { Settings } from './components/ShoppingCart/Settings'
import { NewUser } from './components/ShoppingCart/NewUser'
import { useFetchEvents, useOrdersWebsocket } from './api'

export const App = props => {
  console.log('app')
  useFetchEvents()
  useOrdersWebsocket()

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
