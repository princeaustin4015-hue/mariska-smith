'use client'

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <div className="relative w-8 h-8">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-400/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}



