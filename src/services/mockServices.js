// Frontend-only mock service layer. Replace these methods with HTTP requests when the backend is ready.
export const authService = {
  async signIn({ email, password }) {
    if (!email || !password) throw new Error('Enter your email and password.')
    return { name: email.split('@')[0], email, role: email.toLowerCase().startsWith('admin@') ? 'ADMIN' : 'STUDENT' }
  },
  async signInWithGoogle() {
    return { name: 'Google Learner', email: 'google-learner@example.com', role: 'STUDENT' }
  },
  async register({ name, email, password }) {
    if (!name || !email || password.length < 8) throw new Error('Enter a name, valid email and password with at least 8 characters.')
    return { name, email, role: 'STUDENT' }
  }
}
