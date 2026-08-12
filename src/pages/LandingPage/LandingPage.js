import React from 'react'
import HeroSection from './HeroSection'
import CategoriesSection from './CategoriesSection'
import FooterSection from './FooterSection'
import HowItWorks from './HowItWorksSection'
import JoinTranzoop from './JoinTranzoop'

const LandingPage = () => {
  return (
    <div>
      <HeroSection/>
      <CategoriesSection/>
      <HowItWorks/>
      <JoinTranzoop/>
      <FooterSection/>
    </div>
  )
}

export default LandingPage