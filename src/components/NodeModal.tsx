import { NodeData } from '../data/nodes'
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

const APP_CATEGORY_ICONS: Record<string, string> = {
  ide: '⌨',
  ai: '◈',
  runtime: '⚙',
  devops: '⬡',
  monitoring: '◉',
  remote: '⇄',
  test: '▷',
}

const APP_CATEGORY_COLORS: Record<string, string> = {
  ide: C.accent,
  ai: C.green100g,
  runtime: C.warning,
  devops: C.cyan10g,
  monitoring: C.purple,
  remote: C.pink,
  test: C.blue,
}

const NET_COLOR_MAP: Record<string, string> = {
  fabric: C.green100g,
  lan: C.cyan10g,
  wan: C.red,
  tailscale: C.purple,
  display: C.accent,
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  online: { label: 'ONLINE', color: C.green100g },
  building: { label: 'BUILDING', color: C.warning },
  'coming-soon': { label: 'INCOMING', color: C.warning },
  staging: { label: 'STAGING', color: C.webPurple },
}

interface NodeModalProps {
  node: NodeData
  onClose: () => void
}

export function NodeModal({ node, onClose }: NodeModalProps) {
  const accentColor = COLOR_MAP[node.colorKey] || C.accent
  const status = STATUS_LABELS[node.status]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl"
        style={{
          background: C.bg,
          border: `1px solid ${accentColor}50`,
          boxShadow: `0 0 60px ${accentColor}20, 0 0 120px ${accentColor}10`,
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between px-6 py-4 rounded-t-xl"
          style={{ background: C.panel, borderBottom: `1px solid ${accentColor}30` }}
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold tracking-widest" style={{ color: accentColor }}>
                {node.name}
              </h2>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded tracking-widest"
                style={{ color: accentColor, background: accentColor + '20', border: `1px solid ${accentColor}40` }}
              >
                {node.badge}
              </span>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded tracking-wider"
                style={{ color: status.color, background: status.color + '15', border: `1px solid ${status.color}40` }}
              >
                ● {status.label}
              </span>
            </div>
            <p className="text-xs" style={{ color: C.textDim }}>{node.role}</p>
          </div>
          <button
            onClick={onClose}
            className="text-lg leading-none hover:opacity-70 transition-opacity mt-1"
            style={{ color: C.textDim }}
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Hardware */}
          <Section title="HARDWARE" icon="▣" color={accentColor}>
            <div className="grid grid-cols-1 gap-1">
              {node.hardware.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: accentColor + '80' }}>▸</span>
                  <span className="text-[11px] leading-relaxed" style={{ color: C.textBright }}>{h}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Vibe Coding Apps */}
          {node.apps.length > 0 && (
            <Section title="VIBE CODING APPS" icon="◈" color={C.green100g}>
              <div className="grid grid-cols-2 gap-2">
                {node.apps.map((app, i) => {
                  const catColor = APP_CATEGORY_COLORS[app.category]
                  const catIcon = APP_CATEGORY_ICONS[app.category]
                  return (
                    <div
                      key={i}
                      className="rounded-lg p-3"
                      style={{ background: catColor + '08', border: `1px solid ${catColor}25` }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs" style={{ color: catColor }}>{catIcon}</span>
                        <span className="text-[11px] font-semibold" style={{ color: C.textBright }}>{app.name}</span>
                        {app.port && (
                          <span
                            className="ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono"
                            style={{ color: catColor, background: catColor + '15' }}
                          >
                            :{app.port}
                          </span>
                        )}
                      </div>
                      {app.detail && (
                        <p className="text-[10px] leading-relaxed" style={{ color: C.textDim }}>{app.detail}</p>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Category legend */}
              <div className="flex flex-wrap gap-3 mt-3 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
                {Object.entries(APP_CATEGORY_ICONS).map(([cat, icon]) => (
                  <div key={cat} className="flex items-center gap-1">
                    <span className="text-[10px]" style={{ color: APP_CATEGORY_COLORS[cat] }}>{icon}</span>
                    <span className="text-[9px] capitalize" style={{ color: C.textDim }}>{cat}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Networking */}
          <Section title="NETWORK INTERFACES" icon="⇄" color={C.cyan10g}>
            <div className="space-y-2">
              {node.interfaces.map((iface, i) => {
                const netColor = NET_COLOR_MAP[iface.color]
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                    style={{ background: netColor + '08', border: `1px solid ${netColor}25` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: netColor, boxShadow: `0 0 6px ${netColor}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold" style={{ color: C.textBright }}>{iface.label}</span>
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded"
                          style={{ color: netColor, background: netColor + '15' }}
                        >
                          {iface.speed}
                        </span>
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: C.textDim }}>
                        → {iface.target}
                        {iface.ip && <span style={{ color: netColor }}> • {iface.ip}</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Net color legend */}
            <div className="flex flex-wrap gap-3 mt-3 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
              {Object.entries(NET_COLOR_MAP).map(([key, color]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  <span className="text-[9px] capitalize" style={{ color: C.textDim }}>{key}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Services */}
          {node.services.length > 0 && (
            <Section title="RUNNING SERVICES" icon="⚙" color={C.warning}>
              <div className="space-y-2">
                {node.services.map((svc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded px-3 py-2"
                    style={{ background: C.panel, border: `1px solid ${C.border}` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: C.warning, boxShadow: `0 0 4px ${C.warning}` }} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold" style={{ color: C.textBright }}>{svc.name}</span>
                        {svc.port && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                            style={{ color: C.warning, background: C.warning + '15' }}
                          >
                            :{svc.port}
                          </span>
                        )}
                      </div>
                      {svc.detail && (
                        <p className="text-[10px] leading-relaxed mt-0.5" style={{ color: C.textDim }}>{svc.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Port Map (switches) */}
          {node.ports && node.ports.length > 0 && (
            <Section title="PORT MAP" icon="⬡" color={accentColor}>
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead>
                    <tr>
                      {['Port', 'Speed', 'Device', 'Notes'].map((h) => (
                        <th
                          key={h}
                          className="text-[9px] font-bold tracking-widest uppercase px-3 py-2"
                          style={{ color: accentColor, borderBottom: `1px solid ${accentColor}30` }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {node.ports.map((p, i) => (
                      <tr
                        key={i}
                        style={{ background: i % 2 === 0 ? 'transparent' : `${accentColor}05` }}
                      >
                        <td className="text-[11px] font-mono font-semibold px-3 py-2" style={{ color: C.textBright }}>
                          {p.port}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                            style={{
                              color: p.speed.includes('100G') ? C.green100g : p.speed === '10G' ? C.accent : C.cyan10g,
                              background: (p.speed.includes('100G') ? C.green100g : p.speed === '10G' ? C.accent : C.cyan10g) + '15',
                            }}
                          >
                            {p.speed}
                          </span>
                        </td>
                        <td className="text-[11px] px-3 py-2" style={{ color: C.textBright }}>
                          {p.device}
                        </td>
                        <td className="text-[10px] px-3 py-2" style={{ color: C.textDim }}>
                          {p.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {/* Notes / Gotchas */}
          {node.notes && node.notes.length > 0 && (
            <Section title="⚠ NOTES / GOTCHAS" icon="⚠" color={C.red}>
              <div className="space-y-1.5">
                {node.notes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: C.red }}>!</span>
                    <span className="text-[10px] leading-relaxed" style={{ color: C.textDim }}>{note}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({
  title, icon, color, children,
}: {
  title: string; icon: string; color: string; children: React.ReactNode
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: C.panel, border: `1px solid ${color}25` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs" style={{ color }}>{icon}</span>
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color }}>{title}</span>
      </div>
      {children}
    </div>
  )
}
