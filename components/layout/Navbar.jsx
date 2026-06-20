import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',  href: '#about' },
  { label: 'Sell',   href: '#sell' },
  { label: 'Events', href: '#events' },
  { label: 'Reviews', href: '#reviews' },
]

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const WhatnotIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const socials = [
  { href: 'https://instagram.com/momintumsportscards',                    label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/share/1HWTY8nVTU/?mibextid=wwXIfr',   label: 'Facebook',  Icon: FacebookIcon  },
  { href: 'https://www.whatnot.com',                                      label: 'Whatnot',   Icon: WhatnotIcon   },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 bg-brand-navy-dark py-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center">

            {/* Left — nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="relative px-4 py-2 text-sm font-semibold text-white/65 hover:text-white rounded-full hover:bg-white/8 transition-colors duration-200 group"
                >
                  {label}
                  <span className="absolute bottom-1.5 left-4 right-4 h-px bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </a>
              ))}
            </nav>

            {/* Mobile — burger (left-aligned on small screens) */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(v => !v)}
                className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
                aria-label="Toggle menu"
              >
                <motion.span className="block w-6 h-[2px] bg-white rounded-full" animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
                <motion.span className="block w-6 h-[2px] bg-white rounded-full" animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} />
                <motion.span className="block w-6 h-[2px] bg-white rounded-full" animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
              </button>
            </div>

            {/* Center — logo */}
            <div className="flex justify-center">
              <a href="#" onClick={close}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-white.png" alt="Momintum" className="h-8 w-auto" />
              </a>
            </div>

            {/* Right — socials + CTA */}
            <div className="flex items-center justify-end gap-2">
              <div className="hidden md:flex items-center gap-1 mr-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-white/45 hover:text-white hover:bg-white/8 transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="hidden md:inline-flex px-5 py-2 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors duration-200"
              >
                Visit Us
              </a>
              {/* Mobile visit us */}
              <a
                href="#contact"
                onClick={close}
                className="md:hidden px-4 py-2 bg-brand-yellow text-brand-navy-dark text-xs font-bold rounded-full"
              >
                Visit Us
              </a>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-brand-navy-dark flex flex-col items-center justify-center gap-2"
            initial={{ opacity: 0, clipPath: 'circle(0% at 40px 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 40px 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 40px 40px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={close}
                className="font-bebas text-5xl tracking-widest text-white hover:text-brand-yellow transition-colors duration-200 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                {label}
              </motion.a>
            ))}
            {/* Social icons in mobile menu */}
            <motion.div
              className="flex items-center gap-3 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
            >
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/60 hover:bg-brand-yellow hover:text-brand-navy-dark hover:border-brand-yellow transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </motion.div>
            <motion.a
              href="#contact"
              onClick={close}
              className="mt-4 px-8 py-3 bg-brand-yellow text-brand-navy-dark font-bold text-base rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.4 }}
            >
              Visit Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
