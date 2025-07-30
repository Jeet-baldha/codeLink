import { Code2, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/50 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CodeLink
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Real-time collaborative coding platform for developers. Code together, build faster, and learn from each other.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:contact@codelink.com" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="hover:text-foreground transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#api" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#press" className="hover:text-foreground transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#help" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#status" className="hover:text-foreground transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>&copy; {currentYear} CodeLink. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>

            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer