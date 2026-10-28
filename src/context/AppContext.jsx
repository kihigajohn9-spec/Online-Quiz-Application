import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { courses } from '../data/courses'

const AppContext = createContext(null)
const translations = {
  en: {
    home:'Home', courses:'Courses', paths:'Learning paths', about:'About', signin:'Sign in', getStarted:'Get started free',
    heroEyebrow:'YOUR FUTURE, UNLOCKED', heroTitle:'Learn skills. Build your future.', heroText:'A free, friendly place to learn in-demand skills, build real projects, and prove what you know — one step at a time.',
    explore:'Explore the academy', whyFree:'Learning should be open to everyone.', whyText:'Follow a clear path from first principles to practical skills, with lessons, checkpoints and a final assessment.',
    free:'100% free', structured:'Structured paths', practice:'Practice as you learn', certificates:'Achievement certificates',
    featured:'A skill for your next chapter', featuredText:'Start with a foundation or follow a path into a new career.', how:'How it works', step1:'Choose your path', step2:'Learn one lesson at a time', step3:'Pass checkpoints', step4:'Earn your certificate',
    faq:'A few good questions', cta:'Ready to get started?', ctaText:'Create your free account and take the next step toward your goals.',
    loginTitle:'Welcome back', loginText:'Continue where your learning journey paused.', registerTitle:'Create your free account', registerText:'Start learning with SkillBridge Academy.', email:'Email address', password:'Password', name:'Full name',
    confirmPassword:'Confirm password', noAccount:"Don't have an account?", haveAccount:'Already have an account?', createAccount:'Create account', continueGoogle:'Continue with Google', demoNote:'Demo mode: authentication is simulated until the backend is connected.',
    dashboard:'Dashboard', myLearning:'My learning', myCertificates:'My certificates', settings:'Settings', logout:'Sign out', welcome:'Welcome back', keepGoing:'Small steps. Big progress.', browse:'Browse courses', continueLearning:'Continue learning', progress:'Progress', allCourses:'Explore courses', search:'Search courses or skills...', allCategories:'All categories', allLevels:'All levels', enroll:'Start learning', enrolled:'Enrolled', courseDetails:'Course details', lessons:'Lessons', hours:'hours', level:'Level', outcomes:'What you will learn', curriculum:'Course curriculum',
    lesson:'Lesson', complete:'Mark complete', next:'Next lesson', previous:'Previous', quiz:'Knowledge check', submit:'Submit answers', tryAgain:'Try again', pass:'You passed!', fail:'Not quite yet', correct:'Correct', incorrect:'Incorrect', locked:'Locked', unlocked:'Ready to learn', module:'Module', finalExam:'Final examination', certificate:'Certificate', admin:'Admin studio', addCourse:'Add course', save:'Save course', title:'Course title', description:'Description', category:'Category', publish:'Publish course', remove:'Remove', back:'Back', startQuiz:'Start quiz', quizGate:'Pass this knowledge check to unlock the next lesson.', lessonComplete:'Lesson completed', examNote:'Complete required lessons and pass the final exam to become eligible for a certificate.',
    freeLabel:'FREE', language:'Language', theme:'Appearance', light:'Light', dark:'Dark', signInRequired:'Please sign in to access the learning academy.'
  },
  sw: {
    home:'Mwanzo', courses:'Kozi', paths:'Njia za kujifunza', about:'Kuhusu', signin:'Ingia', getStarted:'Anza bure',
    heroEyebrow:'FUNGUA MILANGO YA BAADAYE', heroTitle:'Jifunze ujuzi. Jenga maisha yako ya baadaye.', heroText:'Jifunze ujuzi unaohitajika bila malipo, jenga miradi halisi na thibitisha unachojua — hatua moja kwa wakati.',
    explore:'Chunguza akademia', whyFree:'Elimu inapaswa kupatikana kwa kila mtu.', whyText:'Fuata njia iliyo wazi kutoka misingi hadi ujuzi wa vitendo kupitia masomo, majaribio na mtihani wa mwisho.',
    free:'Bure kabisa', structured:'Masomo yaliyopangwa', practice:'Fanya mazoezi', certificates:'Vyeti vya mafanikio',
    featured:'Ujuzi wa hatua yako inayofuata', featuredText:'Anza na misingi au fuata njia kuelekea taaluma mpya.', how:'Jinsi inavyofanya kazi', step1:'Chagua njia yako', step2:'Jifunze somo moja kwa wakati', step3:'Faulu majaribio', step4:'Pata cheti chako',
    faq:'Maswali machache', cta:'Uko tayari kuanza?', ctaText:'Fungua akaunti ya bure na chukua hatua inayofuata kuelekea malengo yako.',
    loginTitle:'Karibu tena', loginText:'Endelea pale ulipoishia.', registerTitle:'Fungua akaunti ya bure', registerText:'Anza kujifunza kupitia SkillBridge Academy.', email:'Barua pepe', password:'Nenosiri', name:'Jina kamili',
    confirmPassword:'Thibitisha nenosiri', noAccount:'Huna akaunti?', haveAccount:'Tayari una akaunti?', createAccount:'Fungua akaunti', continueGoogle:'Endelea na Google', demoNote:'Hali ya majaribio: kuingia ni mfano tu mpaka backend iunganishwe.',
    dashboard:'Dashibodi', myLearning:'Masomo yangu', myCertificates:'Vyeti vyangu', settings:'Mipangilio', logout:'Toka', welcome:'Karibu tena', keepGoing:'Hatua ndogo. Maendeleo makubwa.', browse:'Vinjari kozi', continueLearning:'Endelea kujifunza', progress:'Maendeleo', allCourses:'Chunguza kozi', search:'Tafuta kozi au ujuzi...', allCategories:'Makundi yote', allLevels:'Viwango vyote', enroll:'Anza kujifunza', enrolled:'Umejiunga', courseDetails:'Maelezo ya kozi', lessons:'Masomo', hours:'saa', level:'Kiwango', outcomes:'Utajifunza nini', curriculum:'Mpangilio wa kozi',
    lesson:'Somo', complete:'Weka kuwa limekamilika', next:'Somo linalofuata', previous:'Lililotangulia', quiz:'Jaribio la maarifa', submit:'Wasilisha majibu', tryAgain:'Jaribu tena', pass:'Umefaulu!', fail:'Bado hujafaulu', correct:'Sahihi', incorrect:'Si sahihi', locked:'Imefungwa', unlocked:'Tayari kujifunza', module:'Moduli', finalExam:'Mtihani wa mwisho', certificate:'Cheti', admin:'Sehemu ya msimamizi', addCourse:'Ongeza kozi', save:'Hifadhi kozi', title:'Jina la kozi', description:'Maelezo', category:'Kundi', publish:'Chapisha kozi', remove:'Ondoa', back:'Rudi', startQuiz:'Anza jaribio', quizGate:'Faulu jaribio hili ili kufungua somo linalofuata.', lessonComplete:'Somo limekamilika', examNote:'Kamilisha masomo yanayotakiwa na ufaulu mtihani wa mwisho ili kustahili cheti.',
    freeLabel:'BURE', language:'Lugha', theme:'Muonekano', light:'Mwanga', dark:'Giza', signInRequired:'Tafadhali ingia ili kufikia akademia ya masomo.'
  }
}

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('sba-language') || 'en')
  const [theme, setTheme] = useState(() => localStorage.getItem('sba-theme') || 'light')
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sba-demo-user')) } catch { return null }
  })
  const [enrollments, setEnrollments] = useState(() => JSON.parse(localStorage.getItem('sba-enrollments') || '[]'))
  const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem('sba-progress') || '{}'))
  const [quizPasses, setQuizPasses] = useState(() => JSON.parse(localStorage.getItem('sba-quiz-passes') || '{}'))
  const [customCourses, setCustomCourses] = useState(() => JSON.parse(localStorage.getItem('sba-custom-courses') || '[]'))
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('sba-theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('sba-language', language); document.documentElement.lang = language }, [language])
  useEffect(() => { user ? localStorage.setItem('sba-demo-user', JSON.stringify(user)) : localStorage.removeItem('sba-demo-user') }, [user])
  useEffect(() => { localStorage.setItem('sba-enrollments', JSON.stringify(enrollments)) }, [enrollments])
  useEffect(() => { localStorage.setItem('sba-progress', JSON.stringify(progress)) }, [progress])
  useEffect(() => { localStorage.setItem('sba-quiz-passes', JSON.stringify(quizPasses)) }, [quizPasses])
  useEffect(() => { localStorage.setItem('sba-custom-courses', JSON.stringify(customCourses)) }, [customCourses])
  const t = (key) => translations[language]?.[key] || translations.en[key] || key
  const allCourses = useMemo(() => [...courses, ...customCourses], [customCourses])
  const login = (values, role='STUDENT') => setUser({ name: values.name || values.email.split('@')[0], email: values.email, role })
  const logout = () => setUser(null)
  const enroll = (id) => setEnrollments(old => old.includes(id) ? old : [...old, id])
  const markComplete = (courseId, lessonId) => setProgress(old => ({...old, [courseId]: [...new Set([...(old[courseId] || []), lessonId])]}))
  const passQuiz = (key) => setQuizPasses(old => ({...old, [key]: true}))
  const addCourse = (course) => setCustomCourses(old => [...old, course])
  const removeCourse = (id) => setCustomCourses(old => old.filter(c => c.id !== id))
  const value = { language, setLanguage, theme, setTheme, user, setUser, login, logout, t, allCourses, enrollments, enroll, progress, markComplete, quizPasses, passQuiz, customCourses, addCourse, removeCourse }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => useContext(AppContext)
