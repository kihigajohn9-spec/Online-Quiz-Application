import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BookOpen, Menu, X, Sun, Moon, Globe2, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function PublicHeader() {
  const { t, language, setLanguage, theme, setTheme } = useApp()
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Link to="/" className="brand"><span className="brand-mark"><BookOpen size={21}/></span><span>SkillBridge<span className="brand-light"> Academy</span></span></Link>
    <nav className={`public-nav ${open ? 'nav-open' : ''}`}>
      <a href="#home" onClick={() => setOpen(false)}>{t('home')}</a>
      <a href="#about" onClick={() => setOpen(false)}>{t('about')}</a>
      <a href="#how" onClick={() => setOpen(false)}>{t('how')}</a>
      <div className="nav-tools">
        <label className="language-control" aria-label="Select language"><Globe2 size={16}/><select value={language} onChange={e=>setLanguage(e.target.value)}><option value="en">EN</option><option value="sw">SW</option></select></label>
        <button className="icon-button" aria-label="Toggle theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button>
      </div>
      <Link className="nav-signin" to="/login" onClick={() => setOpen(false)}>{t('signin')}</Link>
      <Link className="button button-primary nav-cta" to="/register" onClick={() => setOpen(false)}>{t('getStarted')}</Link>
    </nav>
    <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
  </header>
}

export function AppShell({ children }) {
  const { t, user, logout, language, setLanguage, theme, setTheme } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const exit = () => { logout(); navigate('/') }
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <Link to="/dashboard" className="brand sidebar-brand"><span className="brand-mark"><BookOpen size={21}/></span><span>SkillBridge<span className="brand-light"> Academy</span></span></Link>
      <div className="sidebar-label">{t('dashboard')}</div>
      <NavLink to="/dashboard" onClick={()=>setMobileOpen(false)}><LayoutDashboard size={18}/>{t('dashboard')}</NavLink>
      <NavLink to="/courses" onClick={()=>setMobileOpen(false)}><BookOpen size={18}/>{t('allCourses')}</NavLink>
      <NavLink to="/my-learning" onClick={()=>setMobileOpen(false)}><GraduationIcon/>{t('myLearning')}</NavLink>
      <NavLink to="/certificates" onClick={()=>setMobileOpen(false)}><ShieldCheck size={18}/>{t('myCertificates')}</NavLink>
      {user?.role === 'ADMIN' && <><div className="sidebar-label">ADMIN</div><NavLink to="/admin" onClick={()=>setMobileOpen(false)}><ShieldCheck size={18}/>{t('admin')}</NavLink></>}
      <div className="sidebar-bottom">
        <label className="setting-row"><Globe2 size={17}/><span>{t('language')}</span><select value={language} onChange={e=>setLanguage(e.target.value)}><option value="en">EN</option><option value="sw">SW</option></select></label>
        <button className="setting-row" onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}<span>{t('theme')}</span><small>{theme==='light'?t('dark'):t('light')}</small></button>
        <div className="user-mini"><div className="avatar">{user?.name?.slice(0,1).toUpperCase() || 'S'}</div><div className="user-mini-info"><strong>{user?.name}</strong><small>{user?.role === 'ADMIN' ? 'Administrator' : 'Learner'}</small></div><button className="icon-button" aria-label={t('logout')} onClick={exit}><LogOut size={17}/></button></div>
      </div>
    </aside>
    {mobileOpen && <button className="sidebar-scrim" onClick={()=>setMobileOpen(false)} aria-label="Close menu"/>}
    <main className="app-main">
      <header className="app-topbar"><button className="icon-button mobile-menu dashboard-menu" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Open menu"><Menu/></button><div className="breadcrumb">SkillBridge Academy <span>/</span> {t('dashboard')}</div><div className="topbar-actions"><span className="free-pill">{t('freeLabel')}</span><div className="avatar">{user?.name?.slice(0,1).toUpperCase()}</div></div></header>
      <div className="app-content">{children}</div>
    </main>
  </div>
}
function GraduationIcon(){ return <BookOpen size={18}/> }
