// Minh họa SVG dạng phong cảnh núi đá vôi cách điệu cho từng điểm di tích
// Thay thế ảnh thật trong bản demo - mỗi site có palette và hình dáng núi riêng

const PALETTES = {
  trangan: { sky: ["#E8E2C8", "#C9D9C0"], far: "#7C9485", mid: "#4F6B57", near: "#2F4A3C", water: "#8FAE9C" },
  tamcoc: { sky: ["#EDE6C9", "#D7E0B8"], far: "#8A9D6E", mid: "#5C7A47", near: "#3B5D45", water: "#A9C28C" },
  hoalu: { sky: ["#EFE3CC", "#DCCFAE"], far: "#9C8862", mid: "#7A6640", near: "#5B4A2F", water: "#C9B98E" },
  baidinh: { sky: ["#F1E4C9", "#E3CFA0"], far: "#AD9457", mid: "#8E7038", near: "#7A5A2E", water: "#D8C28A" },
};

export default function SiteIllustration({ siteImage, className }) {
  const p = PALETTES[siteImage] || PALETTES.trangan;
  return (
    <svg
      viewBox="0 0 800 450"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Minh họa phong cảnh"
    >
      <defs>
        <linearGradient id={`sky-${siteImage}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="100%" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`water-${siteImage}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.water} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.water} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#sky-${siteImage})`} />

      {/* Far mountains */}
      <path d="M0,260 L60,210 L120,250 L190,190 L260,240 L330,200 L400,245 L470,195 L540,235 L610,205 L680,250 L740,215 L800,255 L800,450 L0,450 Z" fill={p.far} opacity="0.55" />
      {/* Mid mountains */}
      <path d="M0,300 L70,250 L140,290 L210,235 L290,285 L360,240 L430,295 L510,245 L580,290 L660,250 L730,295 L800,260 L800,450 L0,450 Z" fill={p.mid} opacity="0.75" />
      {/* Near karst peaks */}
      <path d="M0,340 L50,270 L90,330 L150,255 L195,325 L250,265 L300,335 L360,275 L420,330 L480,260 L540,335 L600,280 L660,330 L720,270 L800,330 L800,450 L0,450 Z" fill={p.near} />

      {/* Water reflection */}
      <rect x="0" y="340" width="800" height="110" fill={`url(#water-${siteImage})`} />

      {/* Boat silhouette */}
      <g transform="translate(420,380)">
        <path d="M-40,10 Q0,28 40,10 L34,16 Q0,30 -34,16 Z" fill="#2A2620" opacity="0.6" />
        <line x1="0" y1="10" x2="0" y2="-14" stroke="#2A2620" strokeWidth="1.5" opacity="0.6" />
      </g>
      <g transform="translate(220,400)">
        <path d="M-30,8 Q0,20 30,8 L25,12 Q0,22 -25,12 Z" fill="#2A2620" opacity="0.5" />
      </g>

      {/* Birds */}
      <g stroke="#2A2620" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round">
        <path d="M120,80 q8,-10 16,0 q8,-10 16,0" />
        <path d="M180,60 q6,-8 12,0 q6,-8 12,0" />
        <path d="M640,90 q7,-9 14,0 q7,-9 14,0" />
      </g>
    </svg>
  );
}
