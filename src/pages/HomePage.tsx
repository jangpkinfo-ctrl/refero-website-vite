import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function HomePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [referralCode, setReferralCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [isReferralCodeLocked, setIsReferralCodeLocked] = useState(false)

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      setReferralCode(ref.toUpperCase())
      setIsReferralCodeLocked(true)
    }
  }, [searchParams])

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Join Refero & <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">Start Earning Today</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Build your referral network and earn commissions. 
            20% on direct referrals, 5% on network referrals.
          </p>

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
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Checking...' : 'Join Now →'}
              </button>
            </div>
            {isReferralCodeLocked && (
              <p className="text-primary-400 text-xs mt-2">
                🔒 Referral code locked – you were referred by someone!
              </p>
            )}
            <p className="text-white/40 text-xs mt-3">
              Already have an account?{' '}
              <span className="text-primary-400">Open the Refero app</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary-500/30 transition-colors">
              <div className="text-3xl font-bold text-primary-400">20%</div>
              <div className="text-white/60 text-sm">Direct Commission</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary-500/30 transition-colors">
              <div className="text-3xl font-bold text-primary-400">5%</div>
              <div className="text-white/60 text-sm">Network Commission</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-primary-500/30 transition-colors">
              <div className="text-3xl font-bold text-primary-400">10</div>
              <div className="text-white/60 text-sm">Network Levels</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}