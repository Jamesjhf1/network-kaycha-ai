import { useState } from 'react'
import { NODES } from '../data/nodes'
import { SITES, type SiteId } from '../data/sites'
import { NodeModal } from '../components/NodeModal'
import { C, COLOR_MAP } from '../constants/colors'
import { DeviceCard } from '../components/svg/DeviceCard'
import { SwitchCard } from '../components/svg/SwitchCard'
import { ConnectionLine } from '../components/svg/ConnectionLine'
import { SpeedBadge } from '../components/svg/SpeedBadge'

/* ─── helpers ────────────────────────────────────────────── */

const card = (
  nodeId: string, x: number, y: number, w: number, h: number, specs: string[],
  activeModal: string | null, openModal: (id: string) => void,
) => {
  const node = NODES[nodeId]
  if (!node) return null
  const color = COLOR_MAP[node.colorKey] || C.accent
  return (
    <DeviceCard
      key={nodeId} x={x} y={y} w={w} h={h}
      nodeId={nodeId} label={node.name} badge={node.badge}
      color={color} specs={specs}
      selected={activeModal === nodeId}
      onClick={() => openModal(nodeId)}
    />
  )
}

/* ─── Cloud Overview (Level 1) ───────────────────────────── */

interface CloudOverviewProps {
  onSelectSite: (id: SiteId) => void
}

function SiteCard({ x, y, w, h, site, color, onClick }: {
  x: number; y: number; w: number; h: number
  site: typeof SITES['boca-lab']; color: string; onClick: () => void
}) {
  const nodeCount = site.nodeIds.length
  const onlineCount = site.nodeIds.filter(id => NODES[id]?.status === 'online' || NODES[id]?.status === 'coming-soon').length
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={C.panel} stroke={color + '60'} strokeWidth={1.5}
      />
      {/* color accent bar */}
      <rect x={x} y={y} width={6} height={h} rx={3} fill={color} />
      {/* site name */}
      <text x={x + 18} y={y + 24} fontSize={13} fontWeight={700} fill={color} fontFamily="'JetBrains Mono'">{site.label}</text>
      <text x={x + 18} y={y + 40} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{site.location}</text>
      {/* node count badge */}
      <rect x={x + w - 55} y={y + 10} width={42} height={20} rx={10} fill={color + '20'} stroke={color + '40'} strokeWidth={0.5} />
      <text x={x + w - 34} y={y + 24} textAnchor="middle" fontSize={10} fontWeight={700} fill={color} fontFamily="'JetBrains Mono'">{nodeCount}</text>
      {/* subtitle */}
      <text x={x + 18} y={y + 58} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">{site.subtitle}</text>
      {/* status dots */}
      <g>
        {site.nodeIds.slice(0, 8).map((nid, i) => {
          const n = NODES[nid]
          const dotColor = n?.status === 'online' ? C.green100g : n?.status === 'building' ? C.warning : n?.status === 'coming-soon' ? C.orange : C.textDim
          return <circle key={nid} cx={x + 22 + i * 14} cy={y + h - 16} r={4} fill={dotColor} />
        })}
      </g>
      {/* node names */}
      <text x={x + 18} y={y + h - 5} fontSize={7} fill={C.textDim} fontFamily="'JetBrains Mono'">
        {site.nodeIds.map(id => NODES[id]?.name || id).join(' • ')}
      </text>
      {/* drill-in hint */}
      <g>
        <rect x={x + w - 70} y={y + h - 28} width={58} height={16} rx={4} fill={color + '12'} stroke={color + '30'} strokeWidth={0.5} />
        <text x={x + w - 41} y={y + h - 17} textAnchor="middle" fontSize={8} fill={color + 'cc'} fontFamily="'JetBrains Mono'">view LAN ›</text>
      </g>
    </g>
  )
}

