import { Navigation2, MapPin } from "lucide-react";
import TopBar from "./TopBar";
import { useLanguage } from "../context/LanguageContext";
import { SITES } from "../data/sites";

// Toạ độ thực tế được map vào hệ toạ độ SVG 0-600 x 0-400 (minh họa, không chính xác địa lý tuyệt đối)
const MAP_POSITIONS = {
  "trang-an": { x: 320, y: 150 },
  "tam-coc": { x: 250, y: 230 },
  "co-do-hoa-lu": { x: 380, y: 90 },
  "chua-bai-dinh": { x: 150, y: 110 },
};

export default function MapScreen({ activeSite, onBack, onSelectSite }) {
  const { lang, t } = useLanguage();

  return (
    <div className="screen map-screen">
      <TopBar title={t.map} onBack={onBack} />

      <div className="map-canvas">
        <svg viewBox="0 0 600 400" className="map-svg">
          <defs>
            <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EDE6CC" />
              <stop offset="100%" stopColor="#D7CFA9" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#mapBg)" rx="18" />
          <path d="M0,260 Q150,230 300,265 T600,250" stroke="#9CB59F" strokeWidth="14" fill="none" opacity="0.5" />
          <path d="M40,40 Q120,80 90,140 Q60,190 130,200" stroke="#B6A371" strokeWidth="3" fill="none" opacity="0.4" />

          {SITES.map((site) => {
            const pos = MAP_POSITIONS[site.id];
            const isActive = activeSite?.id === site.id;
            return (
              <g
                key={site.id}
                transform={`translate(${pos.x},${pos.y})`}
                className="map-pin-group"
                onClick={() => onSelectSite(site)}
                style={{ cursor: "pointer" }}
              >
                {isActive && <circle r="22" fill="#B8862F" opacity="0.25" />}
                <circle r="9" fill={isActive ? "#B8862F" : "#3B5D45"} stroke="#fff" strokeWidth="2.5" />
                <text x="0" y="-16" textAnchor="middle" fontSize="13" fontWeight="600" fill="#2A2620">
                  {site.name[lang].split(" ").slice(0, 2).join(" ")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {activeSite && (
        <div className="map-detail-card">
          <MapPin size={18} />
          <div>
            <strong>{activeSite.name[lang]}</strong>
            <p>{t.coordinates}: {activeSite.coordinates.lat.toFixed(4)}, {activeSite.coordinates.lng.toFixed(4)}</p>
          </div>
          <button className="map-nav-btn">
            <Navigation2 size={16} />
          </button>
        </div>
      )}

      <ul className="map-legend">
        {SITES.map((s) => (
          <li key={s.id} onClick={() => onSelectSite(s)} className={activeSite?.id === s.id ? "active" : ""}>
            <span className="dot" /> {s.name[lang]}
          </li>
        ))}
      </ul>
    </div>
  );
}
