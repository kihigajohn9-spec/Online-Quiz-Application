import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { AppShell } from './components/Layout'
import PublicHome from './pages/PublicHome'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { Courses, MyLearning, Certificates } from './pages/Courses'
import Learning from './pages/Learning'
import Admin from './pages/Admin'

function Protected({children,admin=false}) {
 const {user,t}=useApp()
 const location=useLocation()
 if(!user) return <Navigate to="/login" replace state={{from:location.pathname}}/>
 if(admin&&user.role!=='ADMIN') return <Navigate to="/dashboard" replace/>
 return <AppShell>{children}</AppShell>
}
function NotFound(){return <div className="not-found"><span>404</span><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><a className="button button-primary" href="/">Back to home</a></div>}
export default function App() {
 const {user}=useApp()
 return <Routes>
   <Route path="/" element={<PublicHome/>}/>
   <Route path="/login" element={user?<Navigate to="/dashboard" replace/>:<Auth mode="login"/>}/>
   <Route path="/register" element={user?<Navigate to="/dashboard" replace/>:<Auth mode="register"/>}/>
   <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
   <Route path="/courses" element={<Protected><Courses/></Protected>}/>
   <Route path="/my-learning" element={<Protected><MyLearning/></Protected>}/>
   <Route path="/certificates" element={<Protected><Certificates/></Protected>}/>
   <Route path="/learn/:courseId" element={<Protected><Learning/></Protected>}/>
   <Route path="/admin" element={<Protected admin><Admin/></Protected>}/>
   <Route path="*" element={<NotFound/>}/>
 </Routes>
}
