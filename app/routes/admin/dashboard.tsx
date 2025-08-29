import React from 'react'
import { Outlet } from 'react-router'

const dashboard = () => {
  return (
    <div>
      MobileSidbar
      <aside className='w-full max-w-[270px] hidden lg:block'>Sidebar</aside>
      <aside className='children'>
        <Outlet/>
      </aside>
    </div>
  )
}

export default dashboard
