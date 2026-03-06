import { useState, useEffect, useRef, useMemo } from "react";

const C = {
  bg: "#F2F2F7",
  card: "#FFFFFF",
  text: "#1C1C1E",
  text2: "#8E8E93",
  text3: "#AEAEB2",
  accent: "#007AFF",
  accentLight: "#E8F2FF",
  green: "#34C759",
  greenLight: "#E8FAF0",
  orange: "#FF9500",
  orangeLight: "#FFF4E5",
  red: "#FF3B30",
  redLight: "#FFEBEA",
  pink: "#FF2D55",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  separator: "#E5E5EA",
  navBg: "rgba(249,249,249,0.94)",
  navBorder: "#D1D1D6",
};

const TODO_CATS = [
  { id: "courses", label: "Courses", icon: "🛒", color: C.orange },
  { id: "maison", label: "Maison", icon: "🏠", color: C.purple },
  { id: "perso", label: "Perso", icon: "👤", color: C.accent },
  { id: "travail", label: "Travail", icon: "💼", color: C.green },
  { id: "urgent", label: "Urgent", icon: "🔥", color: C.red },
];

const BUDGET_CATS = {
  income: [
    { id: "salaire", label: "Salaire", icon: "💰", color: C.green },
    { id: "freelance", label: "Freelance", icon: "💻", color: C.accent },
    { id: "investissement", label: "Investissement", icon: "📈", color: C.purple },
    { id: "autre_rev", label: "Autre", icon: "💵", color: C.text2 },
  ],
  expense: [
    { id: "logement", label: "Logement", icon: "🏠", color: C.orange },
    { id: "courses_b", label: "Courses", icon: "🛒", color: C.red },
    { id: "transport", label: "Transport", icon: "🚗", color: C.accent },
    { id: "loisirs", label: "Loisirs", icon: "🎬", color: C.pink },
    { id: "sante", label: "Santé", icon: "🏥", color: C.green },
    { id: "renovation", label: "Rénovation", icon: "🔨", color: C.purple },
    { id: "abonnements", label: "Abonnements", icon: "📱", color: C.text2 },
    { id: "autre_dep", label: "Autre", icon: "📦", color: C.text3 },
  ],
};

const PORTFOLIOS = [
  { id: "curvo", name: "Curvo", icon: "🌱", color: C.green, type: "DCA mensuel" },
  { id: "trade_republic", name: "Trade Republic", icon: "📊", color: C.accent, type: "ETFs" },
  { id: "retraite", name: "Assurance Retraite", icon: "🏦", color: C.purple, type: "Épargne pension" },
];

const EVENT_CATS = [
  { id: "perso", label: "Perso", icon: "🎉", color: C.accent },
  { id: "pro", label: "Travail", icon: "💼", color: C.green },
  { id: "anniversaire", label: "Anniversaire", icon: "🎂", color: C.pink },
  { id: "finance", label: "Finance", icon: "💶", color: C.orange },
  { id: "renovation", label: "Rénovation", icon: "🔨", color: C.purple },
];

const NAV_ITEMS = [
  { id: "todos", label: "Tâches", icon: "CheckCircle" },
  { id: "budget", label: "Budget", icon: "TrendingUp" },
  { id: "calendar", label: "Calendrier", icon: "Calendar" },
  { id: "notes", label: "Notes", icon: "BookOpen" },
];

