import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, User, Settings, LogOut } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    function handleEsc(event) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsOpen(false);
      }
    }
    function handleScroll() {
      setIsDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-blue-50/80 shadow-sm text-blue-900">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MindfulApp
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {[
            { name: "Home", to: "/" },
            { name: "About", to: "/about" },
            { name: "Products", to: "/products" },
            { name: "Contact", to: "/contact" },
          ].map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-blue-200"
                }`
              }
            >
              {name}
            </NavLink>
          ))}

          <div className="relative ml-6" ref={dropdownRef}>
            <div className="group relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full border border-blue-200 hover:border-blue-400 transition"
              >
                <User className="w-6 h-6" />
              </button>
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 text-xs text-white bg-blue-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-md">
                Profile
              </div>
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-blue-100 rounded-lg shadow-md py-2"
                >
                  <button className="flex items-center w-full px-4 py-2 text-blue-700 hover:bg-blue-50 transition">
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-blue-700 hover:bg-blue-50 transition">
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition">
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-1/2 max-w-sm h-full bg-white z-50 flex flex-col p-6 space-y-6"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-blue-700 hover:text-blue-900"
                aria-label="Close menu"
              >
                ✕
              </button>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="flex items-center gap-2 p-3 bg-blue-50 rounded-2xl shadow-md"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-blue-800 text-sm">
                    Mindful User
                  </p>
                  <button className="mt-1 flex items-center gap-1 text-xs text-blue-600 px-2 py-1 rounded-md hover:bg-blue-100 transition">
                    View Profile
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Separator */}
              <div className="border-t border-blue-100" />
              <div className="flex flex-col gap-4">
                {[
                  { name: "Home", to: "/" },
                  { name: "About", to: "/about" },
                  { name: "Products", to: "/products" },
                  { name: "Contact", to: "/contact" },
                ].map(({ name, to }) => (
                  <NavLink
                    key={name}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `w-full text-left py-2 px-4 rounded-md transition ${
                        isActive
                          ? "bg-blue-200 text-blue-700 font-semibold"
                          : "hover:bg-blue-50 text-blue-800"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
