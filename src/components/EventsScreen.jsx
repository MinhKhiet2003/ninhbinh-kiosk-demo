import { Calendar, MapPin, Tag } from "lucide-react";
import TopBar from "./TopBar";
import { useLanguage } from "../context/LanguageContext";
import { EVENTS } from "../data/sites";

export default function EventsScreen({ onBack }) {
  const { lang, t } = useLanguage();

  return (
    <div className="screen events-screen">
      <TopBar title={t.events} onBack={onBack} />

      <div className="events-list">
        {EVENTS.map((ev) => (
          <div key={ev.id} className="event-card">
            <div className="event-date-block">
              <Calendar size={16} />
              <span>{ev.date}</span>
            </div>
            <div className="event-body">
              <span className="event-tag"><Tag size={12} /> {ev.tag}</span>
              <h3>{ev.title[lang]}</h3>
              <p className="event-location"><MapPin size={13} /> {ev.location[lang]}</p>
              <p className="event-desc">{ev.description[lang]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
