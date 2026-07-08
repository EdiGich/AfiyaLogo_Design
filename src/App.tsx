import { useEffect, useRef } from 'react'
import GuideChat from './GuideChat'

const PATHWAYS = [
  {
    num: '01',
    title: 'First-step guidance',
    body: 'Describe symptoms in everyday words. AFIYAPAL offers calm, clear next steps — never a replacement for emergency care.',
  },
  {
    num: '02',
    title: 'Health education that sticks',
    body: 'Short lessons on prevention, maternal care, nutrition, and chronic conditions — built for low-bandwidth and multilingual homes.',
  },
  {
    num: '03',
    title: 'Mental wellness support',
    body: 'Breathing tools, check-ins, and stigma-free language so seeking help feels familiar, not clinical.',
  },
  {
    num: '04',
    title: 'Doctor connections',
    body: 'When guidance is not enough, hand off to telemedicine with a ready symptom summary for licensed clinicians.',
  },
]

function useReveal() {
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = root.querySelectorAll('.pathway-item')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.25 },
    )
    items.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 0.12}s`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return ref
}

export default function App() {
  const pathwayRef = useReveal()

  return (
    <>
      <header className="hero">
        <nav className="nav" aria-label="Primary">
          <a className="nav-brand" href="#top">
            <img src="/logo-mark.svg" alt="" width={36} height={36} />
            <span className="nav-wordmark">
              <span>AFIYA</span>
              <span>PAL</span>
            </span>
          </a>
          <a className="nav-cta" href="#guide">
            Open the guide
          </a>
        </nav>

        <div className="hero-media" aria-hidden="true">
          <img
            src="/hero-clinic.jpg"
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="hero-veil" />
        </div>

        <div className="hero-content" id="top">
          <div className="brand-lockup">
            <img src="/logo-mark.svg" alt="" width={96} height={96} />
            <div>
              <p className="brand-name" aria-label="AFIYAPAL">
                <span className="afiya">AFIYA</span>
                <span className="pal">PAL</span>
              </p>
              <p className="tagline">
                <span>
                  Your Health <i className="dot dot-blue" />
                </span>
                <span>
                  Your Guide <i className="dot dot-green" />
                </span>
                <span>
                  Always with You <i className="dot dot-violet" />
                </span>
              </p>
            </div>
          </div>

          <h1>Health guidance that meets you where you are.</h1>
          <p className="hero-lead">
            AI-powered first steps for African communities — clear, multilingual,
            and ready to connect you to a doctor when you need one.
          </p>
          <div className="cta-row">
            <a className="btn-primary" href="#guide">
              Ask AFIYAPAL
            </a>
            <a className="btn-ghost" href="#pathways">
              How it helps
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section guide" id="guide" aria-labelledby="guide-heading">
          <div className="section-inner guide-layout">
            <div>
              <p className="section-kicker">Try the guide</p>
              <h2 id="guide-heading">A familiar voice for first-step care.</h2>
              <p className="section-lead">
                Tap a concern and watch how AFIYAPAL responds — plain language,
                calm next steps, and a path to a clinician when it matters.
              </p>
              <p className="lang-note">
                Built for <strong>Swahili, English, French</strong> and expanding —
                so guidance feels like home, not a foreign clinic form.
              </p>
            </div>
            <GuideChat />
          </div>
        </section>

        <section
          className="section pathways"
          id="pathways"
          aria-labelledby="pathways-heading"
        >
          <div className="section-inner">
            <p className="section-kicker">The journey</p>
            <h2 id="pathways-heading">From worry to a clear next step.</h2>
            <p className="section-lead">
              One companion across guidance, learning, wellness, and care —
              designed for real life across African communities.
            </p>
            <ul className="pathway-list" ref={pathwayRef}>
              {PATHWAYS.map((p) => (
                <li className="pathway-item" key={p.num}>
                  <span className="pathway-num" aria-hidden="true">
                    {p.num}
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section reach" aria-labelledby="reach-heading">
          <div className="section-inner">
            <p className="section-kicker">Why AFIYAPAL</p>
            <h2 id="reach-heading">Access that feels human.</h2>
            <p className="section-lead">
              Technology in service of trust — not another cold health app.
            </p>
            <div className="reach-grid">
              <article className="reach-item">
                <div className="reach-accent a" aria-hidden="true" />
                <h3>Simple by design</h3>
                <p>
                  Short answers, large tap targets, and offline-friendly content
                  so families can act even on slow connections.
                </p>
              </article>
              <article className="reach-item">
                <div className="reach-accent b" aria-hidden="true" />
                <h3>Community-aware</h3>
                <p>
                  Guidance shaped around local realities — pharmacies, clinics,
                  and the words people already use for feeling unwell.
                </p>
              </article>
              <article className="reach-item">
                <div className="reach-accent c" aria-hidden="true" />
                <h3>Care when needed</h3>
                <p>
                  Seamless handoff into telemedicine workflows with context
                  ready for the doctor — less repeating, faster help.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-heading">
          <div className="closing-inner">
            <h2 id="closing-heading">Your health. Your guide. Always with you.</h2>
            <p>
              Start with a question. Leave with a plan — and a path to a real
              clinician when you need one.
            </p>
            <a className="btn-primary" href="#guide">
              Begin with AFIYAPAL
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/logo-mark.svg" alt="" width={28} height={28} />
          AFIYAPAL
        </div>
        <p>AI-powered health guidance for African communities.</p>
      </footer>
    </>
  )
}
