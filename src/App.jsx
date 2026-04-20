import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/553199409045?text=Quero%20entrar%20no%20Spiral%20Wealth%20Founding%20Circle";

const GoldBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      padding: "16px",
      background:
        "linear-gradient(135deg,#b8964f 0%,#e8d5a3 50%,#b8964f 100%)",
      border: "none",
      color: "#080809",
      fontWeight: "700",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      cursor: "pointer",
      borderRadius: "2px",
      fontSize: "0.75rem",
    }}
  >
    {children}
  </button>
);

const OutlineBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      padding: "16px",
      background: "transparent",
      border: "1px solid rgba(212,175,112,0.4)",
      color: "#d4af70",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      cursor: "pointer",
      borderRadius: "2px",
      fontSize: "0.75rem",
    }}
  >
    {children}
  </button>
);

function Home({ goSpiral }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080809",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px", textAlign: "center" }}>
        <p
          style={{
            color: "#d4af70",
            letterSpacing: "0.35em",
            fontSize: "0.58rem",
            marginBottom: "22px",
          }}
        >
          ◈ Wealth Intelligence ◈
        </p>

        <div
          style={{
            fontSize: "80px",
            color: "#d4af70",
            marginBottom: "10px",
          }}
        >
          ◎
        </div>

        <h1
          style={{
            margin: 0,
            color: "#e8d5a3",
            fontSize: "3rem",
            letterSpacing: "0.08em",
          }}
        >
          SPIRAL
        </h1>

        <h1
          style={{
            marginTop: 0,
            color: "#d4af70",
            fontSize: "2.5rem",
            fontStyle: "italic",
            letterSpacing: "0.16em",
          }}
        >
          Wealth
        </h1>

        <p
          style={{
            color: "rgba(232,213,163,0.78)",
            lineHeight: 1.7,
            marginBottom: "12px",
            letterSpacing: "0.05em",
            fontSize: "1rem",
          }}
        >
          Become a Founding Member
        </p>

        <p
          style={{
            color: "rgba(212,175,112,0.58)",
            fontSize: "0.82rem",
            marginBottom: "12px",
            lineHeight: 1.7,
          }}
        >
          Secure lifetime founder status before public launch.
        </p>

        <p
          style={{
            color: "#e8d5a3",
            fontSize: "0.82rem",
            marginBottom: "26px",
          }}
        >
          Only first 25 founder spots available.
        </p>

        <div style={{ display: "grid", gap: "12px" }}>
          <GoldBtn onClick={() => window.open(WHATSAPP_URL, "_blank")}>
            Join Founding Circle – R$97
          </GoldBtn>

          <OutlineBtn onClick={goSpiral}>
            Begin 60-Second Reset
          </OutlineBtn>
        </div>

        <p
          style={{
            marginTop: "24px",
            color: "rgba(212,175,112,0.35)",
            fontSize: "0.72rem",
          }}
        >
          Private Access · Founder Benefits · Limited Spots
        </p>
      </div>
    </div>
  );
}

function SpiralMinute({ goHome }) {
  const steps = [
    "Take three deep breaths.",
    "What financial truth are you avoiding?",
    "What pattern keeps repeating?",
    "What would calm wealth look like?",
    "Choose one small action today.",
  ];

  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      window.open(WHATSAPP_URL, "_blank");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080809",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px", textAlign: "center" }}>
        <button
          onClick={goHome}
          style={{
            background: "none",
            border: "none",
            color: "#d4af70",
            cursor: "pointer",
            marginBottom: "28px",
          }}
        >
          ← Spiral Wealth
        </button>

        <div
          style={{
            fontSize: "56px",
            color: "#d4af70",
            marginBottom: "12px",
          }}
        >
          ◎
        </div>

        <h2
          style={{
            color: "#e8d5a3",
            letterSpacing: "0.08em",
          }}
        >
          Spiral Reset
        </h2>

        <p
          style={{
            color: "rgba(232,213,163,0.72)",
            lineHeight: 1.8,
            minHeight: "90px",
            marginBottom: "24px",
          }}
        >
          {steps[step]}
        </p>

        <GoldBtn onClick={next}>
          {step === steps.length - 1
            ? "Join Founding Circle – R$97"
            : "Continue"}
        </GoldBtn>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");

  return screen === "home" ? (
    <Home goSpiral={() => setScreen("spiral")} />
  ) : (
    <SpiralMinute goHome={() => setScreen("home")} />
  );
}