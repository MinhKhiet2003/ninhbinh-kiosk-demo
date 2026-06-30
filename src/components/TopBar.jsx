import { ArrowLeft, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../data/sites";

export default function TopBar({ title, onBack }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="topbar">
      <button className="topbar-back" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>{t.backHome}</span>
      </button>
      {title && <h2 className="topbar-title">{title}</h2>}
      <div className="lang-switch compact" role="group" aria-label={t.selectLanguage}>
        <Languages size={14} className="lang-icon" />
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
    </div>
  );
}