const Icons = {
  CheckCircle: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2.5 2.5L16 9" />
    </svg>
  ),
  TrendingUp: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Calendar: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  BookOpen: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Plus: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Trash: ({ size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  ArrowUp: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  ArrowDown: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  Clock: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ChevLeft: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevRight: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  ),
  Lock: ({ size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

const uid = () => Math.random().toString(36).slice(2, 10);
const fmt = (n) => new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR" }).format(n);
const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
const MN = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const MN_S = ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const DN = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const today = new Date();
const toKey = (d) => d.toISOString().slice(0, 10);
const sameDay = (a, b) => toKey(a) === toKey(b);

const APP_STORAGE_KEY = "monapp_secure_v1";
const LEGACY_KEYS = [
  "monapp_activeTab",
  "monapp_todos",
  "monapp_transactions",
  "monapp_monthlyBudget",
  "monapp_investments",
  "monapp_events",
];

const EMPTY_INVESTMENTS = [
  { id: "curvo", invested: 0, currentValue: 0, monthlyDCA: 0, holdings: [], history: [] },
  { id: "trade_republic", invested: 0, currentValue: 0, monthlyDCA: 0, holdings: [], history: [] },
  { id: "retraite", invested: 0, currentValue: 0, monthlyDCA: 0, holdings: [], history: [] },
];

const EMPTY_STATE = {
  activeTab: "todos",
  todos: [],
  transactions: [],
  monthlyBudget: 2000,
  investments: EMPTY_INVESTMENTS,
  events: [],
};

const SAMPLE_TODOS = [];
const SAMPLE_TX = [];
const SAMPLE_INVESTMENTS = EMPTY_INVESTMENTS;
const SAMPLE_EVENTS = [];

function clearLegacyStorage() {
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
}

function clearSecureStorage() {
  localStorage.removeItem(APP_STORAGE_KEY);
}

function uint8ToBase64(bytes) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToUint8(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptState(data, passphrase) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const plain = enc.encode(JSON.stringify(data));
  const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain);
  const cipherBytes = new Uint8Array(cipherBuffer);

  return {
    v: 1,
    salt: uint8ToBase64(salt),
    iv: uint8ToBase64(iv),
    data: uint8ToBase64(cipherBytes),
  };
}

async function decryptState(payload, passphrase) {
  const dec = new TextDecoder();
  const salt = base64ToUint8(payload.salt);
  const iv = base64ToUint8(payload.iv);
  const data = base64ToUint8(payload.data);
  const key = await deriveKey(passphrase, salt);
  const plainBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return JSON.parse(dec.decode(plainBuffer));
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function ProgressBar({ value, max, label, color }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
      <div style={{ flex: 1, height: 4, background: C.separator, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: 13, color: C.text2, fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

function DonutChart({ segments, size = 120, thickness = 18 }) {
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let off = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((s, i) => {
        const d = (s.pct / 100) * circ;
        const o = -off;
        off += d;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={thickness}
            strokeDasharray={`${d} ${circ - d}`}
            strokeDashoffset={o}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
    </svg>
  );
}

function Sparkline({ data, color, width = 48, height = 24 }) {
  const usable = data.filter((d) => typeof d.value === "number");
  if (usable.length < 2) return null;

  const vals = usable.map((d) => d.value);
  const mn = Math.min(...vals);
  const mx = Math.max(...vals);
  const rng = mx - mn || 1;
  const pts = vals
    .map((v, i) => `${(i / (vals.length - 1)) * width},${height - ((v - mn) / rng) * (height - 4) - 2}`)
    .join(" ");

  return (
    <svg width={width} height={height}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Pill({ label, active, onClick, color, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 20,
        border: "none",
        background: active ? color : C.card,
        color: active ? "white" : C.text,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: 6,
        boxShadow: active ? "none" : "0 0.5px 1px rgba(0,0,0,0.06)",
      }}
    >
      {label}
      {count !== undefined && <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.7 }}>{count}</span>}
    </button>
  );
}

function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "calc(100px + env(safe-area-inset-bottom))",
        right: "max(20px, calc(50% - 195px))",
        width: 56,
        height: 56,
        borderRadius: 28,
        background: C.accent,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,122,255,0.35), 0 1px 3px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Icons.Plus size={28} color="white" />
    </button>
  );
}

function Card({ children, style: s }) {
  return <div style={{ background: C.card, borderRadius: 12, overflow: "hidden", boxShadow: "0 0.5px 0 rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04)", ...s }}>{children}</div>;
}
function Empty({ text }) {
  return <div style={{ padding: "32px 20px", textAlign: "center", color: C.text3, fontSize: 14 }}>{text}</div>;
}
function CatIcon({ icon, color }) {
  return <div style={{ width: 36, height: 36, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>;
}
function SumCard({ label, amount, color, icon }) {
  return (
    <div style={{ flex: 1, background: C.card, borderRadius: 12, padding: "14px 12px", boxShadow: "0 0.5px 0 rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
        {icon}
        <span style={{ fontSize: 11, fontWeight: 600, color: C.text2, textTransform: "uppercase", letterSpacing: 0.3 }}>{label}</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color, letterSpacing: -0.3 }}>{fmt(Math.abs(amount))}</div>
    </div>
  );
}
function MiniStat({ label, value, color }) {
  return (
    <div style={{ flex: 1, background: C.bg, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
      <div style={{ fontSize: 11, color: C.text3, fontWeight: 500, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: color || C.text }}>{value}</div>
    </div>
  );
}
function Backdrop({ onClick }) {
  return <div onClick={onClick} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 200, animation: "fadeIn 0.2s ease" }} />;
}
function ModalSheet({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: C.card,
        borderRadius: "16px 16px 0 0",
        padding: "20px 20px calc(40px + env(safe-area-inset-bottom))",
        zIndex: 201,
        animation: "slideUp 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
    >
      <div style={{ width: 36, height: 5, borderRadius: 3, background: C.separator, margin: "0 auto 20px" }} />
      {children}
    </div>
  );
}
function SubmitBtn({ disabled, onClick, text, color = C.accent }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: 15,
        marginTop: 16,
        borderRadius: 14,
        border: "none",
        background: disabled ? C.separator : color,
        color: disabled ? C.text3 : "white",
        fontSize: 16,
        fontWeight: 600,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "inherit",
      }}
    >
      {text}
    </button>
  );
}
function AnimStyles() {
  return <style>{"@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translate(-50%,100%)}to{transform:translate(-50%,0)}}"}</style>;
}
function SegToggle({ options, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 0, margin: "14px 20px 12px", background: C.separator, borderRadius: 10, padding: 2 }}>
      {options.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            padding: "9px 0",
            borderRadius: 8,
            border: "none",
            background: active === t.id ? C.card : "transparent",
            color: active === t.id ? C.text : C.text2,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: active === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s ease",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 16,
  border: "1px solid " + C.separator,
  borderRadius: 12,
  outline: "none",
  background: C.bg,
  color: C.text,
  boxSizing: "border-box",
  fontFamily: "inherit",
};
const focusBorder = (e) => (e.target.style.borderColor = C.accent);
const blurBorder = (e) => (e.target.style.borderColor = C.separator);

// ============================================================
// APP
// ============================================================
export default function App() {
  const [bootReady, setBootReady] = useState(false);
  const [authMode, setAuthMode] = useState("create");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sessionPassphrase, setSessionPassphrase] = useState("");
  const [authError, setAuthError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const [appState, setAppState] = useState(EMPTY_STATE);

  useEffect(() => {
    const existing = localStorage.getItem(APP_STORAGE_KEY);
    setAuthMode(existing ? "unlock" : "create");
    setBootReady(true);
  }, []);

  useEffect(() => {
    if (!isUnlocked || !sessionPassphrase) return;

    let cancelled = false;

    (async () => {
      try {
        const encrypted = await encryptState(appState, sessionPassphrase);
        if (!cancelled) {
          localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(encrypted));
        }
      } catch (error) {
        console.error("Erreur de sauvegarde chiffrée :", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [appState, isUnlocked, sessionPassphrase]);

  const updateField = (field, next) => {
    setAppState((prev) => ({
      ...prev,
      [field]: typeof next === "function" ? next(prev[field]) : next,
    }));
  };

  const handleCreatePassphrase = async (passphrase, confirmPassphrase) => {
    setAuthError("");

    if (passphrase.length < 8) {
      setAuthError("Choisis un mot de passe d’au moins 8 caractères.");
      return;
    }
    if (passphrase !== confirmPassphrase) {
      setAuthError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    try {
      setIsBusy(true);
      clearLegacyStorage();
      const cleanState = { ...EMPTY_STATE };
      const encrypted = await encryptState(cleanState, passphrase);
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(encrypted));
      setAppState(cleanState);
      setSessionPassphrase(passphrase);
      setIsUnlocked(true);
    } catch (error) {
      console.error(error);
      setAuthError("Impossible d’initialiser le coffre local.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleUnlock = async (passphrase) => {
    setAuthError("");
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) {
      setAuthMode("create");
      setAuthError("Aucune donnée chiffrée trouvée. Crée un mot de passe.");
      return;
    }

    try {
      setIsBusy(true);
      const payload = JSON.parse(raw);
      const decrypted = await decryptState(payload, passphrase);
      setAppState({
        ...EMPTY_STATE,
        ...decrypted,
        investments: Array.isArray(decrypted.investments) && decrypted.investments.length > 0 ? decrypted.investments : EMPTY_INVESTMENTS,
      });
      clearLegacyStorage();
      setSessionPassphrase(passphrase);
      setIsUnlocked(true);
    } catch (error) {
      console.error(error);
      setAuthError("Mot de passe incorrect ou données illisibles.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setSessionPassphrase("");
    setAuthError("");
    setAuthMode(localStorage.getItem(APP_STORAGE_KEY) ? "unlock" : "create");
  };

  const handleResetAll = async () => {
    const ok = window.confirm("Effacer toutes les données locales chiffrées sur cet appareil ?");
    if (!ok) return;
    clearSecureStorage();
    clearLegacyStorage();
    setSessionPassphrase("");
    setIsUnlocked(false);
    setAppState(EMPTY_STATE);
    setAuthMode("create");
    setAuthError("");
  };

  if (!bootReady) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
        <div style={{ color: C.text2, fontSize: 15 }}>Chargement…</div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <>
        <UnlockScreen
          mode={authMode}
          error={authError}
          isBusy={isBusy}
          onCreate={handleCreatePassphrase}
          onUnlock={handleUnlock}
          hasExistingData={!!localStorage.getItem(APP_STORAGE_KEY)}
        />
        <AnimStyles />
      </>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: 430,
        margin: "0 auto",
        background: C.bg,
        fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
        color: C.text,
        position: "relative",
        paddingTop: "max(16px, env(safe-area-inset-top))",
        paddingBottom: "max(90px, calc(90px + env(safe-area-inset-bottom)))",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div style={{ height: 18 }} />

      <div style={{ position: "fixed", top: "max(14px, env(safe-area-inset-top))", right: "max(14px, calc(50% - 201px))", zIndex: 120, display: "flex", gap: 8 }}>
        <button
          onClick={handleLock}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            border: "none",
            background: C.card,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          aria-label="Verrouiller"
          title="Verrouiller"
        >
          <Icons.Lock size={18} color={C.text2} />
        </button>
      </div>

      {appState.activeTab === "todos" && (
        <TodoModule
          todos={appState.todos}
          setTodos={(next) => updateField("todos", next)}
        />
      )}

      {appState.activeTab === "budget" && (
        <BudgetModule
          transactions={appState.transactions}
          setTransactions={(next) => updateField("transactions", next)}
          monthlyBudget={appState.monthlyBudget}
          setMonthlyBudget={(next) => updateField("monthlyBudget", next)}
          investments={appState.investments}
          setInvestments={(next) => updateField("investments", next)}
        />
      )}

      {appState.activeTab === "calendar" && (
        <CalendarModule
          events={appState.events}
          setEvents={(next) => updateField("events", next)}
        />
      )}

      {appState.activeTab === "notes" && <SecurityModule onResetAll={handleResetAll} />}

      <BottomNav activeTab={appState.activeTab} onTabChange={(tab) => updateField("activeTab", tab)} />
      <AnimStyles />
    </div>
  );
}

function UnlockScreen({ mode, error, isBusy, onCreate, onUnlock, hasExistingData }) {
  const [passphrase, setPassphrase] = useState("");
  const [confirmPassphrase, setConfirmPassphrase] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 120);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
        color: C.text,
        padding: "max(28px, env(safe-area-inset-top)) 20px max(28px, env(safe-area-inset-bottom))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 390 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icons.Lock size={24} color={C.accent} />
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, margin: "0 0 8px" }}>
            {mode === "create" ? "Créer ton coffre local" : "Déverrouiller l’app"}
          </h1>

          <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.5, color: C.text2 }}>
            {mode === "create"
              ? "Tes données seront chiffrées sur cet appareil avec ton mot de passe. Il n’y a pas de récupération possible si tu l’oublies."
              : "Entre ton mot de passe pour déchiffrer les données stockées localement sur cet appareil."}
          </p>

          <input
            ref={ref}
            type="password"
            placeholder="Mot de passe"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            style={inputStyle}
            onFocus={focusBorder}
            onBlur={blurBorder}
          />

          {mode === "create" && (
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassphrase}
              onChange={(e) => setConfirmPassphrase(e.target.value)}
              style={{ ...inputStyle, marginTop: 10 }}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          )}

          {error && (
            <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: C.redLight, color: C.red, fontSize: 13, fontWeight: 600 }}>
              {error}
            </div>
          )}

          {mode === "create" ? (
            <SubmitBtn disabled={isBusy || !passphrase || !confirmPassphrase} onClick={() => onCreate(passphrase, confirmPassphrase)} text={isBusy ? "Création…" : "Créer et ouvrir"} />
          ) : (
            <SubmitBtn disabled={isBusy || !passphrase} onClick={() => onUnlock(passphrase)} text={isBusy ? "Déchiffrement…" : "Déverrouiller"} />
          )}

          {mode === "create" && hasExistingData && (
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: 12, width: "100%", padding: 12, borderRadius: 12, border: "none", background: C.bg, color: C.text2, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Revenir au déverrouillage
            </button>
          )}
        </Card>
      </div>
    </div>
  );
}

