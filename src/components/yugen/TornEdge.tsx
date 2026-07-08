export function TornEdge({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="block h-6 w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 24V8c40-6 80 4 120-2s80-10 120-4 80 8 120 2 80-12 120-6 80 10 120 4 80-8 120-2 80 6 120 0 80-10 120-4 80 8 120 2 80-12 120-6 80 10 120 4 80-8 120-2 80 6 120 0V24H0Z"
          fill="#000000"
        />
        <path
          d="M0 8c40-6 80 4 120-2s80-10 120-4 80 8 120 2 80-12 120-6 80 10 120 4 80-8 120-2 80 6 120 0 80-10 120-4 80 8 120 2 80-12 120-6 80 10 120 4 80-8 120-2 80 6 120 0"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
  )
}

export function TornCardTop({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 32"
      preserveAspectRatio="none"
      className={`block h-8 w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 32V12c20-8 40 2 60-4s40-12 60-6 40 10 60 4 40-14 60-8 40 12 60 6 40-10 60-4 40 8 60 2 40-12 60-6 40 10 60 4 40-8 60-2 40 6 60 0V32H0Z"
        fill="#111111"
      />
    </svg>
  )
}
