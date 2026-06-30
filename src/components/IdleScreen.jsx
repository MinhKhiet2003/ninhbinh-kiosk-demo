import { useState } from "react";
import { ScanLine, Smartphone, Languages, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES, SITES } from "../data/sites";

export default function IdleScreen({ onActivate }) {
  const { lang, setLang, t } = useLanguage();
  const [pulsing, setPulsing] = useState(null); // 'nfc' | 'qr'

  function handleSimulate(mode) {
    setPulsing(mode);
    const randomSite = SITES[Math.floor(Math.random() * SITES.length)];
    setTimeout(() => {
      onActivate(randomSite, mode);
    }, 900);
  }

  return (
    <div className="idle-screen">
      <div className="idle-bg" aria-hidden="true">
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="idleSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16241c" />
              <stop offset="100%" stopColor="#0c1410" />
            </linearGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#idleSky)" />
          <path d="M0,520 L100,420 L200,500 L320,380 L420,480 L540,400 L660,490 L780,410 L900,500 L1020,420 L1140,500 L1200,460 L1200,800 L0,800 Z" fill="#1c3026" opacity="0.7" />
          <path d="M0,600 L120,500 L240,580 L360,470 L480,570 L600,480 L720,580 L840,490 L960,580 L1080,500 L1200,580 L1200,800 L0,800 Z" fill="#28402f" opacity="0.85" />
        </svg>
      </div>

      <header className="idle-top">
        <div className="brand">
          <span className="brand-mark">寧</span>
          <div className="brand-text">
            <strong>NINH BÌNH</strong>
            <span>Kiosk Văn hóa số</span>
          </div>
        </div>
        <div className="lang-switch" role="group" aria-label={t.selectLanguage}>
          <Languages size={16} className="lang-icon" />
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-pill ${lang === l.code ? "active" : ""}`}
              onClick={() => setLang(l.code)}
            >
              {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="idle-main">
        <p className="idle-eyebrow">{t.subtitle}</p>
        <h1 className="idle-title">{t.welcome}</h1>

        <div className="idle-actions">
          <button
            className={`action-disc qr ${pulsing === "qr" ? "pulsing" : ""}`}
            onClick={() => handleSimulate("qr")}
          >
            <span className="disc-ring" />
            <ScanLine size={40} strokeWidth={1.5} />
            <span className="disc-label">{t.scanQr}</span>
          </button>

          <div className="idle-divider">
            <span />
          </div>

          <button
            className={`action-disc nfc ${pulsing === "nfc" ? "pulsing" : ""}`}
            onClick={() => handleSimulate("nfc")}
          >
            <span className="disc-ring" />
            <Smartphone size={40} strokeWidth={1.5} />
            <span className="disc-label">{t.tapNfc}</span>
          </button>
        </div>

        <button className="idle-explore-link" onClick={() => onActivate(null, "browse")}>
          {t.explore}
          <ChevronRight size={18} />
        </button>
      </main>

      <footer className="idle-footer">
        <p>{t.idleHint}</p>
      </footer>
    </div>
  );
}
