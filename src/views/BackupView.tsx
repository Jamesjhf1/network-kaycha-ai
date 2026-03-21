import { locations, backupInfra, C, getSeedStatusColor, getSeedStatusLabel } from '../data/locationData'

function StatBox({ label, value, unit, color }: { label: string; value: string; unit?: string; color: string }) {
  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
      padding: '8px 12px', textAlign: 'center', flex: 1,
    }}>
      <div style={{ fontSize: 8, color: C.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color, marginTop: 2 }}>
        {value}
        {unit && <span style={{ fontSize: 10, fontWeight: 400, color: C.textDim }}> {unit}</span>}
      </div>
    </div>
  )
}

function InfraBox({ title, subtitle, color, children }: {
  title: string; subtitle: string; color: string; children: React.ReactNode
}) {
  return (
    <div style={{
      background: C.panel, border: `1px solid ${color}40`, borderRadius: 8,
      padding: 16, flex: 1, boxShadow: `0 0 16px ${color}10`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 8, height: 8, borderRadius: 2, background: color,
          boxShadow: `0 0 8px ${color}60`,
        }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color }}>{title}</div>
          <div style={{ fontSize: 8, color: C.textDim }}>{subtitle}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

function InfoRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
      <span style={{ fontSize: 9, color: C.textDim }}>{label}</span>
      <span style={{ fontSize: 9, fontWeight: 600, color: color || C.textBright }}>{value}</span>
    </div>
  )
}

function DriveBayViz() {
  const { driveCount, bays } = backupInfra.qnap
  return (
    <div style={{ display: 'flex', gap: 3, marginTop: 8, marginBottom: 4 }}>
      {Array.from({ length: bays }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 20, borderRadius: 2,
          background: i < driveCount ? C.emerald : C.border,
          opacity: i < driveCount ? 1 : 0.3,
          boxShadow: i < driveCount ? `0 0 4px ${C.emerald}40` : undefined,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 6, fontWeight: 700, color: i < driveCount ? C.bg : C.textDim }}>
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  )
}

