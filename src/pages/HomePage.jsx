import React from 'react'
import Hero from '../components/Hero'
import ScrollStack from '../components/common/ScrollStack'
import { ResumeActions } from '../components/common/ResumeActions'

const HomePage = () => {
     return (
          <div>
               <Hero />
               <ScrollStack />
               <ResumeActions />
          </div>
     )
}

export default HomePage
