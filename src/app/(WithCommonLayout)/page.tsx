import FAQSection from '@/components/home-page/FAQSection'
import FinancePromo from '@/components/home-page/FinancePromo'
import FinancialProducts from '@/components/home-page/FinancialProducts'
import FinancialToolsSection from '@/components/home-page/FinancialToolsSection'
import HowItWorksWithSignup from '@/components/home-page/HowItWorksWithSignup'
import LoansPage from '@/components/home-page/LoansPage'
import { StatsSection } from '@/components/home-page/StatsSection'

import React from 'react'

const HomePage = () => {
  return (
    <div>
      <LoansPage/>
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