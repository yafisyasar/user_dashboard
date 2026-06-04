interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <div className="header__logo-icon" aria-hidden="true">
              👥
            </div>
            <span className="header__title">User Management Dashboard</span>
          </div>

          <div className="header__actions">
           
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
