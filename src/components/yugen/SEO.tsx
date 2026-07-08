import { useEffect, useMemo } from 'react'
import { YUGEN_SEO } from '../../lib/yugen'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  jsonLd?: Record<string, unknown>
}

export function SEO({ title, description, path = '', jsonLd }: SEOProps) {
  const pageTitle = title ?? YUGEN_SEO.title
  const pageDesc = description ?? YUGEN_SEO.description
  const url = `${YUGEN_SEO.siteUrl}${path}`
  const image = `${YUGEN_SEO.siteUrl}${YUGEN_SEO.ogImage}`

  const schema = useMemo(
    () =>
      jsonLd ?? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Yūgen Summit 6.0',
        description: YUGEN_SEO.description,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'P. Obul Reddy Public School',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Yūgen Summit',
          url: YUGEN_SEO.siteUrl,
        },
      },
    [jsonLd],
  )

  const schemaJson = JSON.stringify(schema)

  useEffect(() => {
    document.title = pageTitle

    // Remove any existing extra og:image tags
    const allOgImages = document.querySelectorAll('meta[property="og:image"]')
    allOgImages.forEach((img, index) => {
      if (index > 0) {
        img.remove()
      }
    })
    const allTwitterImages = document.querySelectorAll('meta[name="twitter:image"]')
    allTwitterImages.forEach((img, index) => {
      if (index > 0) {
        img.remove()
      }
    })

    const tags: { selector: string; attrs: Record<string, string> }[] = [
      { selector: 'meta[name="description"]', attrs: { name: 'description', content: pageDesc } },
      { selector: 'link[rel="canonical"]', attrs: { rel: 'canonical', href: url } },
      { selector: 'meta[property="og:type"]', attrs: { property: 'og:type', content: 'website' } },
      { selector: 'meta[property="og:title"]', attrs: { property: 'og:title', content: pageTitle } },
      { selector: 'meta[property="og:description"]', attrs: { property: 'og:description', content: pageDesc } },
      { selector: 'meta[property="og:url"]', attrs: { property: 'og:url', content: url } },
      { selector: 'meta[property="og:image"]', attrs: { property: 'og:image', content: image } },
      { selector: 'meta[property="og:image:width"]', attrs: { property: 'og:image:width', content: '1200' } },
      { selector: 'meta[property="og:image:height"]', attrs: { property: 'og:image:height', content: '630' } },
      { selector: 'meta[property="og:site_name"]', attrs: { property: 'og:site_name', content: 'Yūgen Summit' } },
      { selector: 'meta[name="twitter:card"]', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { selector: 'meta[name="twitter:title"]', attrs: { name: 'twitter:title', content: pageTitle } },
      { selector: 'meta[name="twitter:description"]', attrs: { name: 'twitter:description', content: pageDesc } },
      { selector: 'meta[name="twitter:image"]', attrs: { name: 'twitter:image', content: image } },
    ]

    const created: HTMLElement[] = []

    for (const tag of tags) {
      let el = document.head.querySelector(tag.selector) as HTMLElement | null
      if (!el) {
        el = tag.attrs.property
          ? document.createElement('meta')
          : tag.attrs.rel
            ? document.createElement('link')
            : document.createElement('meta')
        document.head.appendChild(el)
        created.push(el)
      }
      for (const [key, value] of Object.entries(tag.attrs)) {
        el.setAttribute(key, value)
      }
    }

    let script = document.head.querySelector('script[data-yugen-jsonld]') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-yugen-jsonld', 'true')
      document.head.appendChild(script)
      created.push(script)
    }
    script.textContent = schemaJson

    return () => {
      for (const el of created) {
        el.remove()
      }
    }
  }, [pageTitle, pageDesc, url, image, schemaJson])

  return null
}
