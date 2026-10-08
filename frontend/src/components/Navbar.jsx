import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { X } from 'lucide-react'

gsap.registerPlugin(useGSAP)

const mainLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Health Ecosystems', to: '/health-ecosystems' },
  { label: 'Innovation Hub (H2i)', to: '/innovation-hub' },
  { label: 'Hackathon', to: '/hackathon' },
  { label: 'Student Internships', to: '/internships' },
]

const secondaryLinks = [
  { label: 'News & Events', to: '/news' },
  { label: 'Enquiries', to: '/enquiries' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const panel = useRef(null)
  const closeBtn = useRef(null)
  const tl = useRef(null)

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power4.inOut' } })
        .set(panel.current, { autoAlpha: 1 })
        .fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 1.2 })
        .from(
          '.menu-item',
          { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
          0.7,
        )
    },
    { scope: panel },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      gsap.set(closeBtn.current, { rotate: 0, scale: 1 })
      tl.current.timeScale(1).play()
    } else {
      tl.current.timeScale(1).reverse()
    }

    const lenis = window.__lenis
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = () => {
    gsap.to(closeBtn.current, {
      rotate: 180,
      scale: 0.7,
      duration: 0.6,
      ease: 'power2.inOut',
    })
    setOpen(false)
  }

  const renderLink = ({ label, to }) => {
    const active = pathname === to
    return (
      <li key={to} className="overflow-hidden">
        <Link
          to={to}
          onClick={closeMenu}
          className={`menu-item inline-block font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] uppercase text-navy-deep transition-colors hover:text-white ${
            active ? 'border-b-[6px] border-navy-deep' : ''
          }`}
        >
          {label}
        </Link>
      </li>
    )
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="font-hero text-3xl uppercase tracking-wide text-white md:text-4xl">
          CHII
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-12 cursor-pointer flex-col items-end justify-center gap-2"
        >
          <span className="h-0.5 w-11 bg-white" />
          <span className="h-0.5 w-11 bg-white" />
          <span className="h-0.5 w-11 bg-white" />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 hidden md:block"
          onClick={closeMenu}
        />
      )}

      <nav
        ref={panel}
        aria-label="Main menu"
        aria-hidden={!open}
        className="invisible fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-sky md:w-[46%]"
      >
        <button
          type="button"
          ref={closeBtn}
          aria-label="Close menu"
          onClick={closeMenu}
          className="absolute top-5 right-5 grid cursor-pointer h-10 w-10 place-items-center text-navy-deep md:top-6 md:right-10"
        >
          <X className="size-9" strokeWidth={1.5} />
        </button>

        <div className="flex min-h-full flex-col justify-center px-8 py-24 md:px-[18%]">
          <ul>{mainLinks.map(renderLink)}</ul>
          <hr className="my-6 w-full max-w-md border-navy-deep/30" />
          <ul>{secondaryLinks.map(renderLink)}</ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
