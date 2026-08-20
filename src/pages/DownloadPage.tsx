import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DownloadPage() {
  const [searchParams] = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          {/* ─── Conditional: Show only if coming from verification ─── */}
          {isVerified && (
            <>
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">You're Verified! 🎉</h1>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 max-w-lg mx-auto">
                <p className="text-white/80 text-sm md:text-base">
                  <span className="text-primary-400 font-semibold">Next step:</span> Download the Refero app, 
                  install it, and <span className="text-white font-medium">log in with the same email</span> you used to register.
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Your account is ready – start earning commissions immediately!
                </p>
              </div>
            </>
          )}

          {/* ─── Always show download options ─── */}
          <p className={`text-white/60 text-sm ${isVerified ? 'mb-6' : 'mb-8'}`}>
            {isVerified ? 'Choose your download option below:' : 'Download the Refero app and start earning!'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ─── Play Store Card ─── */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                {/* Play Store SVG Icon */}
                <svg className="w-16 h-16 mb-3" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 3.75L15.5 12L4.5 20.25V3.75Z" fill="#4285F4" stroke="white" strokeWidth="0.5"/>
                  <path d="M4.5 3.75L15.5 12L4.5 20.25V3.75Z" fill="#34A853" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M4.5 3.75L15.5 12L4.5 20.25V3.75Z" fill="#FBBC04" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M4.5 3.75L15.5 12L4.5 20.25V3.75Z" fill="#EA4335" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M4.5 3.75L15.5 12L4.5 20.25V3.75Z" fill="#4285F4" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M15.5 12L20.25 9.25L4.5 3.75L15.5 12Z" fill="#34A853" stroke="white" strokeWidth="0.5"/>
                  <path d="M15.5 12L20.25 14.75L4.5 20.25L15.5 12Z" fill="#4285F4" stroke="white" strokeWidth="0.5"/>
                </svg>
                <h3 className="text-xl font-semibold text-white">Play Store</h3>
                <p className="text-white/60 text-sm mt-1">Official app</p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.refero.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]"
                >
                  Download from Play Store →
                </a>
              </div>
            </div>

            {/* ─── APK Card ─── */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                {/* APK SVG Icon */}
                <svg className="w-16 h-16 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#6C63FF"/>
                  <path d="M2 17l10 5 10-5" stroke="#6C63FF"/>
                  <path d="M2 12l10 5 10-5" stroke="#6C63FF"/>
                  <rect x="6" y="8" width="12" height="8" rx="1" stroke="#6C63FF" fill="none"/>
                  <path d="M9 12l2 2 4-4" stroke="#6C63FF" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-xl font-semibold text-white">APK Download</h3>
                <p className="text-white/60 text-sm mt-1">Direct install</p>
                <a
                  href="/refero.apk"
                  download
                  className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] border border-white/10"
                >
                  Download APK ⬇️
                </a>
              </div>
            </div>
          </div>

          {/* ─── Trust Badge ─── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> Secure download
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> Free & trusted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> Instant setup
            </span>
          </div>

          <p className="text-white/30 text-xs mt-6">
            Already have the app? <span className="text-primary-400">Open it and log in to start earning!</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}