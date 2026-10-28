import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckCircle2, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { authService } from '../services/mockServices'

export default function Auth({ mode='login' }) {
  const isRegister = mode === 'register'
  const { t, login, language, setLanguage, theme, setTheme } = useApp()
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  const [showPassword,setShowPassword] = useState(false)
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [notice,setNotice] = useState('')
  const submit = async (e) => {
    e.preventDefault(); setError(''); setNotice('')
    if(isRegister && password !== confirm) return setError(language==='sw'?'Nenosiri halifanani.':'Passwords do not match.')
    setLoading(true)
    try {
      const user = isRegister ? await authService.register({name,email,password}) : await authService.signIn({email,password})
      login(user, user.role); navigate('/dashboard')
    } catch(err) { setError(err.message) } finally { setLoading(false) }
  }
  const google = async () => { setLoading(true); setNotice('Demo only: Google OAuth will be connected with the backend later.'); setTimeout(async()=>{ const u=await authService.signInWithGoogle(); login(u); navigate('/dashboard') },500) }
  return <div className="auth-page">
    <div className="auth-visual"><Link to="/" className="brand auth-brand"><span className="brand-mark"><BookOpen size={21}/></span><span>SkillBridge<span className="brand-light"> Academy</span></span></Link><Link to="/" className="back-home"><ArrowLeft size={16}/> {t('home')}</Link><div className="auth-visual-content"><span className="section-kicker">LEARN SOMETHING THAT MOVES YOU</span><h1>Small steps today.<br/><em>New possibilities tomorrow.</em></h1><p>A clear path, practical lessons, and a learning experience built around your progress.</p><div className="auth-checks"><span><CheckCircle2 size={17}/> Free courses</span><span><CheckCircle2 size={17}/> Learn at your pace</span><span><CheckCircle2 size={17}/> Progress you can see</span></div></div><div className="auth-visual-bottom">SkillBridge Academy · Learn skills. Build your future.</div></div>
    <div className="auth-form-side"><div className="auth-top-controls"><label className="language-control"><select value={language} onChange={e=>setLanguage(e.target.value)}><option value="en">English</option><option value="sw">Kiswahili</option></select></label><button className="icon-button" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label="Toggle theme">{theme==='light'?'☾':'☀'}</button></div><div className="auth-form-wrap"><div className="auth-mobile-brand brand"><span className="brand-mark"><BookOpen size={21}/></span><span>SkillBridge<span className="brand-light"> Academy</span></span></div><span className="auth-kicker"><LockKeyhole size={15}/> YOUR LEARNING SPACE</span><h2>{isRegister?t('registerTitle'):t('loginTitle')}</h2><p className="auth-subtitle">{isRegister?t('registerText'):t('loginText')}</p>
      <button className="google-button" onClick={google} disabled={loading}><span className="google-g">G</span>{t('continueGoogle')}</button><div className="form-divider"><span>or continue with email</span></div>
      <form onSubmit={submit} className="auth-form">
        {isRegister && <label>{t('name')}<input required minLength="2" maxLength="80" value={name} onChange={e=>setName(e.target.value)} placeholder={language==='sw'?'Jina lako':'Your name'} autoComplete="name"/></label>}
        <label>{t('email')}<input required type="email" maxLength="254" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"/></label>
        <label>{t('password')}<div className="password-field"><input required minLength="8" maxLength="128" type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder={language==='sw'?'Angalau herufi 8':'At least 8 characters'} autoComplete={isRegister?'new-password':'current-password'}/><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
        {isRegister && <label>{t('confirmPassword')}<input required type="password" minLength="8" value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"/></label>}
        {error && <div className="form-error">{error}</div>}{notice && <div className="form-notice">{notice}</div>}
        {isRegister && <label className="terms-check"><input type="checkbox" required/><span>I agree to the terms and privacy policy.</span></label>}
        <button className="button button-primary button-full button-large" disabled={loading}>{loading?'Please wait…':isRegister?t('createAccount'):t('signin')}</button>
      </form>
      <p className="auth-switch">{isRegister?t('haveAccount'):t('noAccount')} <Link to={isRegister?'/login':'/register'}>{isRegister?t('signin'):t('createAccount')}</Link></p>
      <p className="demo-note">{t('demoNote')}</p>
    </div><footer className="auth-footer">Your learning journey, your pace.</footer></div>
  </div>
}
