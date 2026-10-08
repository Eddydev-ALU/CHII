import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { chiiVideo } from '../assets/assets'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const lines = ['Train.', 'Innovate.', 'Impact.']

function Intro() {
  const root = useRef(null)

  useGSAP(
    () => {
      SplitText.create('.intro-line', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: { trigger: '.intro-title', start: 'top 80%' },
          }),
      })

      gsap.from('.intro-copy', {
        y: 40,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.intro-copy', start: 'top 85%' },
      })

      gsap.to('.intro-title', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.fromTo(
        '.intro-video',
        { scale: 0.9 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro-video',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section
      id="about"
      ref={root}
      className="relative overflow-hidden bg-black px-5 pt-24 pb-24 md:px-[6%] md:pt-40 md:pb-40"
    >
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <h2 className="intro-title relative z-10 font-hero text-[clamp(3rem,8.5vw,9rem)] leading-[0.95] uppercase text-sky">
          {lines.map((line) => (
            <span key={line} className="intro-line block">
              {line}
            </span>
          ))}
        </h2>

        <p className="intro-copy max-w-xl text-base leading-relaxed text-white md:ml-auto md:pr-4 md:text-lg">
          ALU&apos;s health work sits within the Health Collaborative program under the Center for
          Health Innovation and Impact (CHII). We are a multidisciplinary, mission-driven team
          focused on transforming healthcare outcomes across Africa.
        </p>
      </div>

      <div className="intro-video relative mx-auto -mt-6 aspect-video w-[92%] overflow-hidden md:-mt-[6vw] md:ml-[1.5%] md:w-[92%]">
        <video
          src={chiiVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default Intro
