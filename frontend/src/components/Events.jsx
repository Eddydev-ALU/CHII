import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { MapPin } from 'lucide-react'
import {
  healthxImg,
  afyafestImg,
  conveningImg,
  waitingRoomImg,
  signatureImg,
  ahtsImg,
} from '../assets/assets'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const events = [
  {
    month: 'Jun',
    year: '2025',
    title: "HealthX: Explore What's Next",
    place: 'Kigali',
    text: 'Students met leading health organizations to explore careers, present their ventures and share their missions in health.',
    img: healthxImg,
    alt: 'Students and partner organizations at HealthX',
  },
  {
    month: 'Aug',
    year: '2025',
    title: 'AfyaFest Hackathon',
    place: 'Nairobi',
    text: "Ten ALU ventures pitched alongside innovators from across Africa. L-Guard won the People's Choice Award.",
    img: afyafestImg,
    alt: 'ALU ventures at the AfyaFest Hackathon in Nairobi',
  },
  {
    month: 'Oct',
    year: '2025',
    title: 'Africa Health Collaborative Convening',
    place: 'Kigali',
    text: "Partner institutions gathered to advance Africa's health workforce and innovation ecosystems.",
    img: conveningImg,
    alt: 'Delegates at the Africa Health Collaborative annual convening',
  },
  {
    month: 'May',
    year: '2026',
    title: 'The Waiting Room Hackathon',
    text: 'Eight teams pitched healthcare solutions. Ruvimbo, Baho Care and Farumasi took the top three spots.',
    img: waitingRoomImg,
    alt: 'Teams pitching at The Waiting Room Hackathon',
  },
  {
    month: 'Jul',
    year: '2026',
    title: 'Health Signature Immersive Experience',
    text: 'Students spent time with host organizations to see community health, nutrition and youth empowerment in practice.',
    img: signatureImg,
    alt: 'Participants of the Health Signature Immersive Experience',
  },
  {
    month: 'Sep',
    year: '2026',
    title: 'Africa HealthTech Summit',
    place: 'Kigali',
    text: 'At AHTS @ 5, our breakout explored how to build Africa’s future innovative health workforce.',
    img: ahtsImg,
    alt: 'Speakers at the Africa HealthTech Summit breakout session',
  },
]

function Events() {
  const root = useRef(null)

  useGSAP(
    () => {
      SplitText.create('.events-title .line-reveal', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.events-title', start: 'top 85%' },
          }),
      })

      gsap.fromTo(
        '.tl-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-list',
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 1,
          },
        },
      )

      gsap.utils.toArray('.tl-item').forEach((item) => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: item, start: 'top 75%' },
        })
        tl.from(item.querySelector('.tl-media'), {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.4,
          ease: 'power4.inOut',
        })
          .from(item.querySelector('.tl-media img'), { scale: 1.25, duration: 1.8 }, 0)
          .from(item.querySelector('.tl-date'), { y: 30, opacity: 0, duration: 1 }, 0.2)
          .from(
            item.querySelectorAll('.tl-text > *'),
            { y: 30, opacity: 0, duration: 1, stagger: 0.12 },
            0.4,
          )
      })
    },
    { scope: root },
  )

  return (
    <section
      id="events"
      ref={root}
      className="overflow-x-clip bg-black px-5 pt-24 pb-24 md:px-[6%] md:pt-32 md:pb-40"
    >
      <h2 className="events-title font-hero text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[1.02] uppercase text-white">
        <span className="line-reveal block">Events &amp;</span>
        <span className="line-reveal block font-display font-normal">Milestones</span>
      </h2>

      <div className="tl-list relative mt-16 md:mt-24">
        <div className="tl-line absolute top-0 bottom-0 left-1/2 hidden w-[3px] -translate-x-1/2 origin-top bg-white md:block" />

        {events.map((e, i) => {
          const imageLeft = i % 2 === 0
          return (
            <article
              key={e.title}
              className="tl-item relative grid items-center gap-6 py-10 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-24"
            >
              <div
                className={`tl-media relative z-0 aspect-[3/2] overflow-hidden ${
                  imageLeft ? 'md:col-start-1 md:-mr-[3.5vw]' : 'md:col-start-3 md:-ml-[3.5vw]'
                } md:row-start-1`}
              >
                <img src={e.img} alt={e.alt} loading="lazy" className="h-full w-full object-cover" />
                <div
                  className={`pointer-events-none absolute inset-y-0 hidden w-2/5 from-black/70 to-transparent md:block ${
                    imageLeft ? 'right-0 bg-linear-to-l' : 'left-0 bg-linear-to-r'
                  }`}
                />
              </div>

              <div className="tl-date relative z-20 flex flex-col items-center px-3 py-2 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:hidden before:w-4 before:-translate-x-1/2 before:bg-black md:col-start-2 md:row-start-1 md:before:block [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                <span className="font-display text-lg tracking-widest text-white md:text-2xl">
                  {e.month.toUpperCase()}
                </span>
                <span className="font-hero text-[clamp(2.5rem,5.5vw,5.5rem)] leading-none text-sky">
                  {e.year}
                </span>
              </div>

              <div
                className={`tl-text md:row-start-1 ${
                  imageLeft ? 'md:col-start-3 md:pl-[7%]' : 'md:col-start-1 md:pl-[2%] md:pr-[7%]'
                }`}
              >
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none uppercase text-white">
                  {e.title}
                </h3>
                {e.place && (
                  <p className="mt-3 flex items-center gap-2 font-display text-xl uppercase text-white md:text-2xl">
                    <MapPin className="size-5 text-sky" /> {e.place}
                  </p>
                )}
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
                  {e.text}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Events
