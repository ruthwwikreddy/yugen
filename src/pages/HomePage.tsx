import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { Hero } from '../components/yugen/Hero'
import { StatsSection } from '../components/yugen/StatsSection'
import { AboutSection } from '../components/yugen/AboutSection'
import { CommitteesSection } from '../components/yugen/CommitteesSection'
import { ScheduleSection } from '../components/yugen/ScheduleSection'
import { VenuesSection } from '../components/yugen/VenuesSection'
import { DressCodeSection } from '../components/yugen/DressCodeSection'
import { SecretariatSection } from '../components/yugen/SecretariatSection'
import { GallerySection } from '../pages/GalleryPage'
import { NotifyCTA } from '../components/yugen/NotifyCTA'

export function HomePage() {
  return (
    <Shell>
      <SEO path="/" />
      <Hero />
      <StatsSection />
      <AboutSection />
      <CommitteesSection />
      <ScheduleSection />
      <VenuesSection />
      <DressCodeSection />
      <SecretariatSection />
      <GallerySection />
      <NotifyCTA />
    </Shell>
  )
}
