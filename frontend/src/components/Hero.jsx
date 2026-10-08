import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from 'lucide-react'
import { heroImg } from '../assets/assets'

gsap.registerPlugin(SplitText, useGSAP)

function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const split = SplitText.create('.hero-title', { type: 'chars' })
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('.hero-bg', { scale: 1.15, duration: 2 })
        .from(
          split.chars,
          { yPercent: 110, opacity: 0, duration: 1, stagger: 0.03 },
          0.2,
        )
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, 1.2)

      gsap.to('.hero-bg', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative h-svh min-h-[560px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Students collaborating on laptops at an ALU health innovation session"
        className="hero-bg absolute inset-0 h-[115%] w-full object-cover object-[65%_50%]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy-deep/70 via-navy-deep/45 to-navy-deep/85" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <h1 className="hero-title font-hero text-[clamp(2.5rem,9vw,9rem)] leading-[0.95] uppercase text-sky">
          Health Innovation <br /> &amp; Impact
        </h1>
      </div>

      <a
        href="#about"
        className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-display text-3xl tracking-wide text-white"
      >
        SCROLL
        <ArrowDown className="size-8 text-sky" />
      </a>
    </section>
  )
}

export default Hero
