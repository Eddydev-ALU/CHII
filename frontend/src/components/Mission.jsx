import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { teamImg } from '../assets/assets'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Row of rounded blocks (short/tall alternating) in the brand sky blue
const barsBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 125 85'%3E%3Cpath fill='%2312bdfb' d='M0 85V60A25 25 0 0 1 25 35H35V85ZM63 85V0H73A25 25 0 0 1 98 25V85Z'/%3E%3C/svg%3E")`

const pillars = [
  {
    lead: 'Health Ecosystems',
    text: ' - research-informed programming, partnerships and leadership development to co-create solutions and train health leaders who build equitable, inclusive and resilient health systems.',
  },
  {
    lead: 'Health Innovation Hub (H2i) @ ALU',
    text: ' - an active health entrepreneurship program in Mauritius and Rwanda, with themed "Accelera" sessions every quarter shaped by conversations with African ventures.',
  },
  {
    lead: 'Healthcare Entrepreneurship Hackathon',
    text: ' - held in Kigali from February 26-29, 2024 to encourage practical, sustainable solutions to Africa’s healthcare challenges.',
  },
]

function Mission() {
  const root = useRef(null)

  useGSAP(
    () => {
      // autoSplit re-splits once the web fonts load, so line breaks match the final layout
      SplitText.create('.mission-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.mission-title', start: 'top 85%' },
          }),
      })

      gsap.from('.mission-copy p', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.mission-copy', start: 'top 85%' },
      })

      const mm = gsap.matchMedia()

      // Desktop: pin the stage so the photo and the three items share one view
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.mission-stage',
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1.5,
          },
        })

        tl.fromTo('.mission-img', { x: '2vw' }, { x: '-2vw', ease: 'none', duration: 3 }, 0)
        gsap.utils.toArray('.pillar').forEach((el, i) => {
          tl.from(el, { xPercent: 40, opacity: 0, ease: 'power2.out', duration: 0.9 }, i * 0.9)
        })
      })

      // Mobile: normal flow, each item slides in from the right
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('.pillar').forEach((el) => {
          gsap.from(el, {
            xPercent: 20,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      id="mission"
      ref={root}
      className="overflow-x-clip bg-black px-5 pb-20 md:px-[6%] md:pb-0"
    >
      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
        <h2 className="mission-title font-display text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.05] uppercase text-white">
          Building Africa&apos;s next generation of{' '}
          <span className="text-sky">health leaders, innovators and ventures.</span>
        </h2>

        <div className="mission-copy max-w-xl space-y-5 md:col-start-2 text-base leading-relaxed text-white md:ml-auto md:pr-4 md:text-lg">
          <p>
            It&apos;s part of ALU&apos;s broader ambition to strengthen health institutions and develop
            future health leaders on the continent. The work is funded through the Mastercard
            Foundation-sponsored Higher Education Health Collaborative and supports ALU&apos;s goal of
            building an entrepreneurial school of health.
          </p>
          <p>
            Dr. Achieng&apos; Aling&apos; is a medical doctor and global health professional. As
            ALU&apos;s Healthcare Programs Director she leads its African Health Collaborative work,
            focused on developing health leaders through entrepreneurship, workforce development
            and primary healthcare innovation.
          </p>
        </div>
      </div>

      <div className="mission-stage relative mt-10 grid md:-mt-10 md:h-svh md:grid-cols-2 md:gap-16 md:pt-24 md:pb-12">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 -left-5 h-[8vw] w-[100vw] md:-left-[6vw] md:h-[4.3vw] md:w-[58vw]"
            style={{
              backgroundImage: barsBg,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left bottom',
              backgroundSize: 'auto 100%',
            }}
          />
          <div className="pointer-events-none relative z-10 -mt-[30%] w-full md:absolute md:bottom-0 md:left-0 md:mt-0 md:aspect-square md:h-[145%] md:w-auto md:-translate-x-[18%]">
            <img
              src={teamImg}
              alt="A health worker being examined during a CHII community outreach"
              className="mission-img h-full w-full [mask-image:linear-gradient(to_right,#000_70%,transparent_88%)]"
            />
          </div>
        </div>

        <ul className="relative z-20 mt-10 self-center md:mt-0">
          {pillars.map(({ lead, text }, i) => (
            <li
              key={lead}
              className={`pillar border-t border-white/20 py-7 md:py-8 ${
                i === pillars.length - 1 ? 'border-b' : ''
              }`}
            >
              <p className="text-lg leading-snug text-white md:text-[1.2rem]">
                <span className="text-sky">{lead}</span>
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Mission