function CloudOverview({ onSelectSite }: CloudOverviewProps) {
  const svgW = 1200, svgH = 720
  const cx = svgW / 2, cy = 320

  // Site positions (hub-and-spoke centered on Boca Lab)
  const positions: Record<SiteId, { x: number; y: number; w: number; h: number }> = {
    'boca-lab':      { x: cx - 160, y: cy - 55, w: 320, h: 110 },
    'boca-colo':     { x: cx + 250, y: cy - 40, w: 280, h: 100 },
    'atlanta':       { x: cx - 60,  y: 60,      w: 240, h: 95 },
    'remote-wm':     { x: 60,       y: cy - 40, w: 260, h: 100 },
    'remote-happy':  { x: cx - 60,  y: 520,     w: 240, h: 95 },
  }

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 800 }}>
      {/* Title */}
      <text x={cx} y={30} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.textBright} fontFamily="'JetBrains Mono'" letterSpacing={3}>
        NETWORK TOPOLOGY — ALL SITES
      </text>
      <text x={cx} y={48} textAnchor="middle" fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">
        Click any site to view its LAN topology
      </text>

      {/* === Connection lines (behind cards) === */}
      {/* Boca Lab → Atlanta (VPN) */}
      <ConnectionLine x1={cx} y1={positions['boca-lab'].y} x2={cx} y2={positions['atlanta'].y + 95} color={C.red} dashed />
      <SpeedBadge x={cx + 50} y={215} label="VPN / Tailscale" color={C.red} />

      {/* Boca Lab → Boca Colo (LAN/VPN) */}
      <ConnectionLine x1={positions['boca-lab'].x + 320} y1={cy} x2={positions['boca-colo'].x} y2={cy} color={C.coloGreen} dashed />
      <SpeedBadge x={cx + 210} y={cy - 12} label="Colo VPN" color={C.coloGreen} />

      {/* Boca Lab → War-Machine (VPN) */}
      <ConnectionLine x1={positions['boca-lab'].x} y1={cy} x2={positions['remote-wm'].x + 260} y2={cy} color={C.red} dashed />
      <SpeedBadge x={cx - 240} y={cy - 12} label="ER4 VPN" color={C.red} />

      {/* Boca Lab → Happy (VPN) */}
      <ConnectionLine x1={cx} y1={positions['boca-lab'].y + 110} x2={cx} y2={positions['remote-happy'].y} color={C.red} dashed />
      <SpeedBadge x={cx + 50} y={475} label="VPN / Tailscale" color={C.red} />

      {/* Boca Colo → Atlanta (VPN) */}
      <ConnectionLine x1={positions['boca-colo'].x + 140} y1={positions['boca-colo'].y} x2={positions['atlanta'].x + 200} y2={positions['atlanta'].y + 95} color={C.webPurple} dashed />

      {/* === Site Cards === */}
      {(Object.keys(SITES) as SiteId[]).map(siteId => {
        const site = SITES[siteId]
        const pos = positions[siteId]
        const color = COLOR_MAP[site.colorKey] || C.accent
        return (
          <SiteCard
            key={siteId}
            x={pos.x} y={pos.y} w={pos.w} h={pos.h}
            site={site} color={color}
            onClick={() => onSelectSite(siteId)}
          />
        )
      })}

      {/* === Legend === */}
      <rect x={60} y={svgH - 70} width={svgW - 120} height={50} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
      <text x={80} y={svgH - 45} fontSize={10} fontWeight={600} fill={C.textDim} fontFamily="'JetBrains Mono'">LEGEND</text>
      {[
        { color: C.cyan10g, label: 'Lab LAN', x: 160 },
        { color: C.coloGreen, label: 'Colo', x: 280 },
        { color: C.webPurple, label: 'Cloud / Prod', x: 370 },
        { color: C.blue, label: 'Remote Dev', x: 510 },
        { color: C.red, label: 'VPN / WAN', x: 640 },
        { color: C.green100g, label: 'Online', x: 770 },
        { color: C.warning, label: 'Building', x: 870 },
        { color: C.orange, label: 'Coming Soon', x: 970 },
      ].map(item => (
        <g key={item.label}>
          <rect x={item.x} y={svgH - 52} width={10} height={10} rx={2} fill={item.color} />
          <text x={item.x + 15} y={svgH - 43} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{item.label}</text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Site Detail Views (Level 2) ────────────────────────── */

interface SiteDetailProps {
  siteId: SiteId
  activeModal: string | null
  openModal: (id: string) => void
}

function BocaLabDetail({ activeModal, openModal }: SiteDetailProps) {
  const svgW = 1200, svgH = 1050
  const c = (nid: string, x: number, y: number, w: number, h: number, specs: string[]) =>
    card(nid, x, y, w, h, specs, activeModal, openModal)

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 900 }}>
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
      {c('ironman', 300, 110, 600, 170, [
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
        color={C.textDim} ports={52} activeCount={12} totalCount={16}
        selected={activeModal === 'gs752tpv2'} onClick={() => openModal('gs752tpv2')} />

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

      {c('ironpatriot', 60, 555, 355, 135, [
        'CPU: Intel Ultra 9 285K',
        'RAM: 128GB DDR5',
        'GPU: RTX PRO 6000 Ada 96GB',
        'SSD: 4TB Gen5 + 2×4TB',
        'NIC1: 2.5GbE → MS510  •  NIC2: CX-5 → SN2100',
        '10.2.10.71 • TS: 100.75.25.51',
      ])}
      {c('jericho', 445, 555, 355, 135, [
        'CPU: Intel Ultra 9 285K',
        'RAM: 128GB DDR5',
        'GPU: RTX PRO 6000 Ada 96GB',
        'SSD: 4TB Gen5 + 2×4TB',
        'NIC1: 2.5GbE → MS510  •  NIC2: CX-5 → SN2100',
        '10.2.10.35 • TS: 100.85.6.71',
      ])}
      {c('sentinel', 830, 555, 330, 135, [
        'CPU: AMD Ryzen 9 9950X3D 16C/32T',
        'RAM: 192GB DDR5',
        'GPU: RTX 5090 32GB',
        'SSD: 4TB + 3TB (6.4TB total)',
        'NIC: Realtek 2.5GbE → MS510TXUP',
        '10.2.10.70 • TS: 100.98.251.57',
      ])}

      {/* === ER4 VPN Gateway === */}
      <text x={svgW / 2} y={720} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={2}>
        GATEWAY & EDGE
      </text>
      <ConnectionLine x1={560} y1={480} x2={350} y2={738} color={C.red} dashed />
      <SpeedBadge x={440} y={710} label="ER4 VPN" color={C.red} />
      <rect x={200} y={738} width={300} height={50} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
      <text x={220} y={760} fontSize={9} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">ER4 Gateway</text>
      <text x={220} y={775} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">MS510 Port 2 • VPN → WAR-MACHINE & Remote</text>

      {/* GS752TPv2 → WAN */}
      <ConnectionLine x1={985} y1={480} x2={750} y2={738} color={C.red} dashed />
      <SpeedBadge x={880} y={710} label="GS752 → WAN" color={C.red} />
      <rect x={600} y={738} width={300} height={50} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
      <text x={620} y={760} fontSize={9} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">WAN / Internet</text>
      <text x={620} y={775} fontSize={8} fill={C.textDim} fontFamily="'JetBrains Mono'">GS752TPv2 uplink • Tailscale Mesh • Parsec</text>

      {/* === Speed Comparison === */}
      <rect x={60} y={820} width={500} height={110} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
      <text x={80} y={845} fontSize={11} fontWeight={700} fill={C.textBright} fontFamily="'JetBrains Mono'">SPEED COMPARISON</text>
      <rect x={80} y={855} width={100} height={12} rx={2} fill={C.textDim + '30'} />
      <rect x={80} y={855} width={10} height={12} rx={2} fill={C.textDim} />
      <text x={195} y={865} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">Old LAN 1GbE ~125 MB/s</text>
      <rect x={80} y={878} width={100} height={12} rx={2} fill={C.cyan10g + '60'} />
      <text x={195} y={888} fontSize={9} fill={C.cyan10g} fontFamily="'JetBrains Mono'">New LAN 10G/2.5G ~1.25 GB/s (10×)</text>
      <rect x={80} y={901} width={450} height={12} rx={2} fill={C.green100g + '40'} />
      <text x={195} y={911} fontSize={9} fill={C.green100g} fontFamily="'JetBrains Mono'">AI Fabric 100GbE ~12.5 GB/s (100×)</text>

      {/* === Remote Access === */}
      <rect x={600} y={820} width={540} height={110} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
      <text x={620} y={845} fontSize={11} fontWeight={700} fill={C.textBright} fontFamily="'JetBrains Mono'">REMOTE ACCESS</text>
      <text x={620} y={867} fontSize={9} fill={C.accent} fontFamily="'JetBrains Mono'">● Parsec — GPU-accelerated remote desktop</text>
      <text x={620} y={886} fontSize={9} fill={C.purple} fontFamily="'JetBrains Mono'">● Barrier KVM — shared keyboard/mouse across nodes</text>
      <text x={620} y={905} fontSize={9} fill={C.warning} fontFamily="'JetBrains Mono'">● WinRM Mesh — remote PowerShell admin (all nodes)</text>
      <text x={620} y={924} fontSize={9} fill={C.red} fontFamily="'JetBrains Mono'">● Tailscale — encrypted overlay VPN (100.x.x.x)</text>

      {/* === Legend === */}
      <rect x={60} y={955} width={1080} height={55} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
      <text x={80} y={975} fontSize={10} fontWeight={600} fill={C.textDim} fontFamily="'JetBrains Mono'">LEGEND</text>
      {[
        { color: C.warning, label: 'Flagship', x: 160 },
        { color: C.purple, label: 'Dual-Homed Compute', x: 280 },
        { color: C.pink, label: 'Daily Driver', x: 470 },
        { color: C.green100g, label: '100GbE AI Fabric', x: 160, y: 995 },
        { color: C.cyan10g, label: '10G/2.5G LAN', x: 340, y: 995 },
        { color: C.accent, label: 'Display / DP 2.1', x: 510, y: 995 },
        { color: C.red, label: 'WAN / VPN', x: 680, y: 995 },
        { color: C.textDim, label: 'PoE Edge', x: 820, y: 995 },
      ].map(item => (
        <g key={item.label}>
          <rect x={item.x} y={(item.y || 967) - 3} width={10} height={10} rx={2} fill={item.color} />
          <text x={item.x + 15} y={item.y || 975} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{item.label}</text>
        </g>
      ))}
    </svg>
  )
}

function BocaColoDetail({ activeModal, openModal }: SiteDetailProps) {
  const svgW = 1200, svgH = 420
  const c = (nid: string, x: number, y: number, w: number, h: number, specs: string[]) =>
    card(nid, x, y, w, h, specs, activeModal, openModal)

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 700 }}>
      <text x={svgW / 2} y={25} textAnchor="middle" fontSize={10} fill={C.textDim} fontFamily="'JetBrains Mono'" letterSpacing={2}>
        REVELEX COLO — 6405 CONGRESS AVE, BOCA RATON FL
      </text>

      {/* VPN cloud entry */}
      <rect x={svgW / 2 - 120} y={40} width={240} height={40} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
      <text x={svgW / 2} y={65} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">Colo /26 Subnet • VPN Gateway</text>

      <ConnectionLine x1={svgW / 2 - 200} y1={80} x2={200} y2={140} color={C.coloGreen} dashed />
      <ConnectionLine x1={svgW / 2} y1={80} x2={svgW / 2} y2={140} color={C.coloGreen} dashed />
      <ConnectionLine x1={svgW / 2 + 200} y1={80} x2={svgW - 200} y2={140} color={C.coloGreen} dashed />

      {c('jarvis', 60, 140, 350, 140, [
        'Dell R760xa • Boca Raton Colo',
        'GPU: 4× NVIDIA L40S 48GB (192GB Total VRAM)',
        'Ollama :11434 (SSH tunnel only)',
        'SSH: .25 (ai-tool-hb) / .26 (yourcoa)',
        'iDRAC: .23 — out-of-band mgmt',
        'Jose Almodovar (x235) for .26 access',
      ])}
      {c('starkindustries', 430, 140, 340, 140, [
        'Boca Raton (Colo)',
        'Secondary Production Server',
        'Web / Database Stack',
        'Revelex /26 subnet',
        'Active',
      ])}
      {c('malibu', 790, 140, 340, 140, [
        'Boca Raton (Colo)',
        'Staging / Test Environment',
        'Web / Database Stack',
        'Revelex /26 subnet',
        'Active',
      ])}

      {/* Legend */}
      <rect x={60} y={340} width={1080} height={40} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
      {[
        { color: C.coloGreen, label: 'AI Server (JARVIS)', x: 80 },
        { color: C.webPurple, label: 'Production Servers', x: 300 },
        { color: C.red, label: 'VPN / WAN Access', x: 510 },
      ].map(item => (
        <g key={item.label}>
          <rect x={item.x} y={352} width={10} height={10} rx={2} fill={item.color} />
          <text x={item.x + 15} y={361} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{item.label}</text>
        </g>
      ))}
    </svg>
  )
}

