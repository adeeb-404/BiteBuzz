import React from 'react'
import CanteenList from '../Components/mainPage/CanteenList'
import Dashboard from '../Components/mainPage/Dashboard'

function MainPage() {
  return (
    <div className='flex w-100vh h-full'>
        <CanteenList/>
        <Dashboard />
    </div>
  )
}

export default MainPage