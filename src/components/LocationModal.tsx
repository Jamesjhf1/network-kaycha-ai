import { useState } from 'react'
import { C, getSeedStatusColor, getSeedStatusLabel } from '../data/locationData'
import type { KaychaLocation } from '../data/locationData'

type ModalTab = 'overview' | 'network' | 'backup' | 'inventory' | 'power'

const modalTabs: { id: ModalTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'network', label: 'Network' },
  { id: 'backup', label: 'Backup' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'power', label: 'Power' },
]

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 10, color: C.textDim }}>{label}</span>
      <span style={{ fontSize: 10, fontWeight: 600, color: color || C.textBright }}>{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: 9, fontWeight: 700, color: C.accent, textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: 8, paddingBottom: 4,
        borderBottom: `1px solid ${C.accent}30`,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function OverviewTab({ loc }: { loc: KaychaLocation }) {
  const seedColor = getSeedStatusColor(loc.backup.seedStatus)
  const seedLabel = getSeedStatusLabel(loc.backup.seedStatus)
  return (
    <div>
      <Section title="Site Information">
        <Row label="Name" value={loc.name} />
        <Row label="City" value={loc.city} />
        <Row label="State" value={loc.state} />
        <Row label="Type" value={loc.siteType.toUpperCase()} color={loc.siteType === 'hq' ? C.accent : C.textBright} />
      </Section>
      <Section title="Quick Stats">
        <Row label="PCs / Workstations" value={`${loc.inventory.pcCount}`} color={C.cyan10g} />
        <Row label="Instruments" value={`${loc.inventory.instrumentCount}`} color={C.purple} />
        <Row label="Servers" value={`${loc.inventory.serverCount}`} />
        <Row label="Switches" value={`${loc.inventory.switchCount}`} />
        <Row label="UPS Units" value={`${loc.inventory.upsCount}`} color={C.warning} />
        <Row label="Scanner Coverage" value={`${loc.inventory.scannerCoverage}%`}
          color={loc.inventory.scannerCoverage > 75 ? C.emerald : loc.inventory.scannerCoverage > 25 ? C.amber : C.red} />
      </Section>
      <Section title="Backup Status">
        <Row label="Status" value={seedLabel} color={seedColor} />
        <Row label="Data Estimate" value={`${loc.backup.dataEstimateTb} TB`} />
        <Row label="Last Backup" value={loc.backup.lastBackup
          ? new Date(loc.backup.lastBackup).toLocaleString()
          : 'Never'
        } color={loc.backup.lastBackup ? C.emerald : C.red} />
      </Section>
      <Section title="Contact">
        <Row label="Primary Contact" value={loc.contacts.primaryName} />
        <Row label="Email" value={loc.contacts.primaryEmail} />
        <Row label="Phone" value={loc.contacts.primaryPhone} />
      </Section>
    </div>
  )
}

function NetworkTab({ loc }: { loc: KaychaLocation }) {
  return (
    <div>
      <Section title="Router / Firewall">
        <Row label="Device" value={loc.network.router} />
        <Row label="Model" value={loc.network.routerModel} />
        <Row label="WAN IP" value={loc.network.wanIp} />
        <Row label="LAN Subnet" value={loc.network.lanSubnet} />
        <Row label="VLANs" value={`${loc.network.vlanCount}`} />
      </Section>
      <Section title="Switching">
        <Row label="Switches" value={loc.network.switches} />
        <Row label="Count" value={`${loc.network.switchCount}`} />
      </Section>
      <Section title="Wireless">
        <Row label="Access Points" value={loc.network.accessPoints} />
        <Row label="Count" value={`${loc.network.apCount}`} />
      </Section>
      <Section title="Remote Access">
        <Row label="VPN" value={loc.network.vpnEnabled ? 'Enabled' : 'Disabled'}
          color={loc.network.vpnEnabled ? C.emerald : C.red} />
        <Row label="Tailscale" value={loc.network.tailscaleEnabled ? 'Enabled' : 'Not deployed'}
          color={loc.network.tailscaleEnabled ? C.emerald : C.textDim} />
      </Section>
      <Section title="Internet Service">
        <Row label="Provider" value={loc.isp.provider} />
        <Row label="Type" value={loc.isp.connectionType} />
        <Row label="Download" value={`${loc.isp.downloadMbps} Mbps`} color={C.cyan10g} />
        <Row label="Upload" value={`${loc.isp.uploadMbps} Mbps`} color={C.green100g} />
        <Row label="Static IP" value={loc.isp.staticIp ? 'Yes' : 'No'}
          color={loc.isp.staticIp ? C.emerald : C.textDim} />
        <Row label="Circuit ID" value={loc.isp.circuitId} />
      </Section>
    </div>
  )
}

function BackupTab({ loc }: { loc: KaychaLocation }) {
  const seedColor = getSeedStatusColor(loc.backup.seedStatus)
  const seedLabel = getSeedStatusLabel(loc.backup.seedStatus)

  const phases = [
    { label: 'Local Backup', done: loc.backup.seedStatus !== 'pending' },
    { label: 'Ship Drives', done: ['shipped', 'imported', 'incremental'].includes(loc.backup.seedStatus) },
    { label: 'Import to QNAP', done: ['imported', 'incremental'].includes(loc.backup.seedStatus) },
    { label: 'WAN Incremental', done: loc.backup.seedStatus === 'incremental' },
  ]

  return (
    <div>
      <Section title="NAKIVO Agent">
        <Row label="Agent Status" value={loc.backup.agent.toUpperCase()}
          color={loc.backup.agent === 'nakivo' ? C.emerald : C.red} />
        <Row label="Backup Target" value={loc.backup.qnapTarget ? 'QNAP @ HQ' : 'None'}
          color={loc.backup.qnapTarget ? C.cyan10g : C.textDim} />
        <Row label="Seed Status" value={seedLabel} color={seedColor} />
        <Row label="Last Backup" value={loc.backup.lastBackup
          ? new Date(loc.backup.lastBackup).toLocaleString()
          : 'N/A'
        } color={loc.backup.lastBackup ? C.emerald : C.textDim} />
      </Section>
      <Section title="Bandwidth">
        <Row label="Allocation" value={loc.backup.bandwidthMbps > 0 ? `${loc.backup.bandwidthMbps} Mbps` : 'Local'}
          color={C.cyan10g} />
        <Row label="Window" value={loc.backup.backupWindow} />
        <Row label="Upload Speed (ISP)" value={`${loc.isp.uploadMbps} Mbps`} />
      </Section>
      <Section title="Scope">
        <Row label="PCs to Backup" value={`${loc.backup.pcCount}`} />
        <Row label="Data Estimate" value={`${loc.backup.dataEstimateTb} TB`} color={C.warning} />
        <Row label="Daily Delta (est)" value={`${(loc.backup.dataEstimateTb * 0.05).toFixed(1)} TB`} />
      </Section>
      <Section title="Seed Pipeline">
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {phases.map((p, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: 6, borderRadius: 3, marginBottom: 4,
                background: p.done ? C.emerald : C.border,
                boxShadow: p.done ? `0 0 6px ${C.emerald}40` : undefined,
              }} />
              <div style={{ fontSize: 7, color: p.done ? C.emerald : C.textDim, fontWeight: p.done ? 600 : 400 }}>
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function InventoryTab({ loc }: { loc: KaychaLocation }) {
  const assets = [
    { label: 'PCs / Workstations', count: loc.inventory.pcCount, color: C.cyan10g },
    { label: 'Analytical Instruments', count: loc.inventory.instrumentCount, color: C.purple },
    { label: 'Servers', count: loc.inventory.serverCount, color: C.green100g },
    { label: 'Network Switches', count: loc.inventory.switchCount, color: C.blue },
    { label: 'UPS Units', count: loc.inventory.upsCount, color: C.warning },
  ]
  const total = assets.reduce((s, a) => s + a.count, 0)

  return (
    <div>
      <Section title="Asset Summary">
        {assets.map(a => (
          <div key={a.label} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 10, color: C.textDim }}>{a.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: a.color }}>{a.count}</span>
            </div>
            <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
              <div style={{
                height: '100%', borderRadius: 2, background: a.color,
                width: `${total > 0 ? (a.count / total) * 100 : 0}%`,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        ))}
      </Section>
      <Section title="Scanner Coverage">
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{
            fontSize: 28, fontWeight: 700,
            color: loc.inventory.scannerCoverage > 75 ? C.emerald
              : loc.inventory.scannerCoverage > 25 ? C.amber : C.red,
          }}>
            {loc.inventory.scannerCoverage}%
          </div>
          <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>
            of machines scanned with KaychaScanner
          </div>
          <div style={{
            height: 6, background: C.border, borderRadius: 3, marginTop: 8,
          }}>
            <div style={{
              height: '100%', borderRadius: 3,
              background: loc.inventory.scannerCoverage > 75 ? C.emerald
                : loc.inventory.scannerCoverage > 25 ? C.amber : C.red,
              width: `${loc.inventory.scannerCoverage}%`,
            }} />
          </div>
        </div>
      </Section>
      <Section title="Total Assets">
        <Row label="Total tracked" value={`${total}`} color={C.accent} />
        <Row label="Needs scan" value={`${Math.round(loc.inventory.pcCount * (1 - loc.inventory.scannerCoverage / 100))}`}
          color={C.amber} />
      </Section>
    </div>
  )
}

function PowerTab({ loc }: { loc: KaychaLocation }) {
  return (
    <div>
      <Section title="UPS Infrastructure">
        <Row label="UPS Units" value={`${loc.power.upsCount}`} color={C.warning} />
        <Row label="Total Capacity" value={`${loc.power.totalCapacityVa.toLocaleString()} VA`} color={C.cyan10g} />
        <Row label="Protected Devices" value={`${loc.power.protectedDevices}`} />
      </Section>
      <Section title="Coverage">
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{ fontSize: 9, color: C.textDim, marginBottom: 4 }}>
            UPS protection ratio
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.warning }}>
            {loc.power.protectedDevices} / {loc.inventory.pcCount + loc.inventory.instrumentCount}
          </div>
          <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>
            devices protected / total devices
          </div>
          <div style={{
            height: 6, background: C.border, borderRadius: 3, marginTop: 8,
          }}>
            <div style={{
              height: '100%', borderRadius: 3, background: C.warning,
              width: `${Math.min(100, (loc.power.protectedDevices / (loc.inventory.pcCount + loc.inventory.instrumentCount)) * 100)}%`,
            }} />
          </div>
        </div>
      </Section>
    </div>
  )
}

