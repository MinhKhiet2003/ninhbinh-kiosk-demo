import { Compass, CalendarDays, Map } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomNav({ activeView, onNavigate }) {
  const { t } = useLanguage();
  const items = [
    { key: "explore", icon: Compass, label: t.explore },
    { key: "events", icon: CalendarDays, label: t.events },
    { key: "map", icon: Map, label: t.map },
  ];
  return (
    <nav className="bottom-nav">
      {items.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          className={`bottom-nav-item ${activeView === key ? "active" : ""}`}
          onClick={() => onNavigate(key)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
