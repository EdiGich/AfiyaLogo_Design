import { useEffect, useRef, useState } from 'react'

type Message = {
  id: number
  role: 'user' | 'bot'
  text: string
}

const PROMPTS: { label: string; reply: string }[] = [
  {
    label: 'Fever & headache',
    reply:
      'I hear you. Rest, cool fluids, and a cool cloth can help. If fever lasts more than 2 days, breathing feels hard, or you feel confused, please see a clinician. Want me to find nearby care options?',
  },
  {
    label: 'Feeling anxious',
    reply:
      'You are not alone. Try a slow 4–4–6 breath: inhale 4, hold 4, exhale 6 — three times. If worry stays heavy for weeks or you feel unsafe, we can connect you with a counselor. Shall we try the breath together?',
  },
  {
    label: 'Child with cough',
    reply:
      'Keep your child upright, offer warm fluids, and watch for fast breathing or chest pulling in. Those signs need urgent care. I can share a simple home-care checklist in Swahili or English — which do you prefer?',
  },
  {
    label: 'Talk to a doctor',
    reply:
      'I can prepare a short summary of your symptoms and connect you with a licensed clinician for a telemedicine visit. Tell me the main concern in one sentence and I will guide the next step.',
  },
]

export default function GuideChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: 'Habari — I am AFIYAPAL. Tell me how you feel, or pick a topic below. I guide first steps in plain language.',
    },
  ])
  const [active, setActive] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(1)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function ask(prompt: (typeof PROMPTS)[number]) {
    if (typing) return
    setActive(prompt.label)
    const userMsg: Message = { id: idRef.current++, role: 'user', text: prompt.label }
    setMessages((m) => [...m, userMsg])
    setTyping(true)

    window.setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: 'bot', text: prompt.reply },
      ])
    }, 1100)
  }

  return (
    <div className="guide-panel" aria-live="polite">
      <div className="guide-top">
        <img src="/logo-mark.svg" alt="" width={38} height={38} />
        <div>
          <strong>AFIYAPAL Guide</strong>
          <small>Always with you · EN · SW · FR</small>
        </div>
      </div>

      <div className="chat" ref={chatRef}>
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`bubble bubble-${msg.role}`}
            style={{ animationDelay: `${Math.min(i * 0.05, 0.2)}s` }}
          >
            {msg.text}
          </div>
        ))}
        {typing && (
          <div className="typing" aria-label="AFIYAPAL is typing">
            <i /><i /><i />
          </div>
        )}
      </div>

      <div className="prompt-chips" role="group" aria-label="Try a health question">
        {PROMPTS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={active === p.label ? 'active' : undefined}
            onClick={() => ask(p)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