function SecurityModule({ onResetAll }) {
  return (
    <div>
      <div style={{ padding: "16px 20px 0" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>Sécurité</h1>
      </div>

      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Stockage local chiffré</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: C.text2 }}>
              Les données restent sur cet appareil, chiffrées dans le navigateur. Elles ne sont pas envoyées à GitHub Pages.
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Limites importantes</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: C.text2 }}>
              Si quelqu’un a accès à ton iPhone déverrouillé et au mot de passe de l’app, il pourra lire les données. Ne stocke pas de secrets ultra sensibles.
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Réinitialisation totale</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: C.text2, marginBottom: 14 }}>
              Cette action efface le coffre local chiffré sur cet appareil.
            </div>
            <button
              onClick={onResetAll}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "none",
                background: C.red,
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Effacer toutes les données locales
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: C.navBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "0.5px solid " + C.navBorder,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        paddingTop: 8,
        paddingBottom: "calc(28px + env(safe-area-inset-bottom))",
        zIndex: 100,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const a = activeTab === item.id;
        const Ic = Icons[item.icon];
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
              padding: "4px 16px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Ic size={24} color={a ? C.accent : C.text3} />
            <span style={{ fontSize: 10, fontWeight: 500, color: a ? C.accent : C.text3 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ============================================================
// TODO MODULE
// ============================================================
function TodoModule({ todos, setTodos }) {
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [swipedId, setSwipedId] = useState(null);

  const filtered = filter === "all" ? todos : todos.filter((t) => t.category === filter);
  const sorted = [...filtered].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  const pItems = filter === "all" ? todos : todos.filter((t) => t.category === filter);
  const dc = pItems.filter((t) => t.done).length;
  const tot = pItems.length;
  const ac = TODO_CATS.find((c) => c.id === filter);
  const pColor = ac ? ac.color : C.green;
  const pLabel = ac ? `${dc}/${tot} ${ac.label.toLowerCase()}` : `${dc}/${tot} terminées`;

  return (
    <div>
      <div style={{ padding: "16px 20px 0" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>Mes tâches</h1>
        <ProgressBar value={dc} max={tot} label={pLabel} color={pColor} />
      </div>

      <div style={{ display: "flex", gap: 8, padding: "16px 20px 8px", overflowX: "auto", scrollbarWidth: "none" }}>
        <Pill label="Tout" active={filter === "all"} onClick={() => setFilter("all")} color={C.accent} count={todos.length} />
        {TODO_CATS.map((cat) => {
          const c = todos.filter((t) => t.category === cat.id).length;
          return c > 0 ? (
            <Pill key={cat.id} label={`${cat.icon} ${cat.label}`} active={filter === cat.id} onClick={() => setFilter(cat.id)} color={cat.color} count={c} />
          ) : null;
        })}
      </div>

      <div style={{ padding: "8px 20px" }}>
        <Card>
          {sorted.length === 0 ? (
            <Empty text={filter === "all" ? "Aucune tâche. Ajoute-en une !" : "Aucune tâche ici."} />
          ) : (
            sorted.map((todo, i) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isLast={i === sorted.length - 1}
                onToggle={() => setTodos((p) => p.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)))}
                onDelete={() => {
                  setTodos((p) => p.filter((t) => t.id !== todo.id));
                  setSwipedId(null);
                }}
                isSwiped={swipedId === todo.id}
                onSwipe={() => setSwipedId(swipedId === todo.id ? null : todo.id)}
              />
            ))
          )}
        </Card>

        {dc > 0 && (
          <button
            onClick={() => setTodos((p) => p.filter((t) => !t.done))}
            style={{ display: "block", margin: "12px auto 0", background: "none", border: "none", color: C.red, fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "8px 16px" }}
          >
            Supprimer les {dc} terminée{dc > 1 ? "s" : ""}
          </button>
        )}
      </div>

      <FAB onClick={() => setShowAdd(true)} />

      {showAdd && (
        <AddTodoModal
          onAdd={(t, c) => {
            setTodos((p) => [{ id: uid(), text: t, category: c, done: false, createdAt: Date.now() }, ...p]);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

function TodoItem({ todo, isLast, onToggle, onDelete, isSwiped, onSwipe }) {
  const cat = TODO_CATS.find((c) => c.id === todo.category);
  const sx = useRef(0);

  return (
    <div
      style={{ position: "relative", overflow: "hidden" }}
      onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const d = sx.current - e.changedTouches[0].clientX;
        if (d > 60) onSwipe();
        if (d < -60 && isSwiped) onSwipe();
      }}
    >
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: C.red, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={onDelete}>
        <Icons.Trash size={20} color="white" />
      </div>

      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          background: C.card,
          borderBottom: isLast ? "none" : "0.5px solid " + C.separator,
          transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: isSwiped ? "translateX(-80px)" : "translateX(0)",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: 24, height: 24, borderRadius: 12, border: todo.done ? "none" : "2px solid " + C.text3, background: todo.done ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {todo.done && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <polyline points="6 12 10.5 16.5 18 8" />
            </svg>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, color: todo.done ? C.text3 : C.text, textDecoration: todo.done ? "line-through" : "none", lineHeight: 1.3 }}>{todo.text}</div>
        </div>

        {cat && <div style={{ width: 8, height: 8, borderRadius: 4, background: cat.color, opacity: todo.done ? 0.3 : 0.8 }} />}
      </div>
    </div>
  );
}

function AddTodoModal({ onAdd, onClose }) {
  const [text, setText] = useState("");
  const [cat, setCat] = useState("courses");
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 100);
  }, []);

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalSheet>
        <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600 }}>Nouvelle tâche</h3>
        <input
          ref={ref}
          type="text"
          placeholder="Qu’est-ce qu’il faut faire ?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) onAdd(text.trim(), cat);
          }}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, marginBottom: 18 }}>
          {TODO_CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                padding: "8px 14px",
                borderRadius: 10,
                border: cat === c.id ? "2px solid " + c.color : "1.5px solid " + C.separator,
                background: cat === c.id ? c.color + "15" : "transparent",
                color: cat === c.id ? c.color : C.text2,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <SubmitBtn disabled={!text.trim()} onClick={() => text.trim() && onAdd(text.trim(), cat)} text="Ajouter" />
      </ModalSheet>
    </>
  );
}