function SimpleSiteDetail({ siteId, activeModal, openModal }: SiteDetailProps) {
  const site = SITES[siteId]
  const svgW = 800, svgH = 300
  const nodeId = site.nodeIds[0]
  const node = NODES[nodeId]
  if (!node) return null
  const color = COLOR_MAP[node.colorKey] || C.accent

  const specs: Record<string, string[]> = {
    'warmachine': [
      "CPU: AMD Ryzen 9 9950X • Jeremy's Machine",
      'RAM: 128GB DDR5 (arrives Mar 11)',
      'GPU: RTX 5080 16GB',
      'Remote via Edge4 VPN + Tailscale',
      'Ollama local + SSH tunnel to JARVIS colo',
    ],
    'happy': [
      'Home Desktop • E2E Test Runner',
      'NIC: 2.5GbE → MS510 • 10.2.10.112',
      'Playwright E2E • NSSM services',
      'Own Vertiv UPS (900W)',
      'TS: 100.87.48.124',
    ],
    'starktower': [
      'Atlanta (Cloud)',
      'Primary Production Server',
      'Web / Database Stack',
      'Active — STARK-TOWER primary',
    ],
  }

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 500 }}>
      {/* VPN cloud */}
      <rect x={svgW / 2 - 100} y={20} width={200} height={35} rx={6} fill={C.panel} stroke={C.red + '60'} strokeWidth={1} />
      <text x={svgW / 2} y={42} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.red} fontFamily="'JetBrains Mono'">VPN / Tailscale Mesh</text>
      <ConnectionLine x1={svgW / 2} y1={55} x2={svgW / 2} y2={90} color={C.red} dashed />

      {card(nodeId, svgW / 2 - 200, 90, 400, 130, specs[nodeId] || node.hardware, activeModal, openModal)}

      <rect x={60} y={svgH - 50} width={svgW - 120} height={35} rx={8} fill={C.panel} stroke={C.border} strokeWidth={1} />
      <rect x={80} y={svgH - 40} width={10} height={10} rx={2} fill={color} />
      <text x={95} y={svgH - 31} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{node.name} — {node.role}</text>
    </svg>
  )
}

