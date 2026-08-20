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

          <p className={`text-white/60 text-sm ${isVerified ? 'mb-6' : 'mb-8'}`}>
            {isVerified ? 'Choose your download option below:' : 'Download the Refero app and start earning!'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ─── Play Store Card ─── */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                {/* ✅ Official-looking Play Store icon */}
                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 21.5v-19l18 9.5-18 9.5zM5 19l11.5-7L5 5v14zM6 8.5l4.5 2.5L6 13.5v-5z" />
                    <polygon points="14,12 9.5,14.5 5,12 5,5 14,12" />
                  </svg>
                </div>
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
                {/* ✅ Clean APK icon */}
                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-white/10 rounded-xl border border-white/20">
                  <svg className="w-10 h-10 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
                    <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
                    <rect x="6" y="8" width="12" height="8" rx="1" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
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