// ============================================================
// BUDGET MODULE
// ============================================================
function BudgetModule({ transactions, setTransactions, monthlyBudget, setMonthlyBudget, investments, setInvestments }) {
  const [subTab, setSubTab] = useState("budget");

  return (
    <div>
      <div style={{ padding: "16px 20px 0" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>Finances</h1>
      </div>
      <SegToggle options={[{ id: "budget", label: "Budget" }, { id: "invest", label: "Investissements" }]} active={subTab} onChange={setSubTab} />
      {subTab === "budget" ? (
        <BudgetSub transactions={transactions} setTransactions={setTransactions} monthlyBudget={monthlyBudget} setMonthlyBudget={setMonthlyBudget} />
      ) : (
        <InvestSub investments={investments} setInvestments={setInvestments} />
      )}
    </div>
  );
}

function BudgetSub({ transactions, setTransactions, monthlyBudget, setMonthlyBudget }) {
  const [showAdd, setShowAdd] = useState(false);
  const [view, setView] = useState("overview");
  const [editB, setEditB] = useState(false);

  const cm = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
  const mTx = transactions.filter((t) => t.date.startsWith(cm));
  const tIn = mTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const tOut = mTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const bal = tIn - tOut;
  const uPct = monthlyBudget > 0 ? (tOut / monthlyBudget) * 100 : 0;
  const bC = uPct > 100 ? C.red : uPct > 80 ? C.orange : C.accent;

  const expCat = useMemo(() => {
    const m = {};
    mTx.filter((t) => t.type === "expense").forEach((t) => {
      m[t.category] = (m[t.category] || 0) + t.amount;
    });

    return Object.entries(m)
      .map(([id, total]) => {
        const cat = BUDGET_CATS.expense.find((c) => c.id === id) || { label: id, icon: "📦", color: C.text3 };
        return { ...cat, total };
      })
      .sort((a, b) => b.total - a.total);
  }, [mTx]);

  return (
    <div>
      <div style={{ padding: "0 20px" }}>
        <ProgressBar value={tOut} max={monthlyBudget} label={Math.round(uPct) + "% utilisé"} color={bC} />
      </div>

      <div style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: C.text2 }}>{MN[today.getMonth()]} {today.getFullYear()}</span>
        <button onClick={() => setEditB(!editB)} style={{ background: C.accentLight, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 13, fontWeight: 600, color: C.accent, cursor: "pointer" }}>
          Objectif : {fmt(monthlyBudget)}
        </button>
      </div>

      {editB && (
        <div style={{ padding: "0 20px 12px" }}>
          <Card>
            <div style={{ padding: 16 }}>
              <label style={{ fontSize: 13, color: C.text2, fontWeight: 500 }}>Budget mensuel (€)</label>
              <input type="number" value={monthlyBudget} onChange={(e) => setMonthlyBudget(Number(e.target.value) || 0)} style={{ ...inputStyle, fontSize: 20, fontWeight: 700, marginTop: 8 }} />
              <button onClick={() => setEditB(false)} style={{ marginTop: 10, padding: "8px 16px", background: C.accent, color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" }}>
                Valider
              </button>
            </div>
          </Card>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, padding: "4px 20px 12px" }}>
        <SumCard label="Revenus" amount={tIn} color={C.green} icon={<Icons.ArrowUp size={14} color={C.green} />} />
        <SumCard label="Dépenses" amount={tOut} color={C.red} icon={<Icons.ArrowDown size={14} color={C.red} />} />
        <SumCard label="Solde" amount={bal} color={bal >= 0 ? C.green : C.red} />
      </div>

      <div style={{ display: "flex", gap: 8, padding: "4px 20px 12px" }}>
        <Pill label="Vue d’ensemble" active={view === "overview"} onClick={() => setView("overview")} color={C.accent} />
        <Pill label="Transactions" active={view === "details"} onClick={() => setView("details")} color={C.accent} />
      </div>

      {view === "overview" ? (
        <div style={{ padding: "0 20px 20px" }}>
          <Card>
            <div style={{ padding: "14px 16px 8px" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>Répartition des dépenses</span>
            </div>
            {expCat.length === 0 ? (
              <Empty text="Aucune dépense" />
            ) : (
              expCat.map((cat, i) => (
                <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderTop: i > 0 ? "0.5px solid " + C.separator : "none" }}>
                  <CatIcon icon={cat.icon} color={cat.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{cat.label}</div>
                    <div style={{ height: 3, background: C.separator, borderRadius: 2, marginTop: 5, overflow: "hidden" }}>
                      <div style={{ width: (tOut > 0 ? (cat.total / tOut) * 100 : 0) + "%", height: "100%", background: cat.color, borderRadius: 2 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{fmt(cat.total)}</div>
                  <div style={{ fontSize: 12, color: C.text3, fontWeight: 500, minWidth: 36, textAlign: "right" }}>
                    {tOut > 0 ? Math.round((cat.total / tOut) * 100) : 0}%
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      ) : (
        <div style={{ padding: "0 20px 20px" }}>
          <Card>
            {mTx.length === 0 ? (
              <Empty text="Aucune transaction." />
            ) : (
              [...mTx]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((tx, i) => {
                  const ac2 = [...BUDGET_CATS.income, ...BUDGET_CATS.expense];
                  const cat = ac2.find((c) => c.id === tx.category) || { icon: "📦", color: C.text3 };
                  const isIn = tx.type === "income";

                  return (
                    <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderTop: i > 0 ? "0.5px solid " + C.separator : "none" }}>
                      <CatIcon icon={cat.icon} color={cat.color} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{tx.label}</div>
                        <div style={{ fontSize: 12, color: C.text3, marginTop: 2 }}>{new Date(tx.date).toLocaleDateString("fr-BE", { day: "numeric", month: "short" })}</div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: isIn ? C.green : C.text }}>{isIn ? "+" : "−"}{fmt(tx.amount)}</div>
                      <button onClick={() => setTransactions((p) => p.filter((t) => t.id !== tx.id))} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.4, display: "flex" }}>
                        <Icons.Trash size={16} color={C.text3} />
                      </button>
                    </div>
                  );
                })
            )}
          </Card>
        </div>
      )}

      <FAB onClick={() => setShowAdd(true)} />

      {showAdd && (
        <AddTxModal
          onAdd={(tx) => {
            setTransactions((p) => [{ id: uid(), ...tx }, ...p]);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

function InvestSub({ investments, setInvestments }) {
  const [selId, setSelId] = useState(null);
  const [showUp, setShowUp] = useState(false);

  const tI = investments.reduce((s, p) => s + p.invested, 0);
  const tV = investments.reduce((s, p) => s + p.currentValue, 0);
  const tG = tV - tI;
  const tPct = tI > 0 ? ((tV - tI) / tI) * 100 : 0;

  const segs = investments.map((p) => ({
    pct: tV > 0 ? (p.currentValue / tV) * 100 : 0,
    color: PORTFOLIOS.find((x) => x.id === p.id)?.color || C.text3,
  }));

  const allDates = investments.flatMap((p) => (p.history || []).map((h) => new Date(h.date).getTime())).filter(Boolean);
  const lastUp = allDates.length > 0 ? Math.max(...allDates) : 0;
  const days = lastUp ? Math.floor((Date.now() - lastUp) / (1000 * 60 * 60 * 24)) : 999;

  const handleUp = (pid, nv) => {
    setInvestments((prev) =>
      prev.map((p) => {
        if (p.id !== pid) return p;
        return {
          ...p,
          currentValue: nv,
          history: [...(p.history || []), { date: new Date().toISOString().slice(0, 10), invested: p.invested, value: nv }],
        };
      })
    );
    setShowUp(false);
  };

  return (
    <div>
      {days >= 25 && (
        <div style={{ margin: "0 20px 12px", padding: "12px 16px", borderRadius: 12, background: C.orangeLight, display: "flex", alignItems: "center", gap: 10 }}>
          <Icons.Clock size={18} color={C.orange} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.orange }}>Mise à jour mensuelle</div>
            <div style={{ fontSize: 12, color: C.text2, marginTop: 2 }}>{lastUp ? `Il y a ${days} jours` : "Aucune mise à jour encore"}</div>
          </div>
          <button onClick={() => setShowUp(true)} style={{ background: C.orange, color: "white", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Mettre à jour
          </button>
        </div>
      )}

      <div style={{ padding: "0 20px 12px" }}>
        <Card>
          <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ position: "relative" }}>
              <DonutChart segments={segs} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 11, color: C.text2, fontWeight: 500 }}>Total</div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>{fmt(tV)}</div>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: C.text2, fontWeight: 500, marginBottom: 4 }}>Performance globale</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: tG >= 0 ? C.green : C.red, letterSpacing: -0.5 }}>{tG >= 0 ? "+" : ""}{fmt(tG)}</div>
              <div style={{ fontSize: 14, color: tPct >= 0 ? C.green : C.red, fontWeight: 600, marginTop: 2 }}>{fmtPct(tPct)}</div>
              <div style={{ fontSize: 12, color: C.text3, marginTop: 6 }}>Investi : {fmt(tI)}</div>
            </div>
          </div>

          <div style={{ padding: "0 16px 16px", display: "flex", gap: 16, flexWrap: "wrap" }}>
            {investments.map((p) => {
              const d = PORTFOLIOS.find((x) => x.id === p.id);
              return (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: d?.color }} />
                  <span style={{ fontSize: 11, color: C.text2, fontWeight: 500 }}>{d?.name}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {investments.map((p) => {
          const d = PORTFOLIOS.find((x) => x.id === p.id);
          const g = p.currentValue - p.invested;
          const pct = p.invested > 0 ? ((p.currentValue - p.invested) / p.invested) * 100 : 0;
          const isO = selId === p.id;

          return (
            <div key={p.id}>
              <Card>
                <div onClick={() => setSelId(isO ? null : p.id)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: d.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{d.icon}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{d.name}</span>
                      <span style={{ fontSize: 11, color: C.text3, fontWeight: 500, background: C.bg, padding: "2px 8px", borderRadius: 6 }}>{d.type}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.text3, marginTop: 3 }}>
                      {p.monthlyDCA > 0 ? `DCA ${fmt(p.monthlyDCA)}/mois · ` : ""}Investi {fmt(p.invested)}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{fmt(p.currentValue)}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: g >= 0 ? C.green : C.red }}>{fmtPct(pct)}</div>
                  </div>

                  <Sparkline data={(p.history || []).map((h) => ({ value: h.value }))} color={d.color} />
                </div>

                {isO && (
                  <div style={{ borderTop: "0.5px solid " + C.separator, padding: "12px 16px 16px" }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                      <MiniStat label="Investi" value={fmt(p.invested)} />
                      <MiniStat label="Valeur" value={fmt(p.currentValue)} />
                      <MiniStat label="Gain" value={(g >= 0 ? "+" : "") + fmt(g)} color={g >= 0 ? C.green : C.red} />
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text2, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Composition</div>

                    {p.holdings.length === 0 ? (
                      <Empty text="Aucune composition renseignée." />
                    ) : (
                      p.holdings.map((h, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{h.name}</div>
                            {h.ticker && <div style={{ fontSize: 11, color: C.text3 }}>{h.ticker}</div>}
                          </div>
                          <div style={{ width: 60, height: 3, background: C.separator, borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ width: h.allocation + "%", height: "100%", background: d.color, borderRadius: 2 }} />
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text2, minWidth: 36, textAlign: "right" }}>{h.allocation}%</div>
                        </div>
                      ))
                    )}

                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text2, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 14, marginBottom: 8 }}>Historique</div>

                    <div style={{ maxHeight: 160, overflowY: "auto" }}>
                      {(p.history || []).length === 0 ? (
                        <Empty text="Aucun historique pour le moment." />
                      ) : (
                        [...p.history].reverse().map((h, i) => {
                          const hP = h.invested > 0 ? ((h.value - h.invested) / h.invested) * 100 : 0;
                          return (
                            <div key={i} style={{ display: "flex", alignItems: "center", padding: "6px 0", borderTop: i > 0 ? "0.5px solid " + C.separator : "none" }}>
                              <div style={{ fontSize: 13, color: C.text2, flex: 1 }}>{new Date(h.date).toLocaleDateString("fr-BE", { month: "short", year: "numeric" })}</div>
                              <div style={{ fontSize: 13, fontWeight: 500, marginRight: 12 }}>{fmt(h.value)}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: hP >= 0 ? C.green : C.red, minWidth: 50, textAlign: "right" }}>{fmtPct(hP)}</div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <button onClick={() => setShowUp(true)} style={{ marginTop: 12, width: "100%", padding: 10, borderRadius: 10, border: "none", background: d.color + "15", color: d.color, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                      Mettre à jour la valeur
                    </button>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>

      {showUp && <UpdateModal investments={investments} onUpdate={handleUp} onClose={() => setShowUp(false)} />}
    </div>
  );
}

function UpdateModal({ investments, onUpdate, onClose }) {
  const [sel, setSel] = useState(investments[0]?.id || "");
  const [val, setVal] = useState("");
  const cur = investments.find((p) => p.id === sel);

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalSheet>
        <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600 }}>Mettre à jour</h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {investments.map((p) => {
            const d = PORTFOLIOS.find((x) => x.id === p.id);
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSel(p.id);
                  setVal("");
                }}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: "none",
                  background: sel === p.id ? d.color : C.bg,
                  color: sel === p.id ? "white" : C.text2,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 20 }}>{d.icon}</span>
                {d.name}
              </button>
            );
          })}
        </div>

        {cur && <div style={{ fontSize: 13, color: C.text2, marginBottom: 10, padding: "8px 12px", background: C.bg, borderRadius: 8 }}>Actuelle : <strong>{fmt(cur.currentValue)}</strong> · Investi : {fmt(cur.invested)}</div>}

        <div style={{ position: "relative" }}>
          <input type="number" placeholder="Nouvelle valeur" value={val} onChange={(e) => setVal(e.target.value)} style={{ ...inputStyle, fontSize: 20, fontWeight: 700, paddingRight: 32 }} onFocus={focusBorder} onBlur={blurBorder} />
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: C.text3, fontSize: 16 }}>€</span>
        </div>

        <SubmitBtn disabled={!Number(val)} onClick={() => Number(val) && onUpdate(sel, Number(val))} text="Enregistrer" />
      </ModalSheet>
    </>
  );
}

