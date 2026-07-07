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

const links = [
  { label: 'Shop',    href: '/shop' },
  { label: 'About',   href: '/#about' },
  { label: 'Sell',    href: '/#sell' },
  { label: 'Events',  href: '/#events' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
]

const socials = [
  { href: 'https://instagram.com/momintumsportscards',                  label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/share/1HWTY8nVTU/?mibextid=wwXIfr', label: 'Facebook',  Icon: FacebookIcon  },
  { href: 'https://www.whatnot.com/s/HPUWASY3',                         label: 'Whatnot',   Icon: WhatnotIcon   },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy-dark border-t border-white/65">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <a href="#">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="Momintum" className="h-7 w-auto" />
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs font-semibold text-white/45 hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-yellow hover:text-brand-navy-dark hover:border-brand-yellow transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-white/65 text-center">
          <p className="text-xs text-white/25">© 2025 Momintum Cards & Collectibles · San Antonio, TX</p>
        </div>
      </div>
    </footer>
  )
}
