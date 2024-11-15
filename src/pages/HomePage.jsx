import React from 'react'
import Hero from '../components/Hero'
import ScrollStack from '../components/common/ScrollStack'
import { ResumeActions } from '../components/common/ResumeActions'
import SEO from '../components/SEO'

const HomePage = () => {
     return (
          <div>
               <SEO
        title="Durgesh Bachhav - Full Stack Developer"
        description="Welcome to my portfolio website. I'm a Full Stack Developer specializing in modern web technologies."
        path="/"
      />
               <Hero />
               <ScrollStack />
               <ResumeActions />
          </div>
     )
}

export default HomePage
