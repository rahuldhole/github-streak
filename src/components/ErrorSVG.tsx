/** @jsxImportSource hono/jsx */
export function ErrorSVG({ message }: { message: string }) {
  return (
    <svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="180" rx="20" fill="#0B1220"/>
      <rect x="0.5" y="0.5" width="419.5" height="179.5" rx="19.5" stroke="#1E293B"/>
      <text x="210" y="85" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold">
        {message}
      </text>
      <text x="210" y="110" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="12">
        Temporarily Unavailable
      </text>
    </svg>
  )
}