export function LocationModal({ location, onClose }: { location: KaychaLocation; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<ModalTab>('overview')
  const isHQ = location.siteType === 'hq'

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.bg,
          border: `1px solid ${isHQ ? C.accent + '40' : C.border}`,
          borderRadius: 12,
          width: 480,
          maxHeight: '85vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: `0 24px 48px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px 12px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: isHQ ? C.accent : C.textBright }}>
                {location.code}
              </span>
              <span style={{ fontSize: 12, color: C.textDim }}>
                {location.city}, {location.state}
              </span>
              {isHQ && (
                <span style={{
                  fontSize: 8, fontWeight: 600, color: C.accent,
                  background: C.accent + '15', padding: '2px 6px', borderRadius: 3,
                }}>
                  HQ + LAB
                </span>
              )}
            </div>
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>
              {location.name}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: `1px solid ${C.border}`, borderRadius: 6,
              color: C.textDim, cursor: 'pointer', padding: '4px 8px', fontSize: 12,
            }}
          >
            ESC
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 2, padding: '8px 20px',
          borderBottom: `1px solid ${C.border}`,
        }}>
          {modalTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? C.accent + '15' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? C.accent + '30' : 'transparent'}`,
                borderRadius: 4, padding: '4px 10px', fontSize: 9,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? C.accent : C.textDim,
                cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
          {activeTab === 'overview' && <OverviewTab loc={location} />}
          {activeTab === 'network' && <NetworkTab loc={location} />}
          {activeTab === 'backup' && <BackupTab loc={location} />}
          {activeTab === 'inventory' && <InventoryTab loc={location} />}
          {activeTab === 'power' && <PowerTab loc={location} />}
        </div>
      </div>
    </div>
  )
}
