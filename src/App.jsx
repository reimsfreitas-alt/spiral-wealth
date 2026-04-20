import { useState, useEffect } from "react";

const WHATSAPP_URL = "https://3199409045?text=I%20want%20early%20access%20to%20Spiral%20Wealth";

const SpiralSVG = ({ animate }) => {
  const pts = [];
  for (let i = 0; i < 300; i++) {
    const t = (i / 300) * 4 * Math.PI;
    const r = (i / 300) * 130;
    pts.push({ x: 160 + r * Math.cos(t - Math.PI / 2), y: 160 + r * Math.sin(t - Math.PI / 2) });
  }
  const d = pts.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
  return (
    <svg viewBox="0 0 320 320" width="180" height="180">
      <defs>
        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8964f" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#d4af70" />
          <stop offset="100%" stopColor="#f0d898" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={d} fill="none" stroke="url(#sg)" strokeWidth="1.8" strokeLinecap="round" filter="url(#glow)"
        style={{
          strokeDasharray: 3000, strokeDashoffset: animate ? 0 : 3000,
          transition: animate ? "stroke-dashoffset 2.8s cubic-bezier(0.4,0,0.2,1)" : "none",
        }} />
    </svg>
  );
};

const MINUTE_STEPS = [
  { icon: "◎", label: "Breathe",    instruction: "Close your eyes. Take 3 slow, deep breaths. Feel your body settle.",                  duration: 20 },
  { icon: "◈", label: "Clarify",    instruction: "What is one financial truth you've been avoiding? Name it honestly.",                   duration: 25 },
  { icon: "◉", label: "Spiral In",  instruction: "Where does this pattern begin? Follow it inward without judgment.",                     duration: 25 },
  { icon: "◇", label: "Reframe",    instruction: "What would wealth look like if it came from within — not from fear?",                   duration: 25 },
  { icon: "◆", label: "Anchor",     instruction: "Set one micro-intention for today. Small. Real. Yours.",                                duration: 20 },
  { icon: "✦", label: "Complete",   instruction: "You've begun the spiral. Wealth starts in moments like this one.",                      duration: null },
];

const BG = () => (
  <>
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.45,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
    }} />
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      background: "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(180,140,70,0.08) 0%, transparent 70%)",
    }} />
  </>
);

const GoldBtn = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    background: "linear-gradient(135deg, #b8964f 0%, #e8d5a3 50%, #b8964f 100%)",
    backgroundSize: "200% 100%", backgroundPosition: "100% 0",
    color: "#080809", border: "none", borderRadius: "1px",
    padding: "1.1rem 2rem", fontSize: "0.72rem", fontFamily: "Georgia, serif",
    fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase",
    cursor: "pointer", width: "100%",
    boxShadow: "0 0 40px rgba(180,140,70,0.4), 0 4px 24px rgba(0,0,0,0.6)",
    transition: "background-position 0.5s, box-shadow 0.3s, transform 0.2s",
    ...style,
  }}
    onMouseEnter={e => { e.currentTarget.style.backgroundPosition = "0 0"; e.currentTarget.style.boxShadow = "0 0 64px rgba(212,175,112,0.6), 0 8px 32px rgba(0,0,0,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.backgroundPosition = "100% 0"; e.currentTarget.style.boxShadow = "0 0 40px rgba(180,140,70,0.4), 0 4px 24px rgba(0,0,0,0.6)"; e.currentTarget.style.transform = "translateY(0)"; }}
    onTouchStart={e => e.currentTarget.style.opacity = "0.8"}
    onTouchEnd={e => e.currentTarget.style.opacity = "1"}
  >{children}</button>
);

const OutlineBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background: "transparent", color: "#d4af70",
    border: "1px solid rgba(212,175,112,0.32)", borderRadius: "1px",
    padding: "1.1rem 2rem", fontSize: "0.72rem", fontFamily: "Georgia, serif",
    fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase",
    cursor: "pointer", width: "100%",
    transition: "border-color 0.25s, background 0.25s, transform 0.2s",
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,112,0.75)"; e.currentTarget.style.background = "rgba(212,175,112,0.07)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,112,0.32)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
    onTouchStart={e => e.currentTarget.style.opacity = "0.7"}
    onTouchEnd={e => e.currentTarget.style.opacity = "1"}
  >{children}</button>
);