function SiteBackupCard({ loc }: { loc: typeof locations[0] }) {
  const seedColor = getSeedStatusColor(loc.backup.seedStatus)
  const seedLabel = getSeedStatusLabel(loc.backup.seedStatus)
  const isHQ = loc.siteType === 'hq'

  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6,
      padding: '8px 10px', flex: 1, minWidth: 100,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: isHQ ? C.accent : C.textBright }}>
          {loc.code}
        </span>
        <span style={{
          fontSize: 7, fontWeight: 700, color: seedColor,
          background: seedColor + '15', padding: '1px 4px', borderRadius: 2,
          textTransform: 'uppercase',
        }}>
          {seedLabel}
        </span>
      </div>
      <div style={{ fontSize: 8, color: C.textDim, marginBottom: 4 }}>{loc.city}</div>

      {/* Stats */}
      <div style={{ fontSize: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: C.textDim }}>PCs</span>
          <span style={{ color: C.cyan10g, fontWeight: 600 }}>{loc.backup.pcCount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: C.textDim }}>Data</span>
          <span style={{ color: C.warning, fontWeight: 600 }}>{loc.backup.dataEstimateTb} TB</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: C.textDim }}>BW</span>
          <span style={{ color: C.green100g, fontWeight: 600 }}>
            {loc.backup.bandwidthMbps > 0 ? `${loc.backup.bandwidthMbps}M` : 'Local'}
          </span>
        </div>
        {loc.backup.lastBackup && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <span style={{ color: C.textDim }}>Last</span>
            <span style={{ color: C.emerald, fontWeight: 600, fontSize: 7 }}>
              {new Date(loc.backup.lastBackup).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function BandwidthPanel() {
  const { er4 } = backupInfra
  const remoteSites = locations.filter(l => l.siteType !== 'hq')
  const totalAllocated = remoteSites.reduce((s, l) => s + l.backup.bandwidthMbps, 0)
  const utilizationPct = (totalAllocated / er4.nakivoMaxMbps) * 100

  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: 16,
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, color: C.cyan10g, textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: 12,
      }}>
        Bandwidth Budget
      </div>

      <InfoRow label="WAN Total" value={`${er4.wanSpeedMbps} Mbps`} color={C.textBright} />
      <InfoRow label="NAKIVO Max" value={`${er4.nakivoMaxMbps} Mbps`} color={C.cyan10g} />
      <InfoRow label="Reserved (business)" value={`${er4.wanSpeedMbps - er4.nakivoMaxMbps} Mbps`} color={C.emerald} />

      <div style={{ margin: '8px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontSize: 8, color: C.textDim }}>Daytime allocation</span>
          <span style={{ fontSize: 8, color: C.cyan10g, fontWeight: 600 }}>
            {totalAllocated}/{er4.nakivoMaxMbps} Mbps
          </span>
        </div>
        <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
          <div style={{
            height: '100%', borderRadius: 3,
            background: utilizationPct > 90 ? C.red : utilizationPct > 70 ? C.amber : C.cyan10g,
            width: `${Math.min(100, utilizationPct)}%`,
          }} />
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 8 }}>
        <InfoRow label="Business Hours" value={er4.businessHoursThrottle} color={C.amber} />
        <InfoRow label="After Hours" value={er4.afterHoursThrottle} color={C.emerald} />
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 8 }}>
        <div style={{ fontSize: 8, color: C.textDim, marginBottom: 4 }}>Per-site allocation (daytime)</div>
        {remoteSites.map(l => (
          <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
            <span style={{ fontSize: 8, color: C.textDim }}>{l.code} ({l.city})</span>
            <span style={{ fontSize: 8, fontWeight: 600, color: C.cyan10g }}>
              {l.backup.bandwidthMbps > 0 ? `${l.backup.bandwidthMbps} Mbps` : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeedTimeline() {
  const phases = ['Local Backup', 'Ship Drives to HQ', 'Import to QNAP', 'WAN Incremental']
  const remoteSites = locations.filter(l => l.siteType !== 'hq')

  function phaseIndex(status: string): number {
    switch (status) {
      case 'pending': return 0
      case 'shipped': return 1
      case 'imported': return 2
      case 'incremental': return 3
      default: return -1
    }
  }

  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: 16,
    }}>
      <div style={{
        fontSize: 9, fontWeight: 700, color: C.purple, textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: 12,
      }}>
        Seed Pipeline Progress
      </div>

      {/* Phase headers */}
      <div style={{ display: 'flex', marginBottom: 8 }}>
        <div style={{ width: 60 }} />
        {phases.map((p, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 7, color: C.textDim, fontWeight: 600 }}>
            {p}
          </div>
        ))}
      </div>

      {/* Per-site rows */}
      {remoteSites.map(loc => {
        const pi = phaseIndex(loc.backup.seedStatus)
        const seedColor = getSeedStatusColor(loc.backup.seedStatus)
        return (
          <div key={loc.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ width: 60, fontSize: 9, fontWeight: 600, color: C.textBright }}>{loc.code}</div>
            {phases.map((_, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: i <= pi ? '90%' : '90%',
                  height: 8, borderRadius: 2,
                  background: i <= pi ? seedColor : C.border,
                  opacity: i <= pi ? 1 : 0.2,
                  boxShadow: i === pi ? `0 0 6px ${seedColor}40` : undefined,
                }} />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export function BackupView() {
  const { qnap, er4, nakivo } = backupInfra

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textBright, letterSpacing: '0.1em' }}>
          ENTERPRISE BACKUP ARCHITECTURE
        </h2>
        <p style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>
          NAKIVO Backup & Replication → QNAP TVS-h1674X @ HQ via EdgeRouter 4
        </p>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <StatBox label="Total PCs" value={`${nakivo.totalPcs}`} color={C.cyan10g} />
        <StatBox label="Total Data" value={`${nakivo.totalDataTb}`} unit="TB" color={C.warning} />
        <StatBox label="Seed Time" value={`~${nakivo.seedTimeDays}`} unit="days" color={C.red} />
        <StatBox label="Daily Delta" value={`~${nakivo.dailyIncrementalTb}`} unit="TB" color={C.green100g} />
        <StatBox label="Incremental" value={`~${nakivo.incrementalWindowHours}`} unit="hrs" color={C.purple} />
        <StatBox label="QNAP Usable" value={`${qnap.usableTb}`} unit="TB" color={C.accent} />
      </div>

      {/* HQ Infrastructure — 3 boxes */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <InfraBox title="QNAP TVS-h1674X" subtitle="Primary Backup Target — HQ" color={C.accent}>
          <InfoRow label="Bays" value={`${qnap.bays}x 3.5"`} />
          <InfoRow label="Drives" value={`${qnap.driveCount}x ${qnap.driveModel}`} />
          <InfoRow label="RAID" value={qnap.raidConfig} color={C.cyan10g} />
          <InfoRow label="Raw Capacity" value={`${qnap.rawTb} TB`} />
          <InfoRow label="Usable" value={`${qnap.usableTb} TB`} color={C.emerald} />
          <DriveBayViz />
          <div style={{ marginTop: 4 }}>
            <InfoRow label="Drive Cost" value={`$${(qnap.driveCostEach * qnap.driveCount).toLocaleString()}`} />
            <InfoRow label="Unit Cost" value={`$${qnap.unitCost.toLocaleString()}`} />
            <InfoRow label="Total" value={`$${qnap.totalCost.toLocaleString()}`} color={C.warning} />
          </div>
        </InfraBox>

        <InfraBox title="EdgeRouter 4" subtitle={`${er4.wanInterface} (WAN) → ${er4.lanInterface} (LAN)`} color={C.green100g}>
          <InfoRow label="WAN Speed" value={`${er4.wanSpeedMbps} Mbps`} color={C.cyan10g} />
          <InfoRow label="NAKIVO Cap" value={`${er4.nakivoMaxMbps} Mbps`} color={C.green100g} />
          <InfoRow label="Port Forward" value={`TCP ${er4.nakivoPort}`} />
          <InfoRow label="QoS" value={er4.qosEnabled ? 'ACTIVE' : 'Disabled'} color={er4.qosEnabled ? C.emerald : C.red} />
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
            <div style={{ fontSize: 8, color: C.textDim, marginBottom: 4 }}>Traffic Shaping</div>
            <InfoRow label="Business (6AM–8PM)" value={`Cap ${er4.nakivoMaxMbps} Mbps`} color={C.amber} />
            <InfoRow label="Off-hours (8PM–6AM)" value="Uncapped" color={C.emerald} />
            <InfoRow label="Per-site daytime" value="50 Mbps max" />
          </div>
        </InfraBox>

        <InfraBox title="NAKIVO Director" subtitle="Backup & Replication Manager" color={C.purple}>
          <InfoRow label="Port" value={`${nakivo.directorPort}`} />
          <InfoRow label="Encryption" value={nakivo.encryptionInFlight ? 'AES-256 In-Flight' : 'Disabled'}
            color={nakivo.encryptionInFlight ? C.emerald : C.red} />
          <InfoRow label="Seed to Device" value={nakivo.seedToDevice ? 'Enabled' : 'Disabled'}
            color={C.emerald} />
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
            <div style={{ fontSize: 8, color: C.textDim, marginBottom: 4 }}>Capacity Planning</div>
            <InfoRow label="Endpoints" value={`${nakivo.totalPcs} PCs`} />
            <InfoRow label="Full Backup" value={`${nakivo.totalDataTb} TB`} color={C.warning} />
            <InfoRow label="Daily Change" value={`~${nakivo.dailyIncrementalTb} TB (5%)`} />
            <InfoRow label="Incremental Push" value={`~${nakivo.incrementalWindowHours} hrs/day`} color={C.cyan10g} />
          </div>
        </InfraBox>
      </div>

      {/* Connection arrow hint */}
      <div style={{
        textAlign: 'center', fontSize: 10, color: C.textDim, marginBottom: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <div style={{ width: 60, height: 1, background: C.accent + '40' }} />
        <span style={{ color: C.accent, fontWeight: 600 }}>REMOTE SITES → ER4 → QNAP</span>
        <div style={{ width: 60, height: 1, background: C.accent + '40' }} />
      </div>

      {/* Remote Site Cards */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {locations.map(loc => (
          <SiteBackupCard key={loc.id} loc={loc} />
        ))}
      </div>

      {/* Bottom row: Bandwidth + Seed Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
        <BandwidthPanel />
        <SeedTimeline />
      </div>
    </div>
  )
}
