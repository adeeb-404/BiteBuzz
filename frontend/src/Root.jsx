import React from 'react'
import HomeNav from './Components/HomeNav'
import { Outlet } from 'react-router-dom'
function Root() {
  return (
    <><HomeNav/>
    <Outlet/></>
  )
}

export default Root