function AddTxModal({ onAdd, onClose }) {
  const [type, setType] = useState("expense");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("courses_b");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 100);
  }, []);

  const cats = type === "income" ? BUDGET_CATS.income : BUDGET_CATS.expense;

  useEffect(() => {
    setCategory(cats[0].id);
  }, [type]);

  const valid = label.trim() && Number(amount) > 0;

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalSheet>
        <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600 }}>Nouvelle transaction</h3>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[{ id: "expense", label: "Dépense", c: C.red }, { id: "income", label: "Revenu", c: C.green }].map((t) => (
            <button key={t.id} onClick={() => setType(t.id)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", fontSize: 14, fontWeight: 600, background: type === t.id ? t.c : C.bg, color: type === t.id ? "white" : C.text2, cursor: "pointer" }}>
              {t.label}
            </button>
          ))}
        </div>

        <input ref={ref} type="text" placeholder="Libellé" value={label} onChange={(e) => setLabel(e.target.value)} style={inputStyle} onFocus={focusBorder} onBlur={blurBorder} />

        <div style={{ display: "flex", gap: 10, marginTop: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input type="number" placeholder="Montant" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ ...inputStyle, paddingRight: 32 }} onFocus={focusBorder} onBlur={blurBorder} />
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: C.text3, fontSize: 16 }}>€</span>
          </div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ ...inputStyle, padding: "14px 12px", fontSize: 14 }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {cats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: category === cat.id ? "2px solid " + cat.color : "1.5px solid " + C.separator,
                background: category === cat.id ? cat.color + "15" : "transparent",
                color: category === cat.id ? cat.color : C.text2,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <SubmitBtn disabled={!valid} onClick={() => valid && onAdd({ label: label.trim(), amount: Number(amount), type, category, date })} text="Ajouter" />
      </ModalSheet>
    </>
  );
}

