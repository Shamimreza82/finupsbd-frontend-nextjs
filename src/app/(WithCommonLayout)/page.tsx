import FAQSection from '@/components/home-page/FAQSection'
import FinancePromo from '@/components/home-page/FinancePromo'
import FinancialProducts from '@/components/home-page/FinancialProducts'
import FinancialToolsSection from '@/components/home-page/FinancialToolsSection'
import HowItWorksWithSignup from '@/components/home-page/HowItWorksWithSignup'
import EligiblityPage from '@/components/home-page/EligiblityPage'

import { StatsSection } from '@/components/home-page/StatsSection'

import React from 'react'

const HomePage = () => {
  return (
    <div>
      <EligiblityPage/>
      <StatsSection/>
      <FinancialProducts />
      <FinancialToolsSection />
      <HowItWorksWithSignup/>
      <FinancePromo />
      <FAQSection />
    </div>
  )
}

export default HomePage