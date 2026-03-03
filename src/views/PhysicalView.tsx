import { useState } from 'react'

const C = {
  warning: '#f59e0b',
  purple: '#a78bfa',
  pink: '#f472b6',
  green100g: '#34d399',
  cyan10g: '#38bdf8',
  accent: '#00d4ff',
  red: '#ef4444',
  textDim: '#94a3b8',
  textBright: '#e2e8f0',
  panel: '#111827',
  border: '#1e293b',
  bg: '#0a0e17',
}

interface DeviceCardProps {
  x: number; y: number; w: number; h: number
  label: string; badge?: string; color: string
  specs: string[]; selected: boolean; onClick: () => void
}

function DeviceCard({ x, y, w, h, label, badge, color, specs, selected, onClick }: DeviceCardProps) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill={C.panel} stroke={selected ? color : C.border}
        strokeWidth={selected ? 2 : 1}
        filter={selected ? `drop-shadow(0 0 12px ${color}40)` : undefined}
      />
      {badge && (
        <g>
          <rect x={x + w - 8 - badge.length * 6.5} y={y + 6} width={badge.length * 6.5 + 12} height={18} rx={4} fill={color + '25'} stroke={color + '50'} strokeWidth={0.5} />
          <text x={x + w - 2 - badge.length * 3.25} y={y + 19} textAnchor="middle" fontSize={9} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{badge}</text>
        </g>
      )}
      <text x={x + 12} y={y + 22} fontSize={12} fontWeight={700} fill={color} fontFamily="'JetBrains Mono'">{label}</text>
      {specs.map((s, i) => (
        <text key={i} x={x + 12} y={y + 40 + i * 15} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{s}</text>
      ))}
    </g>
  )
}

function SwitchCard({ x, y, w, h, label, badge, color, ports, activeCount, totalCount }: {
  x: number; y: number; w: number; h: number; label: string; badge: string; color: string
  ports: number; activeCount: number; totalCount: number
}) {
  const portW = 8, portH = 6, gap = 3
  const totalW = totalCount * (portW + gap) - gap
  const startX = x + (w - totalW) / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={C.panel} stroke={color + '60'} strokeWidth={1.5} />
      <rect x={x + 8} y={y + 4} width={badge.length * 7 + 12} height={16} rx={3} fill={color + '20'} stroke={color + '40'} strokeWidth={0.5} />
      <text x={x + 14} y={y + 15} fontSize={8} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{badge}</text>
      <text x={x + w / 2} y={y + 36} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.textBright} fontFamily="'JetBrains Mono'">{label}</text>
      {Array.from({ length: totalCount }).map((_, i) => (
        <rect key={i} x={startX + i * (portW + gap)} y={y + h - 16} width={portW} height={portH} rx={1}
          fill={i < activeCount ? color : C.border} opacity={i < activeCount ? 1 : 0.3}
        />
      ))}
      <text x={x + w / 2} y={y + h - 4} textAnchor="middle" fontSize={7} fill={C.textDim} fontFamily="'JetBrains Mono'">{activeCount}/{ports} active</text>
    </g>
  )
}

function SpeedBadge({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  const w = label.length * 6 + 16
  return (
    <g>
      <rect x={x - w / 2} y={y - 8} width={w} height={16} rx={8} fill={C.bg} stroke={color} strokeWidth={1} />
      <text x={x} y={y + 3} textAnchor="middle" fontSize={8} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{label}</text>
    </g>
  )
}

function ConnectionLine({ x1, y1, x2, y2, color, dashed, thick }: {
  x1: number; y1: number; x2: number; y2: number; color: string; dashed?: boolean; thick?: boolean
}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={thick ? 3 : 1.5}
      strokeDasharray={dashed ? '6,4' : undefined}
      opacity={0.7}
    />
  )
}