// ============================================================
// CALENDAR MODULE
// ============================================================
function CalendarModule({ events, setEvents }) {
  const [viewMode, setViewMode] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [selectedDate, setSelectedDate] = useState(new Date(today));
  const [showAdd, setShowAdd] = useState(false);

  const goNext = () => {
    const d = new Date(currentDate);
    viewMode === "month" ? d.setMonth(d.getMonth() + 1) : d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const goPrev = () => {
    const d = new Date(currentDate);
    viewMode === "month" ? d.setMonth(d.getMonth() - 1) : d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const goToday = () => {
    setCurrentDate(new Date(today));
    setSelectedDate(new Date(today));
  };

  const selEvents = events.filter((e) => e.date === toKey(selectedDate)).sort((a, b) => (a.time || "99").localeCompare(b.time || "99"));

  const upcoming = useMemo(() => {
    const t = toKey(today);
    const limit = new Date(today);
    limit.setDate(limit.getDate() + 30);
    return events.filter((e) => e.date >= t && e.date <= toKey(limit)).sort((a, b) => a.date.localeCompare(b.date) || (a.time || "99").localeCompare(b.time || "99"));
  }, [events]);

  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekEvents = events.filter((e) => e.date >= toKey(weekStart) && e.date <= toKey(weekEnd));

  return (
    <div>
      <div style={{ padding: "16px 20px 0" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, margin: 0 }}>Calendrier</h1>
        <ProgressBar value={weekEvents.filter((e) => e.date < toKey(today)).length} max={weekEvents.length} label={weekEvents.length + " évén. cette semaine"} color={C.accent} />
      </div>

      <SegToggle options={[{ id: "month", label: "Mois" }, { id: "week", label: "Semaine" }]} active={viewMode} onChange={setViewMode} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 10px" }}>
        <button onClick={goPrev} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icons.ChevLeft size={22} color={C.text2} /></button>

        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>
            {viewMode === "month" ? MN[currentDate.getMonth()] + " " + currentDate.getFullYear() : "Semaine du " + currentDate.getDate() + " " + MN_S[currentDate.getMonth()]}
          </span>
          {!sameDay(currentDate, today) && (
            <button onClick={goToday} style={{ marginLeft: 10, background: C.accentLight, border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: C.accent, cursor: "pointer" }}>
              Aujourd’hui
            </button>
          )}
        </div>

        <button onClick={goNext} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icons.ChevRight size={22} color={C.text2} /></button>
      </div>

      {viewMode === "month" ? <MonthView currentDate={currentDate} selectedDate={selectedDate} onSelect={setSelectedDate} events={events} /> : <WeekView currentDate={currentDate} selectedDate={selectedDate} onSelect={setSelectedDate} events={events} />}

      <div style={{ padding: "12px 20px 4px" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {sameDay(selectedDate, today) ? "Aujourd’hui" : selectedDate.toLocaleDateString("fr-BE", { weekday: "long", day: "numeric", month: "long" })}
        </span>
      </div>

      <div style={{ padding: "4px 20px 12px" }}>
        {selEvents.length === 0 ? (
          <Card><Empty text="Rien de prévu ce jour" /></Card>
        ) : (
          <Card>{selEvents.map((ev, i) => <EventRow key={ev.id} ev={ev} isLast={i === selEvents.length - 1} onDelete={() => setEvents((p) => p.filter((e) => e.id !== ev.id))} />)}</Card>
        )}
      </div>

      <div style={{ padding: "8px 20px 4px" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text2, textTransform: "uppercase", letterSpacing: 0.5 }}>À venir (30 jours)</span>
      </div>

      <div style={{ padding: "4px 20px 20px" }}>
        <Card>
          {upcoming.length === 0 ? (
            <Empty text="Aucun événement à venir" />
          ) : (
            upcoming.slice(0, 8).map((ev, i) => <EventRow key={ev.id} ev={ev} isLast={i === Math.min(upcoming.length, 8) - 1} showDate onDelete={() => setEvents((p) => p.filter((e) => e.id !== ev.id))} />)
          )}
        </Card>
        {upcoming.length > 8 && <div style={{ textAlign: "center", padding: "8px", fontSize: 13, color: C.text3 }}>+{upcoming.length - 8} autres</div>}
      </div>

      <FAB onClick={() => setShowAdd(true)} />

      {showAdd && (
        <AddEventModal
          defaultDate={toKey(selectedDate)}
          onAdd={(ev) => {
            setEvents((p) => [...p, { id: uid(), ...ev }]);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

function MonthView({ currentDate, selectedDate, onSelect, events }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  return (
    <div style={{ padding: "0 20px 8px" }}>
      <Card style={{ padding: "12px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, marginBottom: 6 }}>
          {DN.map((d) => <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: C.text3, padding: "4px 0" }}>{d}</div>)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {cells.map((date, i) => {
            if (!date) return <div key={"e" + i} />;

            const key = toKey(date);
            const isToday = sameDay(date, today);
            const isSel = sameDay(date, selectedDate);
            const dayEvents = events.filter((e) => e.date === key);
            const dotColors = [...new Set(dayEvents.map((e) => {
              const cat = EVENT_CATS.find((c) => c.id === e.category);
              return cat?.color || C.text3;
            }))].slice(0, 3);

            return (
              <button
                key={key}
                onClick={() => onSelect(new Date(date))}
                style={{
                  background: isSel ? C.accent : isToday ? C.accentLight : "transparent",
                  color: isSel ? "white" : isToday ? C.accent : C.text,
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 2px 4px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  minHeight: 44,
                  fontWeight: isToday || isSel ? 700 : 400,
                  fontSize: 15,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {date.getDate()}
                {dayEvents.length > 0 && (
                  <div style={{ display: "flex", gap: 2, marginTop: 1 }}>
                    {dotColors.map((c, j) => <div key={j} style={{ width: 4, height: 4, borderRadius: 2, background: isSel ? "rgba(255,255,255,0.7)" : c }} />)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function WeekView({ currentDate, selectedDate, onSelect, events }) {
  const d = new Date(currentDate);
  const dow = d.getDay();
  const mon = new Date(d);
  mon.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));

  const days = [];
  for (let i = 0; i < 7; i++) {
    const dd = new Date(mon);
    dd.setDate(mon.getDate() + i);
    days.push(dd);
  }

  return (
    <div style={{ padding: "0 20px 8px" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {days.map((day) => {
          const key = toKey(day);
          const isT = sameDay(day, today);
          const isS = sameDay(day, selectedDate);
          const evCount = events.filter((e) => e.date === key).length;

          return (
            <button
              key={key}
              onClick={() => onSelect(new Date(day))}
              style={{
                flex: 1,
                padding: "8px 2px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: isS ? C.accent : isT ? C.accentLight : C.card,
                boxShadow: isS ? "none" : "0 0.5px 1px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: isS ? "rgba(255,255,255,0.7)" : C.text3 }}>{DN[(day.getDay() + 6) % 7]}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: isS ? "white" : isT ? C.accent : C.text }}>{day.getDate()}</span>
              {evCount > 0 && <div style={{ width: 5, height: 5, borderRadius: 3, background: isS ? "rgba(255,255,255,0.7)" : C.accent, marginTop: 1 }} />}
            </button>
          );
        })}
      </div>

      <Card>
        {(() => {
          const key = toKey(selectedDate);
          const dayEv = events.filter((e) => e.date === key).sort((a, b) => (a.time || "99").localeCompare(b.time || "99"));
          if (dayEv.length === 0) return <Empty text="Rien de prévu" />;
          return dayEv.map((ev, i) => <EventRow key={ev.id} ev={ev} isLast={i === dayEv.length - 1} />);
        })()}
      </Card>
    </div>
  );
}

function EventRow({ ev, isLast, showDate, onDelete }) {
  const cat = EVENT_CATS.find((c) => c.id === ev.category) || { icon: "📌", color: C.text3, label: "Autre" };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: isLast ? "none" : "0.5px solid " + C.separator }}>
      <div style={{ width: 4, height: 32, borderRadius: 2, background: cat.color, flexShrink: 0 }} />

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{ev.title}</div>
        <div style={{ fontSize: 12, color: C.text3, marginTop: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {showDate && <span>{new Date(ev.date).toLocaleDateString("fr-BE", { day: "numeric", month: "short" })}</span>}
          {ev.time && <span>{showDate ? "· " : ""}{ev.time}</span>}
          {ev.allDay && !ev.time && <span>{showDate ? "· " : ""}Journée</span>}
          <span style={{ background: cat.color + "18", color: cat.color, padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{cat.label}</span>
        </div>
      </div>

      {onDelete && (
        <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.3, display: "flex" }}>
          <Icons.Trash size={16} color={C.text3} />
        </button>
      )}
    </div>
  );
}

function AddEventModal({ defaultDate, onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("perso");
  const [allDay, setAllDay] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 100);
  }, []);

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalSheet>
        <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600 }}>Nouvel événement</h3>

        <input ref={ref} type="text" placeholder="Titre de l’événement" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} onFocus={focusBorder} onBlur={blurBorder} />

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ ...inputStyle, flex: 1, padding: "14px 12px", fontSize: 14 }} />
          {!allDay && <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ ...inputStyle, width: 120, padding: "14px 12px", fontSize: 14 }} />}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "8px 0" }}>
          <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>Journée entière</span>
          <button
            onClick={() => {
              setAllDay(!allDay);
              if (!allDay) setTime("");
            }}
            style={{
              width: 48,
              height: 28,
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              background: allDay ? C.green : C.separator,
              position: "relative",
              transition: "background 0.2s ease",
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: 12, background: "white", position: "absolute", top: 2, left: allDay ? 22 : 2, transition: "left 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, marginBottom: 18 }}>
          {EVENT_CATS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: category === cat.id ? "2px solid " + cat.color : "1.5px solid " + C.separator,
                background: category === cat.id ? cat.color + "15" : "transparent",
                color: category === cat.id ? cat.color : C.text2,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <SubmitBtn disabled={!title.trim()} onClick={() => title.trim() && onAdd({ title: title.trim(), date, time: allDay ? "" : time, category, allDay })} text="Ajouter" />
      </ModalSheet>
    </>
  );
}