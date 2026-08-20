import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">You're Verified! 🎉</h1>
          
          {/* ─── Professional instruction message ─── */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 max-w-lg mx-auto">
            <p className="text-white/80 text-sm md:text-base">
              <span className="text-primary-400 font-semibold">Next step:</span> Download the Refero app, 
              install it, and <span className="text-white font-medium">log in with the same email</span> you used to register.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Your account is ready – start earning commissions immediately!
            </p>
          </div>

          <p className="text-white/60 text-sm mb-6">
            Choose your download option below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Play Store Card */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-primary-400 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 16.65l-3.46-3.46 1.73-1.73 3.46 3.46-1.73 1.73zm-5.19-5.19l-1.73-1.73-3.46 3.46 1.73 1.73 3.46-3.46zm1.73-1.73l1.73-1.73-3.46-3.46-1.73 1.73 3.46 3.46zm-5.19 5.19l-1.73 1.73 3.46 3.46 1.73-1.73-3.46-3.46zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
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

            {/* APK Card */}
            <div className="card-glass p-6 hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg className="w-16 h-16 text-primary-400 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c1.1 0 1.99.9 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
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

          {/* Trust badge */}
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