import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { RegisterPage } from './pages/RegisterPage'
import { EarlyBirdRegisterPage } from './pages/EarlyBirdRegisterPage'
import { AdminPage } from './pages/AdminPage'
import { CommitteesPage } from './pages/CommitteesPage'
import { CommitteeDetailPage } from './pages/CommitteeDetailPage'
import { SchedulePage } from './pages/SchedulePage'
import { TeamPage } from './pages/TeamPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { DelegatesPage } from './pages/DelegatesPage'
import { FaqPage } from './pages/FaqPage'
import { AwardsPage } from './pages/AwardsPage'
import { ApplyPage } from './pages/ApplyPage'
import { OCApplicationPage } from './pages/OCApplicationPage'
import { SponsorsPage } from './pages/SponsorsPage'
import { PressPage } from './pages/PressPage'
import { VenuePage } from './pages/VenuePage'
import { AccommodationPage } from './pages/AccommodationPage'
import { GalleryPage } from './pages/GalleryPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PortfolioGuidePage } from './pages/PortfolioGuidePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/early-bird" element={<EarlyBirdRegisterPage />} />
        <Route path="/register/early-bird/:registrationId/:step" element={<EarlyBirdRegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/committees" element={<CommitteesPage />} />
        <Route path="/committees/:id" element={<CommitteeDetailPage />} />
        <Route path="/portfolio-guide" element={<PortfolioGuidePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/delegates" element={<DelegatesPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/:flowSlug" element={<OCApplicationPage />} />
        <Route path="/apply/:flowSlug/form" element={<OCApplicationPage />} />
        <Route path="/apply/:flowSlug/:applicationId/confirm" element={<OCApplicationPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/venue" element={<VenuePage />} />
        <Route path="/accommodation" element={<AccommodationPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/refund" element={<LegalPage type="refund" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
