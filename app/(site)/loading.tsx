export default function Loading() {
  return (
    <div
      className="section-cream flex min-h-[60vh] items-center justify-center pt-24"
      role="status"
      aria-label="Učitavanje"
    >
      <p
        className="animate-pulse text-3xl text-ink"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Puterina
      </p>
    </div>
  )
}