/* ─── Main PhysicalView ──────────────────────────────────── */

export function PhysicalView() {
  const [activeSite, setActiveSite] = useState<SiteId | null>(null)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (id: string) => setActiveModal(id)
  const closeModal = () => setActiveModal(null)

  const detailProps: SiteDetailProps = {
    siteId: activeSite!,
    activeModal,
    openModal,
  }

  return (
    <div className="space-y-4">
      {/* Back button when in site detail */}
      {activeSite && (
        <button
          onClick={() => setActiveSite(null)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs rounded border transition-all cursor-pointer"
          style={{
            color: C.accent,
            borderColor: C.accent + '40',
            background: C.accent + '08',
          }}
        >
          <span>←</span>
          <span>All Sites</span>
          <span style={{ color: C.textDim }}>/ {SITES[activeSite].label}</span>
        </button>
      )}

      <div className="overflow-x-auto">
        {/* Level 1: Cloud Overview */}
        {!activeSite && <CloudOverview onSelectSite={setActiveSite} />}

        {/* Level 2: Site Detail */}
        {activeSite === 'boca-lab' && <BocaLabDetail {...detailProps} />}
        {activeSite === 'boca-colo' && <BocaColoDetail {...detailProps} />}
        {activeSite === 'atlanta' && <SimpleSiteDetail {...detailProps} />}
        {activeSite === 'remote-wm' && <SimpleSiteDetail {...detailProps} />}
        {activeSite === 'remote-happy' && <SimpleSiteDetail {...detailProps} />}
      </div>

      {/* Modal */}
      {activeModal && NODES[activeModal] && (
        <NodeModal node={NODES[activeModal]} onClose={closeModal} />
      )}
    </div>
  )
}
