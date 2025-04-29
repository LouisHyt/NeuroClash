import { Link } from '@inertiajs/react'

const Footer = () => {
  return (
    <footer className="py-3 border-t border-violet-500/10 z-5 bg-[#0a0a0a7c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-slate-300/60">
          <a href="/privacy" className="hover:text-fuchsia-200/70 transition-colors">
            Privacy Policy
          </a>
          <span className="mx-2">•</span>
          <a href="/terms" className="hover:text-fuchsia-200/70 transition-colors">
            Terms of Service
          </a>
          <span className="mx-2">•</span>
          <Link href="/rules" className="hover:text-fuchsia-200/70 transition-colors">
            Community Rules
          </Link>
          <div className="mt-2 text-xs">2025 NeuroClash. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
