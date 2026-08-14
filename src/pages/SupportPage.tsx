import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Support</h1>
        <div className="space-y-4">
          {/* Email Support */}
          <div className="card-glass p-6">
            <h2 className="text-lg font-semibold text-white">📧 Email Support</h2>
            <p className="text-white/60 mt-2">Send us an email and we'll get back to you within 24 hours.</p>
            <a href="mailto:support@referoglobal.com" className="inline-block mt-3 text-primary-400 hover:text-primary-300">
              support@referoglobal.com →
            </a>
          </div>

          {/* ✅ In-App Support - Now links to Download page */}
          <div className="card-glass p-6">
            <h2 className="text-lg font-semibold text-white">💬 In-App Support</h2>
            <p className="text-white/60 mt-2">Open a support ticket directly from the Refero app.</p>
            <Link
              to="/download"
              className="inline-block mt-3 text-primary-400 hover:text-primary-300"
            >
              Download the app →
            </Link>
            <p className="text-white/40 text-sm mt-2">Get the app to access in-app support tickets.</p>
          </div>

          {/* Channel Support */}
          <div className="card-glass p-6">
            <h2 className="text-lg font-semibold text-white">📢 Join Our Channel</h2>
            <p className="text-white/60 mt-2">Stay updated and get quick assistance through our community channel.</p>
            <a
              href="https://t.me/refero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-primary-400 hover:text-primary-300"
            >
              Join Channel →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}