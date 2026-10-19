import { MotionConfig } from 'framer-motion'

import { AppShell } from '@/components/layout/AppShell'
import { DiscoverySection } from '@/components/discovery/DiscoverySection'
import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { ImpactPassportSection } from '@/components/passport/ImpactPassportSection'
import { ProjectSection } from '@/components/projects/ProjectSection'
import { TransformationSection } from '@/components/transformation/TransformationSection'
import { AllocationReviewSection } from '@/components/tokens/AllocationReviewSection'
import { AllocationProvider } from '@/state/AllocationProvider'
import { DiscoveryProvider } from '@/state/DiscoveryProvider'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AllocationProvider>
        <DiscoveryProvider>
          <AppShell>
            <HeroSection />
            <DiscoverySection />
            <ProjectSection />
            <TransformationSection />
            <AllocationReviewSection />
            <ImpactPassportSection />
            <HowItWorksSection />
          </AppShell>
        </DiscoveryProvider>
      </AllocationProvider>
    </MotionConfig>
  )
}
