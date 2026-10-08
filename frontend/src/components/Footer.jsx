import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const socials = [
  { label: 'Facebook', href: '#', Icon: FaFacebookF },
  { label: 'LinkedIn', href: '#', Icon: FaLinkedinIn },
  { label: 'TikTok', href: '#', Icon: FaTiktok },
  { label: 'Instagram', href: 'https://www.instagram.com/aluhealth', Icon: FaInstagram },
  { label: 'YouTube', href: '#', Icon: FaYoutube },
  { label: 'X', href: '#', Icon: FaXTwitter },
]

const legal = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookie Policy', to: '/cookies' },
]

const marquee = 'Train. Innovate. Impact. '.repeat(6)

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="flex h-[22vw] min-h-40 items-center overflow-hidden bg-sky md:h-[14vw]">
        <p
          aria-hidden="true"
          className="footer-marquee flex w-max whitespace-nowrap font-hero text-[clamp(3rem,8vw,8rem)] uppercase text-navy-deep"
        >
          <span>{marquee}</span>
          <span>{marquee}</span>
        </p>
      </div>

      <ul className="grid grid-cols-3 border-b border-white/15 md:grid-cols-6">
        {socials.map(({ label, href, Icon }) => (
          <li
            key={label}
            className="border-r border-b border-white/15 last:border-r-0 md:border-b-0 md:[&:nth-child(3)]:border-r [&:nth-child(3)]:border-r-0 md:[&:nth-child(3)]:border-r-white/15"
          >
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group relative flex h-28 items-center justify-center overflow-hidden md:h-[8.5vw]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-right scale-x-0 bg-sky transition-transform duration-700 ease-out group-hover:origin-left group-hover:scale-x-100"
              />
              <Icon className="relative size-8 transition-colors duration-700 ease-out group-hover:text-navy-deep md:size-10" />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 px-5 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <span>&copy; CHII @ ALU 2026</span>
          {legal.map(({ label, to }) => (
            <Link key={to} to={to} className="transition-colors hover:text-sky">
              {label}
            </Link>
          ))}
        </div>
        <span>Supported by the Mastercard Foundation</span>
      </div>
    </footer>
  )
}

export default Footer
