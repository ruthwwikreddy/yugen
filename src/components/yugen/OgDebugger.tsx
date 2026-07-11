import { YUGEN_SEO } from '../../lib/yugen'

export function OgDebugger() {
  const ogImageUrl = `${YUGEN_SEO.siteUrl}${YUGEN_SEO.ogImage}`

  return (
    <section className="py-16 px-5 md:px-10 bg-surface-raised">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-heading text-white mb-8 text-center">
          ✅ OG Image Debugger
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-heading text-white mb-4">
              Image Preview
            </h3>
            <img 
              src={YUGEN_SEO.ogImage} 
              alt="OG Image"
              className="w-full rounded-lg shadow-2xl border border-white/10"
            />
            <div className="mt-4 p-4 bg-black/50 rounded-lg">
              <p className="text-white/70 text-sm">
                📍 Local URL: <span className="text-white font-mono">{YUGEN_SEO.ogImage}</span>
              </p>
              <p className="text-white/70 text-sm mt-2">
                🌐 Production URL: <span className="text-white font-mono">{ogImageUrl}</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading text-white mb-4">
              Meta Tags
            </h3>
            <div className="bg-black/50 rounded-lg p-4 space-y-3">
              <p className="text-white/70 text-sm">
                <span className="text-white font-semibold">og:image:</span> {ogImageUrl}
              </p>
              <p className="text-white/70 text-sm">
                <span className="text-white font-semibold">og:image:width:</span> 1200
              </p>
              <p className="text-white/70 text-sm">
                <span className="text-white font-semibold">og:image:height:</span> 630
              </p>
              <p className="text-white/70 text-sm">
                <span className="text-white font-semibold">og:title:</span> {YUGEN_SEO.title}
              </p>
              <p className="text-white/70 text-sm">
                <span className="text-white font-semibold">og:description:</span> {YUGEN_SEO.description}
              </p>
              <p className="text-white/70 text-sm">
                <span className="text-white font-semibold">og:url:</span> {YUGEN_SEO.siteUrl}
              </p>
            </div>

            <div className="mt-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">✅ Checklist</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>✓ Image is present at {YUGEN_SEO.ogImage}</li>
                <li>✓ Aspect ratio 1200x630</li>
                <li>✓ All meta tags are set</li>
                <li>✓ SEO component updates tags</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-center">
          <h3 className="text-yellow-400 font-semibold mb-2">🔍 Testing Tips</h3>
          <p className="text-white/70 text-sm mb-2">
            Test your OG image with:
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.opengraph.xyz/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm hover:bg-yellow-500/30 transition"
            >
              opengraph.xyz
            </a>
            <a 
              href="https://developers.facebook.com/tools/debug/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition"
            >
              Facebook Debugger
            </a>
            <a 
              href="https://cards-dev.twitter.com/validator" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-sky-500/20 text-sky-300 rounded-lg text-sm hover:bg-sky-500/30 transition"
            >
              Twitter Validator
            </a>
          </ul>
        </div>
      </div>
    </section>
  )
}
