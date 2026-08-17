import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface CommissionSettings {
  directCommissionPercent: number
  networkCommissionPercent: number
  networkDepth: number
  planName: string
}

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [referralCode, setReferralCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [isReferralCodeLocked, setIsReferralCodeLocked] = useState(false)
  const [settings, setSettings] = useState<CommissionSettings>({
    directCommissionPercent: 20,
    networkCommissionPercent: 5,
    networkDepth: 3,
    planName: 'Bronze',
  })
  const [settingsLoading, setSettingsLoading] = useState(true)

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      setReferralCode(ref.toUpperCase())
      setIsReferralCodeLocked(true)
    }
  }, [searchParams])

  // ─── Fetch commission settings from the "plans" collection ───
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Get the first active plan (sorted by sortOrder)
        const q = query(
          collection(db, 'plans'),
          where('isActive', '==', true),
          orderBy('sortOrder', 'asc'),
          limit(1)
        )
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const planData = querySnapshot.docs[0].data()
          setSettings({
            directCommissionPercent: planData.directCommissionPercent ?? 20,
            networkCommissionPercent: planData.networkCommissionPercent ?? 5,
            networkDepth: planData.networkDepth ?? 3,
            planName: planData.name || 'Bronze',
          })
        } else {
          // No active plans found – use defaults
          console.warn('No active plans found – using defaults')
        }
      } catch (error) {
        console.error('Error fetching plan settings:', error)
        // Keep defaults on error
      } finally {
        setSettingsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleJoin = async () => {
    const code = referralCode.trim().toUpperCase()
    if (!code) {
      toast.error('Please enter a referral code')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_OTP_API_URL}/validate-referral?code=${code}`
      )
      const data = await response.json()
      
      if (data.valid) {
        navigate(`/signup?ref=${code}`)
      } else {
        toast.error('Invalid referral code. Please check and try again.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 container-custom py-12 md:py-20 flex flex-col items-center text-center">
        <div className="max-w-3xl">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 text-sm font-medium">
              🚀 Referral Marketing Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Join Refero & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-purple-400 bg-clip-text text-transparent">
                Start Earning Today
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl mx-auto">
              Build your referral network and earn commissions.
              {settingsLoading
                ? ' Loading...'
                : ` ${settings.directCommissionPercent}% on direct referrals, ${settings.networkCommissionPercent}% on network referrals.`}
            </p>
          </div>

          {/* Referral Code Input */}
          <div className="card-glass p-6 md:p-8 mt-8 max-w-lg mx-auto">
            <p className="text-white/80 text-sm mb-3">
              Enter referral code or click a referral link
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Enter referral code"
                disabled={isReferralCodeLocked}
                className={`flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary-500 transition-colors ${
                  isReferralCodeLocked ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              />
              <button
                onClick={handleJoin}
                disabled={loading}
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Checking...
                  </span>
                ) : (
                  'Join Now →'
                )}
              </button>
            </div>
            {isReferralCodeLocked && (
              <p className="text-primary-400 text-xs mt-2 animate-pulse">
                🔒 Referral code locked – you were referred by someone!
              </p>
            )}
            <p className="text-white/40 text-xs mt-3">
              Already have an account?{' '}
              <span className="text-primary-400">Open the Refero app</span>
            </p>
          </div>

          {/* Stats Cards - More Professional */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="group bg-white/5 rounded-xl p-5 border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-3xl font-bold text-primary-400">
                {settingsLoading ? '...' : `${settings.directCommissionPercent}%`}
              </div>
              <div className="text-white/60 text-sm font-medium">Direct Commission</div>
              <div className="text-white/30 text-xs mt-1">on every referral</div>
            </div>

            <div className="group bg-white/5 rounded-xl p-5 border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">🌐</span>
              </div>
              <div className="text-3xl font-bold text-primary-400">
                {settingsLoading ? '...' : `${settings.networkCommissionPercent}%`}
              </div>
              <div className="text-white/60 text-sm font-medium">Network Commission</div>
              <div className="text-white/30 text-xs mt-1">on sub-referrals</div>
            </div>

            <div className="group bg-white/5 rounded-xl p-5 border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-3xl font-bold text-primary-400">
                {settingsLoading ? '...' : `${settings.networkDepth}`}
              </div>
              <div className="text-white/60 text-sm font-medium">Network Levels</div>
              <div className="text-white/30 text-xs mt-1">deep referral chain</div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure & Verified
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Real-time Earnings
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Bank Transfer Payouts
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 