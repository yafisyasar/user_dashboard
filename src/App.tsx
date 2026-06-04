import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { useTheme } from './hooks/useTheme'

const UserListPage = lazy(() => import('./pages/UserListPage'))
const UserDetailPage = lazy(() => import('./pages/UserDetailPage'))

const PageLoader = () => (
  <div className="page-loader">
    <div className="spinner" />
    <span>Loading...</span>
  </div>
)

const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="main">
        <div className="container">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<UserListPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