const SpiralMinute = ({ onBack }) => {
  const [step, setStep]       = useState(0);
  const [vis, setVis]         = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  useEffect(() => {
    setVis(false); setProgress(0);
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const { duration } = MINUTE_STEPS[step];
    if (!duration) return;
    setProgress(0);
    let elapsed = 0;
    const total = duration * 1000, tick = 50;
    const id = setInterval(() => { elapsed += tick; setProgress(Math.min((elapsed / total) * 100, 100)); if (elapsed >= total) clearInterval(id); }, tick);
    return () => clearInterval(id);
  }, [step]);

  const enter = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  const current = MINUTE_STEPS[step];
  const isLast  = step === MINUTE_STEPS.length - 1;

  return (
    <div style={{ minHeight: "100dvh", background: "#080809", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 1.75rem", fontFamily: "Georgia, 'Times New Roman', serif", position: "relative", overflow: "hidden" }}>
      <BG />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Back */}
        <div style={{ ...enter(0), width: "100%", marginBottom: "2.2rem" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(212,175,112,0.38)", fontFamily: "Georgia, serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(212,175,112,0.8)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(212,175,112,0.38)"}
          >← Spiral Wealth</button>
        </div>

        {/* Dots */}
        <div style={{ ...enter(0.1), display: "flex", gap: 8, marginBottom: "2.8rem" }}>
          {MINUTE_STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i <= step ? "#d4af70" : "rgba(212,175,112,0.18)", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }} />
          ))}
        </div>

        {/* Icon */}
        <div style={{ ...enter(0.15) }}>
          <style>{`@keyframes breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.65;transform:scale(0.92)}}`}</style>
          <div style={{ fontSize: "2.6rem", color: "#d4af70", marginBottom: "1.4rem", textShadow: "0 0 28px rgba(212,175,112,0.5)", animation: "breathe 3.5s ease-in-out infinite" }}>
            {current.icon}
          </div>
        </div>

        {/* Step label */}
        <div style={{ ...enter(0.22), textAlign: "center", marginBottom: "0.6rem" }}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.38em", color: "rgba(212,175,112,0.4)", textTransform: "uppercase", margin: 0 }}>
            Step {step + 1} of {MINUTE_STEPS.length}
          </p>
        </div>

        {/* Title */}
        <div style={{ ...enter(0.28), marginBottom: "1.4rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 8vw, 2.6rem)", fontWeight: 400, color: "#e8d5a3", letterSpacing: "0.12em", margin: 0, textAlign: "center" }}>
            {current.label}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ ...enter(0.32), marginBottom: "1.6rem" }}>
          <div style={{ width: 36, height: 1, background: "linear-gradient(90deg,transparent,#d4af70,transparent)" }} />
        </div>

        {/* Instruction */}
        <div style={{ ...enter(0.38), marginBottom: "2.6rem" }}>
          <p style={{ fontStyle: "italic", fontSize: "clamp(0.9rem, 3.5vw, 1rem)", color: "rgba(232,213,163,0.58)", lineHeight: 1.8, textAlign: "center", margin: 0, letterSpacing: "0.03em" }}>
            {current.instruction}
          </p>
        </div>

        {/* Progress bar */}
        {current.duration && (
          <div style={{ ...enter(0.42), width: "100%", marginBottom: "2.2rem" }}>
            <div style={{ width: "100%", height: 1, background: "rgba(212,175,112,0.1)", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 1, background: "linear-gradient(90deg,#b8964f,#e8d5a3)", width: `${progress}%`, transition: "width 0.05s linear", boxShadow: "0 0 8px rgba(212,175,112,0.6)" }} />
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ ...enter(0.48), width: "100%" }}>
          {isLast ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <GoldBtn onClick={() => { setStep(0); }}>Begin Again</GoldBtn>
              <OutlineBtn onClick={() => window.open(WHATSAPP_URL, "_blank")}>Join Early Access</OutlineBtn>
            </div>
          ) : (
            <GoldBtn onClick={() => setStep(s => s + 1)}>
              {step === 0 ? "Begin" : "Continue →"}
            </GoldBtn>
          )}
        </div>

        <div style={{ ...enter(0.62) }}>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: "rgba(232,213,163,0.13)", marginTop: "3.2rem", textTransform: "uppercase" }}>◈ Est. 2025 ◈</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [vis, setVis]       = useState(false);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  const enter = (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  if (screen === "spiral-minute") return <SpiralMinute onBack={() => setScreen("home")} />;

  return (
    <div style={{ minHeight: "100dvh", background: "#080809", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 1.75rem", fontFamily: "Georgia, 'Times New Roman', serif", position: "relative", overflow: "hidden" }}>
      <BG />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Eyebrow */}
        <div style={enter(0.05)}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.38em", color: "rgba(212,175,112,0.38)", textTransform: "uppercase", margin: "0 0 2rem", textAlign: "center" }}>
            ◈ Wealth Intelligence ◈
          </p>
        </div>

        {/* Spiral */}
        <div style={enter(0.1)}>
          <SpiralSVG animate={vis} />
        </div>

        {/* Title */}
        <div style={{ ...enter(0.45), marginTop: "1rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2.8rem, 10vw, 4rem)", fontWeight: 400, color: "#e8d5a3", margin: 0, lineHeight: 1.05, letterSpacing: "0.1em", textShadow: "0 0 60px rgba(212,175,112,0.22)" }}>
            SPIRAL
          </h1>
          <h1 style={{ fontSize: "clamp(2.2rem, 8.5vw, 3.4rem)", fontWeight: 400, color: "#d4af70", fontStyle: "italic", margin: 0, lineHeight: 1.05, letterSpacing: "0.2em", textShadow: "0 0 40px rgba(212,175,112,0.28)" }}>
            Wealth
          </h1>
        </div>

        {/* Divider */}
        <div style={{ ...enter(0.6), margin: "1.6rem 0 1.4rem" }}>
          <div style={{ width: 48, height: 1, background: "linear-gradient(90deg,transparent,#d4af70,transparent)" }} />
        </div>

        {/* Subtitle */}
        <div style={{ ...enter(0.72), marginBottom: "0.8rem" }}>
          <p style={{ fontStyle: "italic", fontSize: "clamp(0.78rem, 3vw, 0.9rem)", color: "rgba(232,213,163,0.48)", letterSpacing: "0.26em", textTransform: "uppercase", textAlign: "center", margin: 0, lineHeight: 1.8 }}>
            Build Wealth From Within
          </p>
        </div>

        {/* Social proof nudge */}
        <div style={{ ...enter(0.8), marginBottom: "2.8rem" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(212,175,112,0.3)", textAlign: "center", margin: 0, fontStyle: "italic" }}>
            Founding members closing soon
          </p>
        </div>

        {/* Buttons */}
        <div style={{ ...enter(0.92), width: "100%", display: "flex", flexDirection: "column", gap: "0.95rem" }}>
          <GoldBtn onClick={() => window.open("https://wa.me/553199409045?text=Quero%20entrar%20no%20Spiral%20Wealth", "_blank")}>
            Join Early Access
          </GoldBtn>
          <OutlineBtn onClick={() => setScreen("spiral-minute")}>
            Begin Spiral Minute
          </OutlineBtn>
        </div>

        {/* Trust line */}
        <div style={{ ...enter(1.08), marginTop: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "rgba(212,175,112,0.22)", margin: 0, textTransform: "uppercase" }}>
            Free · No signup · 60 seconds
          </p>
        </div>

        <div style={{ ...enter(1.18) }}>
          <p style={{ fontSize: "0.52rem", letterSpacing: "0.35em", color: "rgba(232,213,163,0.12)", marginTop: "2.4rem", textTransform: "uppercase" }}>
            ◈ Est. 2025 ◈
          </p>
        </div>

      </div>
    </div>
  );
}