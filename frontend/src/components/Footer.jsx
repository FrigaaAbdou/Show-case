import { Twitter, Instagram, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-slate-100/80 text-blue-900 py-8 mt-12 border-t border-blue-100">
      <div className="container mx-auto px-6 text-center space-y-4">
        <p className="text-lg font-medium tracking-wide">
          © {new Date().getFullYear()} CESI. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-blue-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-blue-600 transition">
            Contact Us
          </a>
        </div>

        <div className="flex justify-center gap-6 pt-4">
          
          <a href="https://www.instagram.com/exiacesialgerie/?hl=fr" aria-label="Instagram" className="hover:text-blue-600 transition">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/company/cesi-alg-rie/posts/?feedView=all" aria-label="LinkedIn" className="hover:text-blue-600 transition">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer