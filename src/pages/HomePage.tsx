import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Plan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  directCommissionPercent: number
  networkCommissionPercent: number
  networkDepth: number
  features: string[]
  isActive: boolean
  sortOrder: number
}

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [referralCode, setReferralCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [isReferralCodeLocked, setIsReferralCodeLocked] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [plansLoading, setPlansLoading] = useState(true)

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      setReferralCode(ref.toUpperCase())
      setIsReferralCodeLocked(true)
    }
  }, [searchParams])

  // ─── Fetch all active plans ───
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const q = query(
          collection(db, 'plans'),
          where('isActive', '==', true),
          orderBy('sortOrder', 'asc')
        )
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const fetchedPlans: Plan[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Plan[]
          setPlans(fetchedPlans)
        } else {
          console.warn('No active plans found – using defaults')
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
      } finally {
        setPlansLoading(false)
      }
    }
    fetchPlans()
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
        <div className="max-w-4xl w-full">
          {/* ─── Hero Section ─── */}
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
              {plansLoading
                ? ' Loading...'
                : plans.length > 0
                ? ` Up to ${Math.max(...plans.map(p => p.directCommissionPercent))}% direct commission and ${Math.max(...plans.map(p => p.networkCommissionPercent))}% network commission.`
                : ' Earn with our referral program.'}
            </p>
          </div>

          {/* ─── Referral Code Input ─── */}
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

          {/* ─── Plans Display ─── */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h2>
            {plansLoading ? (
              <div className="text-white/60">Loading plans...</div>
            ) : plans.length === 0 ? (
              <div className="text-white/60">No plans available</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const isPopular = plan.name.toLowerCase().includes('silver')
                  return (
                    <div
                      key={plan.id}
                      className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                        isPopular
                          ? 'border-primary-500/50 shadow-lg shadow-primary-500/20'
                          : 'border-white/10 hover:border-primary-500/30'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                          Most Popular
                        </div>
                      )}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        <p className="text-3xl font-bold text-primary-400 mt-2">
                          {plan.currency} {plan.price}
                          <span className="text-sm font-normal text-white/60"> / month</span>
                        </p>
                        <p className="text-white/60 text-sm mt-1">{plan.description}</p>
                      </div>
                      <div className="mt-4 space-y-2 text-white/70 text-sm">
                        <div className="flex justify-between">
                          <span>Direct Commission</span>
                          <span className="text-primary-400 font-semibold">{plan.directCommissionPercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Network Commission</span>
                          <span className="text-primary-400 font-semibold">{plan.networkCommissionPercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Network Depth</span>
                          <span className="text-primary-400 font-semibold">{plan.networkDepth} levels</span>
                        </div>
                        {plan.features && plan.features.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-white/60 text-xs">
                                <span className="text-primary-400">✓</span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (!referralCode) {
                            toast.error('Please enter a referral code first')
                            return
                          }
                          navigate(`/signup?ref=${referralCode}`)
                        }}
                        className={`mt-4 w-full py-2 rounded-xl font-semibold transition-all ${
                          isPopular
                            ? 'bg-primary-500 hover:bg-primary-600 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        Get Started
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ─── Trust Badge ─── */}
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