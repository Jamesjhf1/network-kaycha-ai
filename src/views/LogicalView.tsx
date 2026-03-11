import { useState } from 'react'
import { NODES } from '../data/nodes'
import { NodeModal } from '../components/NodeModal'
import { C } from '../constants/colors'

function Section({ title, color, children, className = '', nodeId, onNodeClick }: {
  title: string; color: string; children: React.ReactNode; className?: string
  nodeId?: string; onNodeClick?: (id: string) => void
}) {
  const clickable = nodeId && onNodeClick
  return (
    <div className={`rounded-lg border p-4 ${className}`} style={{ borderColor: color + '40', background: C.panel }}>
      <div
        className={`flex items-center gap-2 mb-3 ${clickable ? 'cursor-pointer group' : ''}`}
        onClick={clickable ? () => onNodeClick(nodeId) : undefined}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color }}
        >
          {title}
        </span>
        {clickable && (
          <span
            className="ml-auto text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color, background: color + '20', border: `1px solid ${color}30` }}
          >
            details ›
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function ServiceCard({ name, details, color }: { name: string; details: string[]; color: string }) {
  return (
    <div className="rounded border p-3 mb-2" style={{ borderColor: C.border, background: C.bg }}>
      <div className="text-xs font-semibold mb-1" style={{ color }}>{name}</div>
      {details.map((d, i) => (
        <div key={i} className="text-[10px] leading-relaxed" style={{ color: C.textDim }}>{d}</div>
      ))}
    </div>
  )
}

export function LogicalView() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const openModal = (id: string) => setActiveModal(id)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* LEFT: VLAN 10 - AI Fabric */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <div className="w-3 h-3 rounded-full" style={{ background: C.green100g }} />
            <span className="text-sm font-bold tracking-wider" style={{ color: C.green100g }}>VLAN 10 — 100GbE AI FABRIC</span>
          </div>
          <div className="text-[10px] px-2 -mt-1" style={{ color: C.textDim }}>SN2100 • ConnectX-5 VPI • RoCEv2 RDMA • 10.0.100.0/24</div>

          <Section title="IRONMAN — Primary Compute" color={C.warning} nodeId="ironman" onNodeClick={openModal}>
            <ServiceCard name="Open WebUI :3000 (Primary)" color={C.warning} details={[
              'Hosts main Open WebUI instance',
              'Multi-endpoint config → all 3 Ollama nodes',
            ]} />
            <ServiceCard name="Ollama :11434" color={C.warning} details={[
              'Qwen3.5-122B-A10B Q8 primary / Qwen3.5-35B-A3B fast lane',
              '192GB VRAM (2× RTX PRO 6000 Blackwell, NVLink)',
              'ConnectX-5 100GbE • 10.0.100.10',
            ]} />
            <ServiceCard name="Parsec Host" color={C.accent} details={[
              'GPU-accelerated remote desktop',
              'Near-native latency via RDMA fabric',
            ]} />
          </Section>

          <Section title="IRON-PATRIOT — Worker Node" color={C.purple} nodeId="ironpatriot" onNodeClick={openModal}>
            <ServiceCard name="Ollama Worker :11434" color={C.purple} details={[
              'Qwen3 32B / CodeLlama 34B',
              '96GB VRAM (RTX PRO 6000 Ada)',
              'ConnectX-5 100GbE • 10.0.100.20',
            ]} />
            <ServiceCard name="Grafana :3000 + Prometheus :9090" color={C.purple} details={[
              'AI fleet monitoring dashboards (Docker)',
              'WinRM-based cross-machine metrics scraping',
            ]} />
            <ServiceCard name="jarvis-rag :3100" color={C.purple} details={[
              'RAG MCP server — rag_search, rag_context, rag_collections',
            ]} />
          </Section>

          <Section title="JERICHO — Worker Node" color={C.purple} nodeId="jericho" onNodeClick={openModal}>
            <ServiceCard name="Docker Host + Ollama Worker :11434" color={C.purple} details={[
              'Open WebUI / JARVIS-OPS containers',
              'Qwen3 32B / Mistral / embed models',
              '96GB VRAM (RTX PRO 6000 Ada)',
              'ConnectX-5 100GbE • 10.0.100.30',
              'Auto-start configured',
            ]} />
          </Section>

          <Section title="SN2100 Switch" color={C.green100g}>
            <div className="text-[10px]" style={{ color: C.textDim }}>
              <p>16× QSFP28 ports • 3.2 Tb/s switching capacity</p>
              <p className="mt-1">3 active ports → Ironman, Iron-Patriot, Jericho</p>
              <p className="mt-1 font-semibold" style={{ color: C.green100g }}>RoCEv2 enabled — zero-copy RDMA for model weights</p>
            </div>
          </Section>

          <Section title="Open WebUI Multi-Endpoint Config" color={C.accent}>
            <div className="space-y-1 text-[10px]" style={{ color: C.textDim }}>
              <p><span style={{ color: C.warning }}>●</span> Ironman: http://10.0.100.10:11434 (primary)</p>
              <p><span style={{ color: C.purple }}>●</span> Iron-Patriot: http://10.0.100.20:11434 (worker)</p>
              <p><span style={{ color: C.purple }}>●</span> Jericho: http://10.0.100.30:11434 (worker)</p>
              <p className="mt-2 font-semibold" style={{ color: C.accent }}>Load balancing across 384GB VRAM fabric (+ 32GB Sentinel)</p>
            </div>
          </Section>

          <Section title="Dev Tools" color={C.accent}>
            <div className="grid grid-cols-2 gap-1 text-[10px]" style={{ color: C.textDim }}>
              {['Cursor IDE', 'Claude Desktop + MCPs', 'Open WebUI', 'bolt.diy', 'VS Code', 'Claude Code CLI', 'mcpo :8001', 'Docker Desktop'].map(t => (
                <div key={t} className="flex items-center gap-1">
                  <span style={{ color: C.accent }}>▸</span> {t}
                </div>
              ))}
            </div>
          </Section>

          <Section title="WinRM Mesh" color={C.warning}>
            <div className="text-[10px]" style={{ color: C.textDim }}>
              <p>Credentials: stored in 1Password • Basic Auth</p>
              <p className="mt-1">PowerShell remoting across all nodes</p>
              <p className="mt-1">SENTINEL .70 • IRON-PATRIOT .71 • JERICHO .35 • HAPPY .112</p>
            </div>
          </Section>
        </div>

        {/* RIGHT: VLAN 20 - General LAN */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <div className="w-3 h-3 rounded-full" style={{ background: C.cyan10g }} />
            <span className="text-sm font-bold tracking-wider" style={{ color: C.cyan10g }}>VLAN 20 — GENERAL LAN</span>
          </div>
          <div className="text-[10px] px-2 -mt-1" style={{ color: C.textDim }}>MS510TXUP 10G/2.5G → GS752TPv2 PoE Edge • 10.2.10.0/24</div>

          <Section title="SENTINEL — Daily Driver" color={C.pink} nodeId="sentinel" onNodeClick={openModal}>
            <ServiceCard name="AI Workstation" color={C.pink} details={[
              'RTX 5090 32GB VRAM',
              '192GB DDR5 RAM • AMD Ryzen 9 9950X3D 16C/32T',
              'Ollama :11434 — Qwen3.5-35B-A3B daily driver (~149 tok/s)',
              'Open WebUI :3000 (Docker) • mcpo :8001 (11 MCPs)',
              'Realtek 2.5GbE → MS510TXUP • TS: 100.98.251.57',
            ]} />
          </Section>

          <Section title="WAR-MACHINE — Jeremy (Remote)" color={C.blue} nodeId="warmachine" onNodeClick={openModal}>
            <ServiceCard name="Remote Dev Workstation" color={C.blue} details={[
              'AMD Ryzen 9 9950X • RTX 5080 16GB',
              '128GB DDR5 (RAM arriving Mar 11)',
              'Ollama :11434 + JARVIS colo inference access',
              'Edge4 VPN → ER4 Gateway (MS510 Port 2)',
            ]} />
          </Section>

          <Section title="HAPPY — Test Runner" color={C.textDim} nodeId="happy" onNodeClick={openModal}>
            <ServiceCard name="E2E Test Services" color={C.textDim} details={[
              'Playwright JS — workers:1',
              'CRM 15/16 • Exec auth broken • HR pending',
              '10.2.10.112 • TS: 100.87.48.124',
            ]} />
          </Section>

          <Section title="Cloud & Remote Services" color={C.red}>
            <div className="grid grid-cols-2 gap-2">
              <ServiceCard name="Supabase" color={C.green100g} details={['11 projects', 'PostgreSQL + Edge Functions', 'Auth + Realtime']} />
              <ServiceCard name="Cloudflare" color={C.warning} details={['12 zones', 'Workers + D1', 'DNS + CDN']} />
              <ServiceCard name="Netlify" color={C.cyan10g} details={['6 sites', 'Serverless Functions', 'CI/CD deploys']} />
              <ServiceCard name="GitHub" color={C.textBright} details={['Kaycha-Labs org', 'Jamesjhf1 personal', 'Actions CI + DocGen']} />
              <ServiceCard name="JARVIS Colo" color={C.purple} details={['Dell R760xa', 'Revelex Boca Raton', '4× L40S 48GB (192GB VRAM)']} />
            </div>
          </Section>

          {/* VRAM Budget */}
          <Section title="VRAM Budget" color={C.warning}>
            <div className="space-y-2">
              {[
                { name: 'IRONMAN', vram: 192, color: C.warning, net: '100GbE' },
                { name: 'IRON-PATRIOT', vram: 96, color: C.purple, net: '100GbE' },
                { name: 'JERICHO', vram: 96, color: C.purple, net: '100GbE' },
                { name: 'SENTINEL', vram: 32, color: C.pink, net: '2.5GbE' },
                { name: 'JARVIS (colo)', vram: 192, color: '#10b981', net: 'VPN' },
              ].map(m => (
                <div key={m.name} className="flex items-center gap-2">
                  <span className="text-[10px] w-20 font-semibold" style={{ color: m.color }}>{m.name}</span>
                  <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: C.border }}>
                    <div className="h-full rounded" style={{ width: `${(m.vram / 192) * 100}%`, background: m.color + '80' }} />
                  </div>
                  <span className="text-[10px] w-12 text-right" style={{ color: C.textDim }}>{m.vram}GB</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded" style={{
                    color: m.net === '100GbE' ? C.green100g : m.net === 'VPN' ? C.red : C.cyan10g,
                    background: (m.net === '100GbE' ? C.green100g : m.net === 'VPN' ? C.red : C.cyan10g) + '15',
                  }}>{m.net}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: C.border }}>
                <span className="text-[10px] font-bold" style={{ color: C.warning }}>LOCAL FLEET TOTAL</span>
                <span className="text-xs font-bold" style={{ color: C.warning }}>416GB VRAM</span>
              </div>
              <div className="text-[10px]" style={{ color: C.green100g }}>
                384GB on 100GbE fabric • 32GB on 2.5GbE LAN • +192GB colo via VPN
              </div>
            </div>
          </Section>

          <Section title="PoE Edge — GS752TPv2" color={C.textDim}>
            <div className="text-[10px]" style={{ color: C.textDim }}>
              <p>48× 1GbE PoE+ ports + 4× SFP</p>
              <p className="mt-1">Cascaded via 1G SFP from MS510TXUP</p>
              <p className="mt-1">Devices: APs, cameras, IoT, smart lab equipment</p>
            </div>
          </Section>
        </div>
      </div>

      {/* Modal */}
      {activeModal && NODES[activeModal] && (
        <NodeModal node={NODES[activeModal]} onClose={closeModal} />
      )}
    </>
  )
}
