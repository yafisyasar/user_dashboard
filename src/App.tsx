import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AppRoutes from './routes'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="main">
        <div className="container">
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
