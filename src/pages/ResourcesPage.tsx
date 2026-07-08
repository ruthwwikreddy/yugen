import { PageLayout, ResourceList } from '../components/yugen/PageLayout'
import { getResources } from '../lib/yugen'

export function ResourcesPage() {
  const resources = getResources()

  return (
    <PageLayout
      title="Resources | Yūgen Summit 6.0"
      description="Rules of Procedure, study guides, delegate handbook, and resources for Yūgen Summit 6.0 delegates."
      path="/resources"
      eyebrow="Resources"
      headline="Delegate resources"
      subheadline="RoP, study guides, and handbooks — all in one place. PDFs publish as committees and registration go live."
    >
      <ResourceList items={resources} />
    </PageLayout>
  )
}
