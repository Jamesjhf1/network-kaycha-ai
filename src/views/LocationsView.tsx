import { useState } from 'react'
import { locations, C, getSeedStatusColor, getSeedStatusLabel } from '../data/locationData'
import type { KaychaLocation } from '../data/locationData'
import { LocationModal } from '../components/LocationModal'

function StatusDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 8, height: 8, borderRadius: '50%', backgroundColor: color,
        display: 'inline-block', boxShadow: `0 0 6px ${color}80`,
      }}
    />
  )
}

function SiteCard({ loc, onClick }: { loc: KaychaLocation; onClick: () => void }) {
  const seedColor = getSeedStatusColor(loc.backup.seedStatus)
  const seedLabel = getSeedStatusLabel(loc.backup.seedStatus)
  const isHQ = loc.siteType === 'hq'

  return (
    <div
      onClick={onClick}
      className="transition-all duration-200 hover:scale-[1.03] hover:z-10"
      style={{
        background: C.panel,
        border: `1px solid ${isHQ ? C.accent + '60' : C.border}`,
        borderRadius: 8,
        padding: '10px 14px',
        cursor: 'pointer',
        boxShadow: isHQ ? `0 0 20px ${C.accent}15` : undefined,
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: isHQ ? C.accent : C.textBright }}>
            {loc.code}
          </span>
          {isHQ && (
            <span style={{
              fontSize: 8, fontWeight: 600, color: C.accent,
              background: C.accent + '15', padding: '1px 5px', borderRadius: 3,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              HQ
            </span>
          )}
        </div>
        <StatusDot color={seedColor} />
      </div>

      {/* City */}
      <div style={{ fontSize: 9, color: C.textDim, marginBottom: 6 }}>
        {loc.city}, {loc.state}
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 8, fontSize: 9 }}>
        <div>
          <span style={{ color: C.textDim }}>PCs </span>
          <span style={{ color: C.cyan10g, fontWeight: 600 }}>{loc.inventory.pcCount}</span>
        </div>
        <div>
          <span style={{ color: C.textDim }}>Inst </span>
          <span style={{ color: C.purple, fontWeight: 600 }}>{loc.inventory.instrumentCount}</span>
        </div>
        <div>
          <span style={{ color: C.textDim }}>UPS </span>
          <span style={{ color: C.warning, fontWeight: 600 }}>{loc.inventory.upsCount}</span>
        </div>
      </div>

      {/* Backup Status */}
      <div style={{
        marginTop: 6, fontSize: 8, fontWeight: 600,
        color: seedColor, textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {seedLabel}
        {loc.backup.bandwidthMbps > 0 && (
          <span style={{ color: C.textDim, fontWeight: 400 }}>
            {' '}@ {loc.backup.bandwidthMbps}Mbps
          </span>
        )}
      </div>

      {/* ISP */}
      <div style={{ fontSize: 8, color: C.textDim, marginTop: 2 }}>
        {loc.isp.downloadMbps}/{loc.isp.uploadMbps} Mbps {loc.isp.connectionType}
      </div>
    </div>
  )
}

function NetworkTotals() {
  const totalPCs = locations.reduce((s, l) => s + l.inventory.pcCount, 0)
  const totalInstruments = locations.reduce((s, l) => s + l.inventory.instrumentCount, 0)
  const totalUPS = locations.reduce((s, l) => s + l.inventory.upsCount, 0)
  const totalDataTb = locations.reduce((s, l) => s + l.backup.dataEstimateTb, 0)
  const liveSites = locations.filter(l => l.backup.seedStatus === 'incremental').length
  const totalSites = locations.length

  const stats = [
    { label: 'Sites', value: `${totalSites}`, color: C.accent },
    { label: 'Total PCs', value: `${totalPCs}`, color: C.cyan10g },
    { label: 'Instruments', value: `${totalInstruments}`, color: C.purple },
    { label: 'UPS Units', value: `${totalUPS}`, color: C.warning },
    { label: 'Backup Data', value: `${totalDataTb.toFixed(0)} TB`, color: C.green100g },
    { label: 'Live Backups', value: `${liveSites}/${totalSites}`, color: C.emerald },
  ]

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8,
      marginBottom: 16,
    }}>
      {stats.map(s => (
        <div key={s.label} style={{
          background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
          padding: '8px 12px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 9, color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {s.label}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: s.color, marginTop: 2 }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function Legend() {
  const items = [
    { label: 'Live Incremental', color: C.emerald },
    { label: 'Imported / Ready', color: C.cyan10g },
    { label: 'Drives In Transit', color: C.amber },
    { label: 'Seed Pending', color: C.red },
  ]
  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
      padding: '10px 14px',
    }}>
      <div style={{ fontSize: 8, color: C.textDim, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.08em' }}>
        Backup Status Legend
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {items.map(i => (
          <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <StatusDot color={i.color} />
            <span style={{ fontSize: 9, color: C.textBright }}>{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LocationsView() {
  const [selectedLocation, setSelectedLocation] = useState<KaychaLocation | null>(null)

  // HQ first, then remote sites alphabetically by code
  const hq = locations.find(l => l.siteType === 'hq')!
  const remoteSites = locations
    .filter(l => l.siteType !== 'hq')
    .sort((a, b) => a.code.localeCompare(b.code))

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textBright, letterSpacing: '0.1em' }}>
          KAYCHA LABS — NATIONAL FOOTPRINT
        </h2>
        <p style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>
          9 lab locations + corporate HQ — click any site for details
        </p>
      </div>

      {/* Network Totals */}
      <NetworkTotals />

      {/* Network Diagram: HQ at top center, remote sites in grid below */}
      <div style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: 24,
        position: 'relative',
      }}>
        {/* Subtle grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, borderRadius: 8,
          backgroundImage: `
            linear-gradient(${C.textDim} 1px, transparent 1px),
            linear-gradient(90deg, ${C.textDim} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        {/* HQ Node — centered at top */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8, position: 'relative', zIndex: 2 }}>
          <div style={{ width: 280 }}>
            <SiteCard loc={hq} onClick={() => setSelectedLocation(hq)} />
          </div>
        </div>

        {/* Connection label */}
        <div style={{
          textAlign: 'center', fontSize: 9, color: C.accent, fontWeight: 600,
          marginBottom: 8, letterSpacing: '0.1em', position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <div style={{ width: 80, height: 1, background: C.accent + '30' }} />
          <span>NAKIVO VPN BACKHAUL → ER4 → QNAP @ HQ</span>
          <div style={{ width: 80, height: 1, background: C.accent + '30' }} />
        </div>

        {/* Connection lines from HQ down to each remote site */}
        <svg style={{
          position: 'absolute', left: 0, top: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 1,
        }}>
          {remoteSites.map((loc, i) => {
            const seedColor = getSeedStatusColor(loc.backup.seedStatus)
            // HQ center point
            const hqX = 50
            const hqY = 14 // approximate % where HQ card bottom is
            // Remote site center points — 8 cards in a row
            const cols = 8
            const cardX = ((i + 0.5) / cols) * 100
            const cardY = 42 // approximate % where remote cards top is
            return (
              <line
                key={loc.id}
                x1={`${hqX}%`} y1={`${hqY}%`}
                x2={`${cardX}%`} y2={`${cardY}%`}
                stroke={seedColor}
                strokeWidth={1.5}
                strokeDasharray={loc.backup.seedStatus === 'incremental' ? 'none' : '6 4'}
                opacity={0.35}
              />
            )
          })}
        </svg>

        {/* Remote Sites Grid — alphabetical, single row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
          position: 'relative',
          zIndex: 2,
        }}>
          {remoteSites.map(loc => (
            <SiteCard
              key={loc.id}
              loc={loc}
              onClick={() => setSelectedLocation(loc)}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 16, position: 'relative', zIndex: 2 }}>
          <Legend />
        </div>
      </div>

      {/* Modal */}
      {selectedLocation && (
        <LocationModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  )
}
