import { useState, useEffect, useRef } from "react";
import { Play, Pause, Star, Clock, MapPin, Volume2, Sparkles, Navigation } from "lucide-react";
import TopBar from "./TopBar";
import SiteIllustration from "./SiteIllustration";
import { useLanguage } from "../context/LanguageContext";

export default function SiteDetailScreen({ site, entryMode, onBack, onShowMap }) {
  const { lang, t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [site?.id, lang]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            setPlaying(false);
            return 0;
          }
          return p + 100 / 40; // ~4s mock playback across 40 ticks
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  if (!site) return null;

  return (
    <div className="screen detail-screen">
      <TopBar onBack={onBack} />

      {entryMode && entryMode !== "browse" && (
        <div className="entry-toast">
          <Sparkles size={14} />
          {entryMode === "nfc" ? "NFC tag detected" : "QR code scanned"} · {entryMode === "nfc" ? site.nfcId : site.qrCode}
        </div>
      )}

      <div className="detail-hero">
        <SiteIllustration siteImage={site.image} className="detail-hero-svg" />
        <div className="detail-hero-overlay">
          <span className="detail-category">{site.category}</span>
          <h1>{site.name[lang]}</h1>
          <div className="detail-meta-row">
            <span><Star size={15} /> {site.rating}</span>
            <span><Clock size={15} /> {site.visitTime}</span>
            <span><MapPin size={15} /> {site.region}</span>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <section className="audio-panel">
          <div className="audio-panel-left">
            <button className={`audio-play-btn ${playing ? "playing" : ""}`} onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <div>
              <p className="audio-title">
                <Volume2 size={15} /> {playing ? t.listening : t.playAudio}
              </p>
              <p className="audio-sub">{site.audioDuration} · {lang === "vi" ? "Giọng AI" : "AI Voice"}</p>
            </div>
          </div>
          <div className="audio-progress">
            <div className="audio-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="detail-section">
          <h2>{t.history}</h2>
          <p>{site.history[lang]}</p>
        </section>

        <section className="detail-section">
          <h2>{t.highlights}</h2>
          <ul className="highlight-list">
            {site.highlights.map((h, i) => (
              <li key={i}>{h[lang]}</li>
            ))}
          </ul>
        </section>

        <button className="map-cta" onClick={() => onShowMap(site)}>
          <Navigation size={18} />
          {t.map}
        </button>
      </div>
    </div>
  );
}
