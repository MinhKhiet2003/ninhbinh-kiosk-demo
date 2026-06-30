import { useState, useMemo } from "react";
import { Search, Star, Clock, MapPin } from "lucide-react";
import TopBar from "./TopBar";
import SiteIllustration from "./SiteIllustration";
import { useLanguage } from "../context/LanguageContext";
import { SITES } from "../data/sites";

export default function ExploreScreen({ onBack, onSelectSite }) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return SITES;
    const q = query.toLowerCase();
    return SITES.filter((s) => s.name[lang].toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }, [query, lang]);

  return (
    <div className="screen explore-screen">
      <TopBar title={t.allSites} onBack={onBack} />

      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="site-grid">
        {filtered.map((site) => (
          <button key={site.id} className="site-card" onClick={() => onSelectSite(site)}>
            <div className="site-card-img">
              <SiteIllustration siteImage={site.image} className="site-svg" />
              <span className="site-card-tag">{site.category}</span>
            </div>
            <div className="site-card-body">
              <h3>{site.name[lang]}</h3>
              <p className="site-card-summary">{site.summary[lang]}</p>
              <div className="site-card-meta">
                <span><Star size={14} /> {site.rating}</span>
                <span><Clock size={14} /> {site.visitTime}</span>
                <span><MapPin size={14} /> {site.region}</span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="empty-state">—</p>
        )}
      </div>
    </div>
  );
}
