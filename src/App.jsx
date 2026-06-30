import { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import IdleScreen from "./components/IdleScreen";
import ExploreScreen from "./components/ExploreScreen";
import SiteDetailScreen from "./components/SiteDetailScreen";
import EventsScreen from "./components/EventsScreen";
import MapScreen from "./components/MapScreen";
import BottomNav from "./components/BottomNav";
import "./kiosk.css";

const IDLE_TIMEOUT_MS = 45000; // tự quay về màn hình chờ sau 45s không thao tác

function AppShell() {
  const [view, setView] = useState("idle"); // idle | explore | detail | events | map
  const [activeSite, setActiveSite] = useState(null);
  const [entryMode, setEntryMode] = useState(null); // 'nfc' | 'qr' | 'browse'
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Idle timeout: quay lại màn hình chờ nếu không thao tác
  useEffect(() => {
    if (view === "idle") return;
    const check = setInterval(() => {
      if (Date.now() - lastInteraction > IDLE_TIMEOUT_MS) {
        goIdle();
      }
    }, 2000);
    return () => clearInterval(check);
  }, [view, lastInteraction]);

  function touch() {
    setLastInteraction(Date.now());
  }

  function goIdle() {
    setView("idle");
    setActiveSite(null);
    setEntryMode(null);
  }

  function handleActivate(site, mode) {
    touch();
    setEntryMode(mode);
    if (mode === "browse") {
      setView("explore");
    } else {
      setActiveSite(site);
      setView("detail");
    }
  }

  function handleSelectSite(site) {
    touch();
    setActiveSite(site);
    setEntryMode("browse");
    setView("detail");
  }

  function handleShowMap(site) {
    touch();
    setActiveSite(site);
    setView("map");
  }

  function handleNavigate(target) {
    touch();
    setView(target);
  }

  return (
    <div className="kiosk-frame" onClick={touch}>
      {view === "idle" && <IdleScreen onActivate={handleActivate} />}

      {view === "explore" && (
        <>
          <ExploreScreen onBack={goIdle} onSelectSite={handleSelectSite} />
          <BottomNav activeView="explore" onNavigate={handleNavigate} />
        </>
      )}

      {view === "detail" && (
        <>
          <SiteDetailScreen
            site={activeSite}
            entryMode={entryMode}
            onBack={() => setView("explore")}
            onShowMap={handleShowMap}
          />
          <BottomNav activeView="explore" onNavigate={handleNavigate} />
        </>
      )}

      {view === "events" && (
        <>
          <EventsScreen onBack={goIdle} />
          <BottomNav activeView="events" onNavigate={handleNavigate} />
        </>
      )}

      {view === "map" && (
        <>
          <MapScreen activeSite={activeSite} onBack={goIdle} onSelectSite={setActiveSite} />
          <BottomNav activeView="map" onNavigate={handleNavigate} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}