export function PhysicalView() {
  const [selected, setSelected] = useState<string | null>(null)

  const svgW = 1200, svgH = 1040

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 900 }}>
          <defs>
            <filter id="glow-green">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* === DISPLAY LAYER === */}
          <text x={svgW / 2} y={20} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={4}>DISPLAY LAYER</text>
          {/* G9 Monitor 1 */}
          <rect x={200} y={30} width={340} height={50} rx={6} fill={C.panel} stroke={C.accent + '60'} strokeWidth={1} />
          <text x={220} y={52} fontSize={9} fontWeight={600} fill={C.accent} fontFamily="'JetBrains Mono'">Samsung 49" Odyssey OLED G9</text>
          <text x={220} y={68} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">5120×1440 240Hz • DP 2.1</text>
          {/* G9 Monitor 2 */}
          <rect x={660} y={30} width={340} height={50} rx={6} fill={C.panel} stroke={C.accent + '60'} strokeWidth={1} />
          <text x={680} y={52} fontSize={9} fontWeight={600} fill={C.accent} fontFamily="'JetBrains Mono'">Samsung 49" Odyssey OLED G9</text>
          <text x={680} y={68} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">5120×1440 240Hz • DP 2.1</text>

          {/* DP 2.1 lines from monitors to Ironman */}
          <ConnectionLine x1={370} y1={80} x2={500} y2={110} color={C.accent} />
          <ConnectionLine x1={830} y1={80} x2={700} y2={110} color={C.accent} />
          <SpeedBadge x={430} y={95} label="DP 2.1" color={C.accent} />
          <SpeedBadge x={770} y={95} label="DP 2.1" color={C.accent} />

          {/* === IRONMAN (h=170 for 7 spec lines) === */}
          <DeviceCard x={300} y={110} w={600} h={170} label="IRONMAN" badge="PRIMARY" color={C.warning}
            selected={selected === 'ironman'} onClick={() => setSelected(selected === 'ironman' ? null : 'ironman')}
            specs={[
              'CPU: AMD Threadripper PRO 9995WX • 128T/64C',
              'RAM: 256GB DDR5 ECC RDIMM (4×64GB)',
              'GPU: 2× RTX PRO 6000 96GB ECC (192GB VRAM)',
              'SSD: 2× 4TB Samsung 990 PRO Gen4 NVMe',
              'NIC1: 10GbE → MS510TXUP  •  NIC2: CX-5 VPI 100GbE → SN2100',
              'Role: Daily driver, Cursor, Claude Desktop, large model inference',
              'Power: ~350W idle / ~1300W peak  •  PSU: 1650W 80+ Titanium',
            ]}
          />

          {/* Dual NIC callout — below card (card bottom = 280) */}
          <rect x={310} y={288} width={70} height={18} rx={3} fill={C.cyan10g + '20'} stroke={C.cyan10g + '40'} strokeWidth={0.5} />
          <text x={345} y={300} textAnchor="middle" fontSize={8} fill={C.cyan10g} fontFamily="'JetBrains Mono'">NIC1 10G</text>
          <rect x={390} y={288} width={80} height={18} rx={3} fill={C.green100g + '20'} stroke={C.green100g + '40'} strokeWidth={0.5} />
          <text x={430} y={300} textAnchor="middle" fontSize={8} fill={C.green100g} fontFamily="'JetBrains Mono'">NIC2 100G</text>

          {/* === CONNECTION LINES: Ironman → Switches === */}
          {/* Ironman → SN2100 (100GbE) */}
          <ConnectionLine x1={430} y1={310} x2={230} y2={395} color={C.green100g} thick />
          <SpeedBadge x={310} y={355} label="100GbE DAC" color={C.green100g} />
          {/* Ironman → MS510TXUP (10G) */}
          <ConnectionLine x1={600} y1={310} x2={600} y2={395} color={C.cyan10g} />
          <SpeedBadge x={620} y={355} label="10G RJ45" color={C.cyan10g} />

          {/* === SWITCH LAYER === */}
          <text x={svgW / 2} y={388} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={4}>SWITCH LAYER</text>

          {/* SN2100 */}
          <SwitchCard x={60} y={400} w={300} h={80} label="Mellanox SN2100" badge="100GbE AI FABRIC"
            color={C.green100g} ports={16} activeCount={3} totalCount={16} />

          {/* MS510TXUP */}
          <SwitchCard x={440} y={400} w={300} h={80} label="Netgear MS510TXUP" badge="10G LAN CORE"
            color={C.cyan10g} ports={10} activeCount={6} totalCount={10} />

          {/* GS752TPv2 */}
          <SwitchCard x={830} y={400} w={310} h={80} label="Netgear GS752TPv2" badge="PoE EDGE"
            color={C.textDim} ports={52} activeCount={12} totalCount={16} />

          {/* Cascade: MS510TXUP → GS752TPv2 */}
          <ConnectionLine x1={740} y1={440} x2={830} y2={440} color={C.warning} />
          <SpeedBadge x={785} y={432} label="1G SFP" color={C.warning} />

          {/* === COMPUTE NODES LABEL === */}
          <text x={svgW / 2} y={540} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={2}>
            DUAL-HOMED COMPUTE NODES (100GbE + 10G/2.5G LAN)
          </text>

          {/* === CONNECTION LINES: Switches → Nodes === */}
          {/* J2 → SN2100 */}
          <ConnectionLine x1={210} y1={480} x2={180} y2={555} color={C.green100g} thick />
          <SpeedBadge x={180} y={515} label="100GbE" color={C.green100g} />
          {/* J2 → MS510TXUP */}
          <ConnectionLine x1={530} y1={480} x2={300} y2={555} color={C.cyan10g} dashed />
          <SpeedBadge x={420} y={510} label="2.5G" color={C.cyan10g} />
          {/* J3 → SN2100 */}
          <ConnectionLine x1={210} y1={480} x2={560} y2={555} color={C.green100g} thick />
          {/* J3 → MS510TXUP */}
          <ConnectionLine x1={590} y1={480} x2={680} y2={555} color={C.cyan10g} dashed />
          <SpeedBadge x={640} y={510} label="2.5G" color={C.cyan10g} />
          {/* Jarvis → MS510TXUP */}
          <ConnectionLine x1={650} y1={480} x2={1020} y2={555} color={C.cyan10g} dashed />
          <SpeedBadge x={850} y={510} label="2.5G" color={C.cyan10g} />

          {/* === COMPUTE NODES === */}
          <DeviceCard x={60} y={555} w={355} h={135} label="JARVIS2" badge="NODE 2" color={C.purple}
            selected={selected === 'j2'} onClick={() => setSelected(selected === 'j2' ? null : 'j2')}
            specs={[
              'CPU: Intel Ultra 9 285K',
              'RAM: 128GB DDR5',
              'GPU: RTX PRO 6000 96GB ECC (96GB VRAM)',
              'SSD: 4TB Gen5 + 2×4TB',
              'NIC1: 2.5GbE → MS510  •  NIC2: CX-5 → SN2100',
              'Role: Build/test, Ollama worker node',
            ]}
          />

          <DeviceCard x={445} y={555} w={355} h={135} label="JARVIS3" badge="NODE 3" color={C.purple}
            selected={selected === 'j3'} onClick={() => setSelected(selected === 'j3' ? null : 'j3')}
            specs={[
              'CPU: Intel Ultra 9 285K',
              'RAM: 128GB DDR5',
              'GPU: RTX PRO 6000 96GB ECC (96GB VRAM)',
              'SSD: 4TB Gen5 + 2×4TB',
              'NIC1: 2.5GbE → MS510  •  NIC2: CX-5 → SN2100',
              'Role: Docker host, automation, Ollama worker',
            ]}
          />

          <DeviceCard x={830} y={555} w={330} h={135} label="JARVIS (JAMES-AI)" badge="2.5GbE" color={C.pink}
            selected={selected === 'jarvis'} onClick={() => setSelected(selected === 'jarvis' ? null : 'jarvis')}
            specs={[
              'CPU: AMD Ryzen 9 9950X3D 16C/32T',
              'RAM: 192GB DDR5',
              'GPU: RTX 5090 32GB + AMD iGPU',
              'SSD: 4TB + 3TB (6.4TB total)',
              'NIC: Realtek 2.5GbE → MS510TXUP',
              'Role: AI workstation, gaming, dev',
            ]}
          />

          {/* === WAN/VPN — routed through gap between J2 and J3 === */}
          <ConnectionLine x1={430} y1={480} x2={430} y2={550} color={C.red} dashed />
          <ConnectionLine x1={430} y1={695} x2={430} y2={750} color={C.red} dashed />
          <rect x={320} y={750} width={220} height={55} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
          <text x={350} y={770} fontSize={10} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">WAN / VPN</text>
          <text x={350} y={784} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">Internet Gateway</text>
          <text x={350} y={796} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">Tailscale Mesh • Parsec</text>

          {/* === SPEED COMPARISON === */}
          <rect x={60} y={830} width={500} height={110} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
          <text x={80} y={855} fontSize={11} fontWeight={700} fill={C.textBright} fontFamily="'JetBrains Mono'">SPEED COMPARISON</text>
          {/* Tier 1 */}
          <rect x={80} y={865} width={100} height={12} rx={2} fill={C.textDim + '30'} />
          <rect x={80} y={865} width={10} height={12} rx={2} fill={C.textDim} />
          <text x={195} y={875} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">Old LAN 1GbE ~125 MB/s</text>
          {/* Tier 2 */}
          <rect x={80} y={888} width={100} height={12} rx={2} fill={C.cyan10g + '20'} />
          <rect x={80} y={888} width={100} height={12} rx={2} fill={C.cyan10g + '60'} />
          <text x={195} y={898} fontSize={9} fill={C.cyan10g} fontFamily="'JetBrains Mono'">New LAN 10G/2.5G ~1.25 GB/s (10×)</text>
          {/* Tier 3 */}
          <rect x={80} y={911} width={450} height={12} rx={2} fill={C.green100g + '20'} />
          <rect x={80} y={911} width={450} height={12} rx={2} fill={C.green100g + '40'} />
          <text x={195} y={921} fontSize={9} fill={C.green100g} fontFamily="'JetBrains Mono'">AI Fabric 100GbE ~12.5 GB/s (100×)</text>

          {/* === REMOTE ACCESS === */}
          <rect x={600} y={830} width={540} height={110} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
          <text x={620} y={855} fontSize={11} fontWeight={700} fill={C.textBright} fontFamily="'JetBrains Mono'">REMOTE ACCESS</text>
          <text x={620} y={877} fontSize={9} fill={C.accent} fontFamily="'JetBrains Mono'">● Parsec — GPU-accelerated remote desktop (Ironman host)</text>
          <text x={620} y={896} fontSize={9} fill={C.purple} fontFamily="'JetBrains Mono'">● Barrier KVM — shared keyboard/mouse across all nodes</text>
          <text x={620} y={915} fontSize={9} fill={C.warning} fontFamily="'JetBrains Mono'">● WinRM Mesh — remote PowerShell admin (all nodes)</text>
          <text x={620} y={934} fontSize={9} fill={C.red} fontFamily="'JetBrains Mono'">● Tailscale — encrypted overlay VPN (100.x.x.x)</text>

          {/* === LEGEND === */}
          <rect x={60} y={960} width={1080} height={55} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
          <text x={80} y={980} fontSize={10} fontWeight={600} fill={C.textDim} fontFamily="'JetBrains Mono'">LEGEND</text>
          {[
            { color: C.warning, label: 'Primary Workstation', x: 160 },
            { color: C.purple, label: 'AI Compute Nodes', x: 340 },
            { color: C.pink, label: 'AI Workstation (2.5GbE)', x: 505 },
            { color: C.green100g, label: '100GbE AI Fabric', x: 710 },
            { color: C.cyan10g, label: '10G/2.5G LAN', x: 880 },
            { color: C.accent, label: 'Display / DP 2.1', x: 160, y: 1000 },
            { color: C.red, label: 'WAN / VPN', x: 340, y: 1000 },
            { color: C.textDim, label: 'PoE Edge', x: 505, y: 1000 },
          ].map((item) => (
            <g key={item.label}>
              <rect x={item.x} y={(item.y || 972) - 3} width={10} height={10} rx={2} fill={item.color} />
              <text x={item.x + 15} y={(item.y || 980)} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{item.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
