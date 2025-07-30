import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Store/UserSlice'
import { 
  Code2, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Palette,
  ChevronDown
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('dark')

  const themes = [
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'ocean', icon: Palette, label: 'Ocean' },
    { name: 'sunset', icon: Sun, label: 'Sunset' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    dispatch(logout())
    navigate('/')
  }

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName)
    // Apply theme logic here
    setIsThemeMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-700 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CodeLink
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink 
              to="/" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </NavLink>
            <NavLink 
              to="/features" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Theme Switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center space-x-2"
              >
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">{themes.find(t => t.name === currentTheme)?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-surface shadow-lg">
                  <div className="py-1">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => handleThemeChange(theme.name)}
                        className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent/50"
                      >
                        <theme.icon className="h-4 w-4" />
                        <span>{theme.label}</span>
                        {currentTheme === theme.name && (
                          <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {user.username}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <NavLink to="/login">Sign In</NavLink>
                </Button>
                <Button size="sm" asChild>
                  <NavLink to="/signup">Get Started</NavLink>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/features"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </NavLink>
              <NavLink
                to="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              
              {/* Mobile Theme Switcher */}
              <div className="border-t border-border pt-4">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  Theme
                </div>
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/50"
                  >
                    <theme.icon className="h-4 w-4" />
                    <span>{theme.label}</span>
                    {currentTheme === theme.name && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile User Menu */}
              {user.isAuthenticated ? (
                <div className="border-t border-border pt-4">
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    Account
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent/50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-4">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </NavLink>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </NavLink>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar