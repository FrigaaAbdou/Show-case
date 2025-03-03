import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Products', to: '/products' },
    { name: 'Contact', to: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-blue-50/80 shadow-sm text-blue-900">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MindfulApp
        </Link>

        <div className="hidden md:flex gap-6">
          {links.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'hover:bg-blue-200'
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-100 shadow-inner">
          <div className="flex flex-col items-center gap-4 py-4">
            {links.map(({ name, to }) => (
              <NavLink
                key={name}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full text-center py-2 px-4 rounded-md transition ${
                    isActive
                      ? 'bg-blue-200 text-blue-700 font-semibold'
                      : 'hover:bg-blue-300'
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar