import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Code2, GraduationCap, Layers3, Sparkles, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/Layout'
import { useApp } from '../context/AppContext'

const slides = [
  { image:'photo-1516321318423-f06f85e504b3', eyebrow:'CODE YOUR OWN FUTURE', title:'Your next skill starts here.', text:'Build real-world digital skills with a clear path from beginner to confident creator.', tag:'Web development' },
  { image:'photo-1519389950473-47ba0277781c', eyebrow:'LEARN BY DOING', title:'Turn curiosity into capability.', text:'Practice each concept, pass knowledge checks, and see your progress grow.', tag:'Practical learning' },
  { image:'photo-1498050108023-c5249f4df085', eyebrow:'FRONTEND DEVELOPMENT', title:'Design experiences people love.', text:'Learn HTML, CSS, JavaScript and React from the ground up.', tag:'Frontend' },
  { image:'photo-1555066931-4365d14bab8c', eyebrow:'PROGRAMMING FUNDAMENTALS', title:'Understand code, one step at a time.', text:'Build strong foundations with guided lessons and useful exercises.', tag:'JavaScript' },
  { image:'photo-1515879218367-8466d910aaa4', eyebrow:'BACKEND DEVELOPMENT', title:'Make the web work behind the scenes.', text:'Explore APIs, servers, databases and the systems powering applications.', tag:'Backend' },
  { image:'photo-1526379095098-d400fd0bf935', eyebrow:'DATA & AI', title:'Discover what data can teach you.', text:'Explore data analysis and machine learning through friendly explanations.', tag:'Data and AI' },
  { image:'photo-1516321497487-e288fb19713f', eyebrow:'LEARN ANYWHERE', title:'Your learning fits your life.', text:'Study at your own pace on your phone, tablet or computer.', tag:'Flexible learning' },
  { image:'photo-1517245386807-bb43f82c33c4', eyebrow:'GROW YOUR CAREER', title:'Build skills for your next chapter.', text:'Follow structured learning paths designed to make progress feel achievable.', tag:'Career readiness' },
  { image:'photo-1522202176988-66273c2fd55f', eyebrow:'A COMMUNITY OF LEARNERS', title:'Big goals begin with small steps.', text:'Build confidence through steady practice and clear milestones.', tag:'Keep growing' },
  { image:'photo-1521737711867-e3b97375f902', eyebrow:'SHOW WHAT YOU KNOW', title:'Finish strong. Celebrate your progress.', text:'Complete required learning and pass the final assessment to become certificate-eligible.', tag:'Achievement' }
]
const imageUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`

export default function PublicHome() {
  const { t } = useApp()
  const [active, setActive] = useState(0)
  useEffect(() => { const timer = setInterval(() => setActive(i => (i + 1) % slides.length), 3000); return () => clearInterval(timer) }, [])
  const move = (delta) => setActive(i => (i + delta + slides.length) % slides.length)
  return <div className="public-page">
    <PublicHeader/>
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot"/>{t('heroEyebrow')}</div>
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroText')}</p>
        <div className="hero-actions"><Link to="/register" className="button button-primary button-large">{t('getStarted')} <ArrowRight size={18}/></Link><a href="#about" className="button button-secondary button-large">{t('explore')} <ArrowUpRight size={17}/></a></div>
        <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>M</span><span>J</span></div><div><strong>Learn at your own pace</strong><small>Structured lessons. Real progress.</small></div></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrap" key={active}><img src={imageUrl(slides[active].image)} alt={slides[active].tag} onError={e=>{e.currentTarget.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80'}}/><div className="image-shade"/>
          <div className="slide-copy"><span className="slide-eyebrow">{slides[active].eyebrow}</span><h2>{slides[active].title}</h2><p>{slides[active].text}</p><span className="slide-tag"><Sparkles size={14}/>{slides[active].tag}</span></div>
        </div>
        <div className="carousel-controls"><button className="carousel-arrow" onClick={()=>move(-1)} aria-label="Previous slide"><ChevronLeft size={19}/></button><div className="carousel-dots">{slides.map((s,i)=><button key={s.image} aria-label={`Go to slide ${i+1}`} className={i===active?'active':''} onClick={()=>setActive(i)}/>)}</div><span className="slide-count">0{active+1}<i>/</i>10</span><button className="carousel-arrow" onClick={()=>move(1)} aria-label="Next slide"><ChevronRight size={19}/></button></div>
        <div className="floating-note"><span className="floating-icon"><CheckCircle2 size={18}/></span><div><strong>One step at a time</strong><small>Progress you can see</small></div></div>
      </div>
    </section>
    <section className="trust-strip"><div><strong>100%</strong><span>{t('free')}</span></div><div><strong>Step by step</strong><span>{t('structured')}</span></div><div><strong>Practice</strong><span>{t('practice')}</span></div><div><strong>Earned</strong><span>{t('certificates')}</span></div></section>
    <section className="section-intro" id="about"><div className="section-kicker">WHY SKILLBRIDGE</div><h2>{t('whyFree')}</h2><p>{t('whyText')}</p><div className="benefit-grid">
      <article className="benefit-card"><span className="benefit-icon purple"><Code2/></span><h3>Learn by building</h3><p>Understand concepts through examples and practical exercises, not just long lectures.</p></article>
      <article className="benefit-card"><span className="benefit-icon green"><Target/></span><h3>Know your next step</h3><p>Lessons and checkpoints guide you forward when you demonstrate understanding.</p></article>
      <article className="benefit-card"><span className="benefit-icon orange"><Zap/></span><h3>Progress that matters</h3><p>Track completed lessons, passed quizzes and course milestones in one place.</p></article>
    </div></section>
    <section className="how-section" id="how"><div className="section-kicker">YOUR LEARNING JOURNEY</div><h2>{t('how')}</h2><div className="journey-grid"><article><span>01</span><GraduationCap/><h3>{t('step1')}</h3><p>Find a free course that matches your goal.</p></article><article><span>02</span><Layers3/><h3>{t('step2')}</h3><p>Learn fundamentals with clear examples and exercises.</p></article><article><span>03</span><Target/><h3>{t('step3')}</h3><p>Pass required quizzes to unlock the next step.</p></article><article><span>04</span><Sparkles/><h3>{t('step4')}</h3><p>Finish the curriculum and pass the final exam.</p></article></div></section>
    <section className="final-cta"><div><span className="section-kicker">YOUR NEXT CHAPTER</span><h2>{t('cta')}</h2><p>{t('ctaText')}</p></div><Link to="/register" className="button button-white button-large">{t('getStarted')} <ArrowRight size={18}/></Link></section>
    <footer className="public-footer"><Link to="/" className="brand"><span className="brand-mark"><GraduationCap size={21}/></span><span>SkillBridge<span className="brand-light"> Academy</span></span></Link><p>Learn skills. Build your future.</p><span>© {new Date().getFullYear()} SkillBridge Academy · Free learning for everyone.</span></footer>
  </div>
}
