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
            {/* ─── Play Store Card ────────────────────────────────── */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                {/* ✅ Play Store Logo – from public folder */}
                <img
                  src="/playstore-logo.svg"
                  alt="Google Play Store"
                  className="w-16 h-16 mb-3 object-contain"
                />
                <h3 className="text-xl font-semibold text-white">Google Play Store</h3>
                <p className="text-white/60 text-sm mt-1">Coming soon</p>
                <div className="mt-4 w-full py-3 bg-white/10 text-white/50 font-semibold rounded-xl border border-white/10 cursor-not-allowed">
                  ⏳ Coming Soon
                </div>
              </div>
            </div>

            {/* ─── APK Card ───────────────────────────────────────── */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                {/* ✅ Android APK Logo – from public folder */}
                <img
                  src="/android-logo.svg"
                  alt="Android APK"
                  className="w-16 h-16 mb-3 object-contain"
                />
                <h3 className="text-xl font-semibold text-white">APK Download</h3>
                <p className="text-white/60 text-sm mt-1">Direct install</p>
                <a
                  href="/Refero.apk"
                  download
                  className="mt-4 w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download APK
                </a>
                <p className="text-white/30 text-xs mt-2">Android 8.0+ • 54.7 MB</p>
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