import React from 'react'
import { useSelector } from 'react-redux'

export const Loader = ({ children }) => {
  const loaded = useSelector(state => state.loader)
  const childrenArr = React.Children.toArray(children)

  return childrenArr.filter(child => loaded.includes(child.props.name))
}
