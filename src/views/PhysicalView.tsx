import { useState } from 'react'
import { NODES } from '../data/nodes'
import { NodeModal } from '../components/NodeModal'
import { C } from '../constants/colors'

const COLOR_MAP: Record<string, string> = {
  warning: C.warning,
  purple: C.purple,
  pink: C.pink,
  green100g: C.green100g,
  cyan10g: C.cyan10g,
  accent: C.accent,
  red: C.red,
  blue: C.blue,
  coloGreen: C.coloGreen,
  webPurple: C.webPurple,
  textDim: C.textDim,
}

interface DeviceCardProps {
  x: number; y: number; w: number; h: number
  nodeId: string
  label: string; badge?: string; color: string
  specs: string[]; selected: boolean; onClick: () => void
}

function DeviceCard({ x, y, w, h, label, badge, color, specs, selected, onClick }: DeviceCardProps) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* hover glow ring */}
      {selected && (
        <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={10}
          fill="none" stroke={color} strokeWidth={1.5} opacity={0.3}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill={selected ? color + '12' : C.panel}
        stroke={selected ? color : C.border}
        strokeWidth={selected ? 2 : 1}
        filter={selected ? `drop-shadow(0 0 14px ${color}50)` : undefined}
      />
      {/* Clickable hint chip */}
      {!selected && (
        <g>
          <rect x={x + w - 50} y={y + h - 20} width={42} height={14} rx={3}
            fill={color + '15'} stroke={color + '30'} strokeWidth={0.5}
          />
          <text x={x + w - 29} y={y + h - 9} textAnchor="middle" fontSize={7} fill={color + 'aa'} fontFamily="'JetBrains Mono'">details ›</text>
        </g>
      )}
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

function SwitchCard({ x, y, w, h, label, badge, color, ports, activeCount, totalCount, selected, onClick }: {
  x: number; y: number; w: number; h: number; label: string; badge: string; color: string
  ports: number; activeCount: number; totalCount: number
  selected?: boolean; onClick?: () => void
}) {
  const portW = 8, portH = 6, gap = 3
  const totalW = totalCount * (portW + gap) - gap
  const startX = x + (w - totalW) / 2
  return (
    <g onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      {selected && (
        <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={9}
          fill="none" stroke={color} strokeWidth={1.5} opacity={0.3}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={6}
        fill={selected ? color + '12' : C.panel}
        stroke={selected ? color : color + '60'}
        strokeWidth={selected ? 2 : 1.5}
        filter={selected ? `drop-shadow(0 0 14px ${color}50)` : undefined}
      />
      <rect x={x + 8} y={y + 4} width={badge.length * 7 + 12} height={16} rx={3} fill={color + '20'} stroke={color + '40'} strokeWidth={0.5} />
      <text x={x + 14} y={y + 15} fontSize={8} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{badge}</text>
      <text x={x + w / 2} y={y + 36} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.textBright} fontFamily="'JetBrains Mono'">{label}</text>
      {Array.from({ length: totalCount }).map((_, i) => (
        <rect key={i} x={startX + i * (portW + gap)} y={y + h - 16} width={portW} height={portH} rx={1}
          fill={i < activeCount ? color : C.border} opacity={i < activeCount ? 1 : 0.3}
        />
      ))}
      <text x={x + w / 2} y={y + h - 4} textAnchor="middle" fontSize={7} fill={C.textDim} fontFamily="'JetBrains Mono'">{activeCount}/{ports} active</text>
      {/* Clickable hint */}
      {onClick && !selected && (
        <g>
          <rect x={x + w - 55} y={y + 4} width={47} height={14} rx={3}
            fill={color + '15'} stroke={color + '30'} strokeWidth={0.5}
          />
          <text x={x + w - 31} y={y + 14} textAnchor="middle" fontSize={7} fill={color + 'aa'} fontFamily="'JetBrains Mono'">ports ›</text>
        </g>
      )}
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
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (id: string) => setActiveModal(id)
  const closeModal = () => setActiveModal(null)

  const svgW = 1200, svgH = 1410

  const card = (nodeId: string, x: number, y: number, w: number, h: number, specs: string[]) => {
    const node = NODES[nodeId]
    if (!node) return null
    const color = COLOR_MAP[node.colorKey] || C.accent
    return (
      <DeviceCard
        key={nodeId}
        x={x} y={y} w={w} h={h}
        nodeId={nodeId}
        label={node.name}
        badge={node.badge}
        color={color}
        specs={specs}
        selected={activeModal === nodeId}
        onClick={() => openModal(nodeId)}
      />
    )
  }

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
          <rect x={200} y={30} width={340} height={50} rx={6} fill={C.panel} stroke={C.accent + '60'} strokeWidth={1} />
          <text x={220} y={52} fontSize={9} fontWeight={600} fill={C.accent} fontFamily="'JetBrains Mono'">Samsung 49" Odyssey OLED G9</text>
          <text x={220} y={68} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">5120×1440 240Hz • DP 2.1</text>
          <rect x={660} y={30} width={340} height={50} rx={6} fill={C.panel} stroke={C.accent + '60'} strokeWidth={1} />
          <text x={680} y={52} fontSize={9} fontWeight={600} fill={C.accent} fontFamily="'JetBrains Mono'">Samsung 49" Odyssey OLED G9</text>
          <text x={680} y={68} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">5120×1440 240Hz • DP 2.1</text>

          <ConnectionLine x1={370} y1={80} x2={500} y2={110} color={C.accent} />
          <ConnectionLine x1={830} y1={80} x2={700} y2={110} color={C.accent} />
          <SpeedBadge x={430} y={95} label="DP 2.1" color={C.accent} />
          <SpeedBadge x={770} y={95} label="DP 2.1" color={C.accent} />

          {/* === IRONMAN === */}
          {card('ironman', 300, 110, 600, 170, [
            'CPU: AMD Threadripper PRO 9995WX • 64C/128T',
            'RAM: 256GB DDR5 ECC RDIMM (4×64GB)',
            'GPU: 2× RTX PRO 6000 Blackwell 96GB (192GB NVLink VRAM)',
            'SSD: 2× 4TB Samsung 990 PRO Gen4 NVMe',
            'NIC1: 10GbE → MS510TXUP  •  NIC2: CX-5 VPI 100GbE → SN2100',
            'Role: Flagship inference, Cursor, Claude Desktop',
            'Power: ~350W idle / ~1300W peak  •  PSU: 1650W 80+ Titanium',
          ])}

          <rect x={310} y={288} width={70} height={18} rx={3} fill={C.cyan10g + '20'} stroke={C.cyan10g + '40'} strokeWidth={0.5} />
          <text x={345} y={300} textAnchor="middle" fontSize={8} fill={C.cyan10g} fontFamily="'JetBrains Mono'">NIC1 10G</text>
          <rect x={390} y={288} width={80} height={18} rx={3} fill={C.green100g + '20'} stroke={C.green100g + '40'} strokeWidth={0.5} />
          <text x={430} y={300} textAnchor="middle" fontSize={8} fill={C.green100g} fontFamily="'JetBrains Mono'">NIC2 100G</text>

          {/* === SWITCH LAYER === */}
          <ConnectionLine x1={430} y1={310} x2={230} y2={395} color={C.green100g} thick />
          <SpeedBadge x={310} y={355} label="100GbE DAC" color={C.green100g} />
          <ConnectionLine x1={600} y1={310} x2={600} y2={395} color={C.cyan10g} />
          <SpeedBadge x={620} y={355} label="10G RJ45" color={C.cyan10g} />

          <text x={svgW / 2} y={388} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={4}>SWITCH LAYER</text>

          <SwitchCard x={60} y={400} w={300} h={80} label="Mellanox SN2100" badge="100GbE AI FABRIC"
            color={C.green100g} ports={16} activeCount={3} totalCount={16}
            selected={activeModal === 'sn2100'} onClick={() => openModal('sn2100')} />
          <SwitchCard x={440} y={400} w={300} h={80} label="Netgear MS510TXUP" badge="10G LAN CORE"
            color={C.cyan10g} ports={10} activeCount={8} totalCount={10}
            selected={activeModal === 'ms510txup'} onClick={() => openModal('ms510txup')} />
          <SwitchCard x={830} y={400} w={310} h={80} label="Netgear GS752TPv2" badge="PoE EDGE"
            color={C.textDim} ports={52} activeCount={12} totalCount={16} />

          <ConnectionLine x1={740} y1={440} x2={830} y2={440} color={C.warning} />
          <SpeedBadge x={785} y={432} label="1G SFP" color={C.warning} />

          {/* === COMPUTE NODES === */}
          <text x={svgW / 2} y={540} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={2}>
            DUAL-HOMED COMPUTE NODES (100GbE + 10G/2.5G LAN)
          </text>

          <ConnectionLine x1={210} y1={480} x2={180} y2={555} color={C.green100g} thick />
          <SpeedBadge x={180} y={515} label="100GbE" color={C.green100g} />
          <ConnectionLine x1={530} y1={480} x2={300} y2={555} color={C.cyan10g} dashed />
          <SpeedBadge x={420} y={510} label="2.5G" color={C.cyan10g} />
          <ConnectionLine x1={210} y1={480} x2={560} y2={555} color={C.green100g} thick />
          <ConnectionLine x1={590} y1={480} x2={680} y2={555} color={C.cyan10g} dashed />
          <SpeedBadge x={640} y={510} label="2.5G" color={C.cyan10g} />
          <ConnectionLine x1={650} y1={480} x2={1020} y2={555} color={C.cyan10g} dashed />
          <SpeedBadge x={850} y={510} label="2.5G" color={C.cyan10g} />

          {/* === ROW 1 === */}
          {card('ironpatriot', 60, 555, 355, 135, [
            'CPU: Intel Ultra 9 285K',
            'RAM: 128GB DDR5',
            'GPU: RTX PRO 6000 Ada 96GB',
            'SSD: 4TB Gen5 + 2×4TB',
            'NIC1: 2.5GbE → MS510  •  NIC2: CX-5 → SN2100',
            '10.2.10.71 • TS: 100.75.25.51',
          ])}

          {card('jericho', 445, 555, 355, 135, [
            'CPU: Intel Ultra 9 285K',
            'RAM: 128GB DDR5',
            'GPU: RTX PRO 6000 Ada 96GB',
            'SSD: 4TB Gen5 + 2×4TB',
            'NIC1: 2.5GbE → MS510  •  NIC2: CX-5 → SN2100',
            '10.2.10.35 • TS: 100.85.6.71',
          ])}

          {card('sentinel', 830, 555, 330, 135, [
            'CPU: AMD Ryzen 9 9950X3D 16C/32T',
            'RAM: 192GB DDR5',
            'GPU: RTX 5090 32GB',
            'SSD: 4TB + 3TB (6.4TB total)',
            'NIC: Realtek 2.5GbE → MS510TXUP',
            '10.2.10.70 • TS: 100.98.251.57',
          ])}

          {/* === ROW 2 === */}
          <text x={svgW / 2} y={720} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={2}>
            ADDITIONAL NODES (LAN CONNECTED)
          </text>

          <ConnectionLine x1={590} y1={480} x2={400} y2={735} color={C.cyan10g} dashed />
          <SpeedBadge x={480} y={710} label="2.5G" color={C.cyan10g} />

          {card('happy', 200, 735, 380, 100, [
            'Home Desktop',
            'NIC: 2.5GbE → MS510  •  Role: NSSM test services',
            '10.2.10.112 • TS: 100.87.48.124',
          ])}

          {/* === ER4 VPN Gateway === */}
          <ConnectionLine x1={560} y1={480} x2={750} y2={735} color={C.red} dashed />
          <SpeedBadge x={660} y={710} label="ER4 VPN" color={C.red} />

          <rect x={660} y={735} width={200} height={50} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
          <text x={680} y={757} fontSize={9} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">ER4 Gateway</text>
          <text x={680} y={772} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">MS510 Port 2 • VPN → Remote</text>

          <ConnectionLine x1={760} y1={785} x2={760} y2={810} color={C.red} dashed />

          {card('warmachine', 560, 810, 400, 100, [
            "CPU: AMD Ryzen 9 9950X  •  Jeremy's Machine",
            'RAM: 128GB DDR5 (arrives Mar 11)',
            'GPU: RTX 5080 16GB  •  Remote via Edge4 VPN',
            'Role: Remote dev workstation',
          ])}

          {/* === WAN / VPN === */}
          <ConnectionLine x1={600} y1={910} x2={600} y2={940} color={C.red} dashed />
          <rect x={430} y={940} width={340} height={55} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
          <text x={460} y={963} fontSize={10} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">WAN / VPN</text>
          <text x={460} y={977} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">Internet Gateway • Tailscale Mesh • Parsec</text>

          <ConnectionLine x1={600} y1={995} x2={600} y2={1030} color={C.red} dashed />

          {/* === COLO SERVERS === */}
          <text x={svgW / 2} y={1045} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={2}>
            COLO SERVERS (VPN CONNECTED)
          </text>

          {card('jarvis', 60, 1060, 265, 120, [
            'Boca Raton (Colo)',
            'GPU: 4× NVIDIA L40S 48GB',
            '192GB Total VRAM',
            'SSH: .25 / .26 • Ollama :11434',
            'iDRAC: .23',
          ])}

          {card('starktower', 345, 1060, 265, 120, [
            'Atlanta (Cloud)',
            'Main Production Server',
            'Web / Database Stack',
            'Active',
          ])}

          {card('starkindustries', 630, 1060, 265, 120, [
            'Boca Raton (Colo)',
            'Secondary Production',
            'Web / Database Stack',
            'Active',
          ])}

          {card('malibu', 915, 1060, 245, 120, [
            'Boca Raton (Colo)',
            'Test Environment',
            'Web / Database Stack',
            'Active',
          ])}

          {/* === SPEED COMPARISON === */}
          <rect x={60} y={1210} width={500} height={110} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
          <text x={80} y={1235} fontSize={11} fontWeight={700} fill={C.textBright} fontFamily="'JetBrains Mono'">SPEED COMPARISON</text>
          <rect x={80} y={1245} width={100} height={12} rx={2} fill={C.textDim + '30'} />
          <rect x={80} y={1245} width={10} height={12} rx={2} fill={C.textDim} />
          <text x={195} y={1255} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">Old LAN 1GbE ~125 MB/s</text>
          <rect x={80} y={1268} width={100} height={12} rx={2} fill={C.cyan10g + '60'} />
          <text x={195} y={1278} fontSize={9} fill={C.cyan10g} fontFamily="'JetBrains Mono'">New LAN 10G/2.5G ~1.25 GB/s (10×)</text>
          <rect x={80} y={1291} width={450} height={12} rx={2} fill={C.green100g + '40'} />
          <text x={195} y={1301} fontSize={9} fill={C.green100g} fontFamily="'JetBrains Mono'">AI Fabric 100GbE ~12.5 GB/s (100×)</text>

          {/* === REMOTE ACCESS === */}
          <rect x={600} y={1210} width={540} height={110} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
          <text x={620} y={1235} fontSize={11} fontWeight={700} fill={C.textBright} fontFamily="'JetBrains Mono'">REMOTE ACCESS</text>
          <text x={620} y={1257} fontSize={9} fill={C.accent} fontFamily="'JetBrains Mono'">● Parsec — GPU-accelerated remote desktop</text>
          <text x={620} y={1276} fontSize={9} fill={C.purple} fontFamily="'JetBrains Mono'">● Barrier KVM — shared keyboard/mouse across nodes</text>
          <text x={620} y={1295} fontSize={9} fill={C.warning} fontFamily="'JetBrains Mono'">● WinRM Mesh — remote PowerShell admin (all nodes)</text>
          <text x={620} y={1314} fontSize={9} fill={C.red} fontFamily="'JetBrains Mono'">● Tailscale — encrypted overlay VPN (100.x.x.x)</text>

          {/* === LEGEND === */}
          <rect x={60} y={1340} width={1080} height={55} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
          <text x={80} y={1360} fontSize={10} fontWeight={600} fill={C.textDim} fontFamily="'JetBrains Mono'">LEGEND</text>
          {[
            { color: C.warning, label: 'Flagship', x: 160 },
            { color: C.purple, label: 'Dual-Homed Compute', x: 280 },
            { color: C.pink, label: 'Daily Driver', x: 470 },
            { color: C.blue, label: 'Build / Test', x: 600 },
            { color: C.coloGreen, label: 'Colo AI Server', x: 730 },
            { color: C.webPurple, label: 'Colo Web / Prod', x: 890 },
            { color: C.green100g, label: '100GbE AI Fabric', x: 160, y: 1380 },
            { color: C.cyan10g, label: '10G/2.5G LAN', x: 340, y: 1380 },
            { color: C.accent, label: 'Display / DP 2.1', x: 510, y: 1380 },
            { color: C.red, label: 'WAN / VPN', x: 680, y: 1380 },
            { color: C.textDim, label: 'PoE Edge', x: 820, y: 1380 },
          ].map((item) => (
            <g key={item.label}>
              <rect x={item.x} y={(item.y || 1352) - 3} width={10} height={10} rx={2} fill={item.color} />
              <text x={item.x + 15} y={(item.y || 1360)} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{item.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Modal */}
      {activeModal && NODES[activeModal] && (
        <NodeModal node={NODES[activeModal]} onClose={closeModal} />
      )}
    </div>
  )
}
