import "@/app/eskai-ops.css"

const TRIAL_URL = "https://t.me/kamyasamuel"
const DEMO_MAIL = "mailto:kamyasamuel@eskaen.com?subject=Eskai%20Ops%20%E2%80%94%20Book%20a%20demo"
const EMAIL = "mailto:kamyasamuel@eskaen.com"
const PHONE = "tel:+256731300025"
const TELEGRAM = "https://t.me/kamyasamuel"

export default function EskaiOpsLanding() {
  const year = new Date().getFullYear()
  return (
    <div className="eskai-ops">
      <nav>
        <div className="logo">
          Eskai<span>Ops</span>
        </div>
        <div className="links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <a className="btn ghost" href={TRIAL_URL}>
          Get started
        </a>
      </nav>

      <header className="hero">
        <div className="badge">Built on Eskaen Technologies · v0.1</div>
        <h1>
          Your business runs itself.
          <br />
          You just <em>watch it happen.</em>
        </h1>
        <p className="sub">
          Eskai Ops is the AI operations agent that runs your recurring business tasks, watches your
          systems, and reports to you on Telegram. No dashboard to babysit. No tickets. Just outcomes.
        </p>
        <div className="cta-row">
          <a className="btn" href={TRIAL_URL}>
            Start free trial
          </a>
          <a className="btn ghost" href="#how">
            See how it works
          </a>
        </div>
        <div className="trust">
          <div>
            <b>24/7</b>Autonomous operation
          </div>
          <div>
            <b>100%</b>Telegram-first
          </div>
          <div>
            <b>0</b>Dashboards to babysit
          </div>
          <div>
            <b>1 msg</b>To cancel anything
          </div>
        </div>
      </header>

      <section id="features">
        <div className="wrap">
          <h2>Everything an ops team does. Minus the team.</h2>
          <p className="sec-sub">
            Eskai Ops plans, builds, runs, and verifies your recurring operations — then reports back so
            you only ever act on what matters.
          </p>
          <div className="grid">
            <div className="card">
              <div className="ico">📋</div>
              <h3>Scheduled instructions</h3>
              <p>
                Set it once — &quot;every morning at 8am&quot; — and the engine runs it daily, weekly, or on
                demand. Every run is logged and every report is stored.
              </p>
            </div>
            <div className="card">
              <div className="ico">💬</div>
              <h3>Telegram-first</h3>
              <p>
                Talk to your ops agent in chat like you would a colleague. Results land in your pocket,
                not in a portal you forget to open.
              </p>
            </div>
            <div className="card">
              <div className="ico">⏹</div>
              <h3>Task interruption</h3>
              <p>
                Send &quot;cancel&quot; at any moment and the running task stops safely at its next checkpoint.
                Your queued messages flush. Nothing runs away from you.
              </p>
            </div>
            <div className="card">
              <div className="ico">❤️</div>
              <h3>Health &amp; uptime monitoring</h3>
              <p>
                Sites, APIs, and databases watched around the clock. The moment something breaks, you get
                an alert — often before your customers notice.
              </p>
            </div>
            <div className="card">
              <div className="ico">📦</div>
              <h3>Inventory &amp; store sync</h3>
              <p>
                Stock levels, out-of-stock flags, and rogue test data handled automatically. Products stay
                live, accurate, and sellable.
              </p>
            </div>
            <div className="card">
              <div className="ico">📊</div>
              <h3>Daily business reports</h3>
              <p>
                Traffic, orders, messages, revenue — a clean digest every morning. You read one message
                instead of five tools.
              </p>
            </div>
            <div className="card">
              <div className="ico">🔌</div>
              <h3>REST + WebSocket APIs</h3>
              <p>
                Fully authenticated APIs let Eskai Ops plug into the tools you already use — or embed its
                brain in your own product.
              </p>
            </div>
            <div className="card">
              <div className="ico">🧾</div>
              <h3>Full audit trail</h3>
              <p>
                Every instruction, every run, every decision recorded in a searchable registry. When
                something changes, you know exactly what, when, and why.
              </p>
            </div>
            <div className="card">
              <div className="ico">🛡</div>
              <h3>Safe by design</h3>
              <p>
                Cooperative cancellation, checkpointed work, and rollback-friendly changes. The agent is
                powerful; you are always in control.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="wrap">
          <h2>Live in three steps</h2>
          <p className="sec-sub">From zero to automated in less time than your last status meeting.</p>
          <div className="steps">
            <div className="step">
              <h3>Connect</h3>
              <p>Point Eskai Ops at your site, store, or tools. OAuth or API key — five minutes.</p>
            </div>
            <div className="step">
              <h3>Configure</h3>
              <p>Tell it what to watch and when: daily reports, stock alerts, health checks, content runs.</p>
            </div>
            <div className="step">
              <h3>Relax</h3>
              <p>It runs, verifies, and reports. It only pings you when something actually needs you.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="wrap">
          <h2>Pricing that scales with you</h2>
          <p className="sec-sub">
            Start small, upgrade when the automations pay for themselves. Every plan includes the Telegram
            agent, the instruction engine, and the audit trail.
          </p>
          <div className="price-grid">
            <div className="plan">
              <h3>Starter</h3>
              <div className="price">
                $49<span>/month</span>
              </div>
              <ul>
                <li>3 scheduled automations</li>
                <li>Daily business report</li>
                <li>1 monitored site or API</li>
                <li>Task interruption &amp; queue</li>
                <li>Email support</li>
              </ul>
              <a className="btn ghost" href={TRIAL_URL}>
                Start free trial
              </a>
            </div>
            <div className="plan popular">
              <div className="tag">Most popular</div>
              <h3>Growth</h3>
              <div className="price">
                $99<span>/month</span>
              </div>
              <ul>
                <li>10 scheduled automations</li>
                <li>3 monitored sites / APIs</li>
                <li>Inventory &amp; store sync</li>
                <li>REST + WebSocket access</li>
                <li>Telegram + email alerts</li>
                <li>Priority support</li>
              </ul>
              <a className="btn" href={TRIAL_URL}>
                Start free trial
              </a>
            </div>
            <div className="plan">
              <h3>Enterprise</h3>
              <div className="price">Custom</div>
              <ul>
                <li>Unlimited automations</li>
                <li>White-label / embedded agent</li>
                <li>Dedicated agent instance</li>
                <li>SLA &amp; onboarding</li>
                <li>Custom integrations</li>
              </ul>
              <a className="btn ghost" href={DEMO_MAIL}>
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <h2>Questions, answered</h2>
          <p className="sec-sub">The things teams ask before they hand over their busywork.</p>
          <details open>
            <summary>Is it safe? Can I stop a task once it&apos;s running?</summary>
            <p>
              Yes — that&apos;s a core design principle. Send &quot;cancel&quot; in chat at any moment and the agent
              stops at its next safe checkpoint, then confirms. Queued messages are flushed. You always stay
              in control, even at full autonomy.
            </p>
          </details>
          <details>
            <summary>Do I need a dashboard?</summary>
            <p>
              No. Eskai Ops is Telegram-first by design. Results, alerts, and reports arrive in chat. If you
              ever want one, the audit trail and APIs are there — but they&apos;re optional, not required.
            </p>
          </details>
          <details>
            <summary>What can it actually automate?</summary>
            <p>
              Anything recurring and verifiable: daily/weekly reports, uptime and health checks, inventory
              sync, stock-out alerts, data cleanups, content runs, and custom business workflows you define
              in plain language.
            </p>
          </details>
          <details>
            <summary>Who is this for?</summary>
            <p>
              E-commerce operators, agencies managing client sites, and solo founders who need a small ops
              team without hiring one. If you have recurring tasks and a Telegram account, you qualify.
            </p>
          </details>
          <details>
            <summary>What happens to my data?</summary>
            <p>
              Your configuration, instructions, and reports are stored in your own registry. The agent logs
              every run so you have a full, searchable history of what happened and why.
            </p>
          </details>
        </div>
      </section>

      <div className="cta-band">
        <h2>Give your busywork a resignation letter.</h2>
        <p>Start your free trial today. Cancel anytime — with one word, obviously.</p>
        <a className="btn" href={TRIAL_URL}>
          Start free trial
        </a>
      </div>

      <footer>
        <div className="wrap">
          <p>
            <strong>Eskai Ops</strong> — a product of{" "}
            <a href="https://eskai.eskaen.com">Eskaen Technologies</a>. © {year} Eskaen Technologies.
            All rights reserved.
          </p>
          <p className="foot-contact">
            <a href={EMAIL}>kamyasamuel@eskaen.com</a> ·{" "}
            <a href={PHONE}>+256 731 300 025</a> ·{" "}
            <a href={TELEGRAM}>@kamyasamuel</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
