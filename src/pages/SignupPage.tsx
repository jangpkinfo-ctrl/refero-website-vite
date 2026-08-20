import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { validators } from '../lib/utils/validators'

export default function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const referralCode = searchParams.get('ref') || ''

  // ─── Form state ───
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [disclaimer, setDisclaimer] = useState(false)

  // ─── Password visibility ───
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ─── Email error state ───
  const [emailError, setEmailError] = useState('')

  // ─── Password strength ───
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState('')

  // ─── Redirect if no referral code ───
  useEffect(() => {
    if (!referralCode) {
      navigate('/')
    }
  }, [referralCode, navigate])

  // ─── Validate email on change ───
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    const result = validators.email(value)
    setEmailError(result.valid ? '' : result.message || '')
  }

  // ─── Password strength checker ───
  const checkPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++
    if (pwd.match(/\d/)) strength++
    if (pwd.match(/[^a-zA-Z\d]/)) strength++

    setPasswordStrength(strength)
    if (pwd.length === 0) {
      setPasswordFeedback('')
    } else if (strength <= 1) {
      setPasswordFeedback('Weak')
    } else if (strength === 2) {
      setPasswordFeedback('Fair')
    } else if (strength === 3) {
      setPasswordFeedback('Good')
    } else {
      setPasswordFeedback('Strong')
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    checkPasswordStrength(value)
  }

  // ─── Form submission ───
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // ─── Validate email ───
    const emailCheck = validators.email(email)
    if (!emailCheck.valid) {
      toast.error(emailCheck.message || 'Invalid email')
      return
    }

    if (!agreed) {
      toast.error('Please agree to Terms & Conditions')
      return
    }
    if (!disclaimer) {
      toast.error('Please acknowledge the earnings disclaimer')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_OTP_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, referralCode }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account created! Please verify your email.')
        setTimeout(() => {
          navigate(`/verify?email=${encodeURIComponent(email)}`)
        }, 1000)
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Check if form is valid ───
  const isFormValid = () => {
    return (
      fullName.trim().length >= 3 &&
      email.trim().length > 0 &&
      !emailError &&
      password.length >= 8 &&
      password === confirmPassword &&
      agreed &&
      disclaimer
    )
  }

  // ─── Password strength colour ───
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500'
    if (passwordStrength === 2) return 'bg-yellow-500'
    if (passwordStrength === 3) return 'bg-blue-500'
    if (passwordStrength >= 4) return 'bg-green-500'
    return 'bg-gray-600'
  }

  const getStrengthTextColor = () => {
    if (passwordStrength <= 1) return 'text-red-400'
    if (passwordStrength === 2) return 'text-yellow-400'
    if (passwordStrength === 3) return 'text-blue-400'
    if (passwordStrength >= 4) return 'text-green-400'
    return 'text-white/40'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-white/60 mt-2">Join Refero and start earning today</p>
          </div>

          <div className="card-glass p-6 md:p-8">
            <form onSubmit={handleSignup} className="space-y-5">
              {/* ─── Full Name ─── */}
              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="input-glass"
                />
                {fullName.length > 0 && fullName.length < 3 && (
                  <p className="text-red-400 text-xs mt-1">Name must be at least 3 characters</p>
                )}
              </div>

              {/* ─── Email ─── */}
              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your@email.com"
                  required
                  className={`input-glass ${emailError ? 'border-red-500' : ''}`}
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1">{emailError}</p>
                )}
                <p className="text-white/40 text-xs mt-1">No temporary emails or aliases allowed</p>
              </div>

              {/* ─── Password ─── */}
              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Min 8 characters"
                    required
                    minLength={8}
                    className="input-glass pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {password.length > 0 && (
                  <>
                    <div className="mt-2 h-1.5 w-full bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                    <p className={`text-xs mt-1 ${getStrengthTextColor()}`}>
                      {passwordFeedback} {passwordStrength >= 4 && '✅'}
                    </p>
                  </>
                )}
              </div>

              {/* ─── Confirm Password ─── */}
              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className="input-glass pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              {/* ─── Referral Code ─── */}
              <div>
                <label className="text-white/80 text-sm font-medium block mb-1">Referral Code 🔒</label>
                <div className="w-full px-4 py-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 font-mono">
                  {referralCode || 'No referral code'}
                </div>
                {!referralCode && (
                  <p className="text-white/40 text-xs mt-1">You need a referral code to join</p>
                )}
              </div>

              {/* ─── Checkboxes ─── */}
              <div className="space-y-2">
                <label className="flex items-start gap-2 text-white/70 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5"
                  />
                  I agree to the <Link to="/terms" className="text-primary-400 hover:underline">Terms & Conditions</Link>
                </label>
                <label className="flex items-start gap-2 text-white/70 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disclaimer}
                    onChange={(e) => setDisclaimer(e.target.checked)}
                    className="mt-0.5"
                  />
                  I understand earnings depend on my referral efforts and are not guaranteed
                </label>
              </div>

              {/* ─── Submit ─── */}
              <button
                type="submit"
                disabled={loading || !isFormValid() || !referralCode}
                className="btn-primary"
              >
                {loading ? 'Creating...' : 'Create Account →'}
              </button>
            </form>

            <p className="text-white/40 text-center text-sm mt-4">
              Already have an account?{' '}
              <span className="text-primary-400">Open the Refero app</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}