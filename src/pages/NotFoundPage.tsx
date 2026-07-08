import { Link } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'

export function NotFoundPage() {
  return (
    <Shell>
      <SEO
        title="Page not found | Yūgen Summit 6.0"
        description="The page you are looking for does not exist."
        path="/404"
      />
      <div className="section-padding mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="font-display text-[clamp(5rem,20vw,10rem)] uppercase leading-none text-yugen-white/10">404</p>
        <h1 className="-mt-8 font-heading text-3xl font-bold md:text-4xl">Page not found</h1>
        <p className="mt-4 text-muted">This route doesn&apos;t exist — or it&apos;s announcing soon.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">Home</Link>
          <Link to="/faq" className="btn-ghost">FAQ</Link>
          <Link to="/contact" className="btn-ghost">Contact</Link>
        </div>
      </div>
    </Shell>
  )
}
