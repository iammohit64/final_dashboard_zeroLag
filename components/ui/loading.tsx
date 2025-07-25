export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      <img src="/images/zerolag-logo.png" alt="ZeroLag Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-3xl font-bold mb-2">ZeroLag</h1>
      <p className="text-lg mb-8">Loading your dashboard...</p>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-[var(--primary)] rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
        <div className="w-3 h-3 bg-[var(--accent-success)] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="w-3 h-3 bg-[var(--accent-error)] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  )
}
