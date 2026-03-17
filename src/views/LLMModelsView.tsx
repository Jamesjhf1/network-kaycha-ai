import { useState } from 'react'
import { C } from '../constants/colors'
import { LLM_MODELS, WORKSTATIONS, MODEL_STATS } from '../data/llm-models'
import type { LLMModel } from '../data/llm-models'

/* ── Filter types ─────────────────────────────────────────── */

type TypeFilter = 'all' | 'standard' | 'custom'
type SizeFilter = 'all' | 'small' | 'medium' | 'large' | 'xl'

function getSizeCategory(vram: string): SizeFilter {
  const gb = parseFloat(vram.replace(/[^0-9.]/g, ''))
  if (gb <= 6) return 'small'
  if (gb <= 25) return 'medium'
  if (gb <= 50) return 'large'
  return 'xl'
}

const sizeLabels: Record<SizeFilter, string> = {
  all: 'All Sizes',
  small: '≤6 GB',
  medium: '6–25 GB',
  large: '25–50 GB',
  xl: '50+ GB',
}

/* ── Color helpers ────────────────────────────────────────── */

const typeColors = {
  standard: C.accent,
  custom: C.purple,
}

const sizeColors: Record<SizeFilter, string> = {
  all: C.textDim,
  small: C.green100g,
  medium: C.blue,
  large: C.warning,
  xl: C.red,
}

const hostColors: Record<string, string> = {
  jericho: C.accent,
  sentinel: C.green100g,
  'iron-patriot': C.purple,
  ironman: C.warning,
}

/* ── Sub-components ───────────────────────────────────────── */

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg border text-center px-5 py-3.5 min-w-[120px]" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[11px]" style={{ color: C.textDim }}>{label}</div>
    </div>
  )
}

function FilterButton({ active, label, color, onClick }: { active: boolean; label: string; color: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all cursor-pointer"
      style={active
        ? { background: color + '20', border: `1px solid ${color}50`, color }
        : { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: C.textDim }
      }
    >
      {label}
    </button>
  )
}

function HostDot({ host, present }: { host: string; present: boolean }) {
  const color = hostColors[host] ?? C.textDim
  const ws = WORKSTATIONS.find(w => w.id === host)
  return (
    <div
      className="w-3 h-3 rounded-full transition-all"
      title={`${ws?.name ?? host}: ${present ? 'Available' : 'Not available'}`}
      style={{
        background: present ? color : 'rgba(255,255,255,0.06)',
        border: `1px solid ${present ? color + '80' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: present ? `0 0 6px ${color}40` : 'none',
      }}
    />
  )
}

function VRAMBar({ vram }: { vram: string }) {
  const gb = parseFloat(vram.replace(/[^0-9.]/g, ''))
  const maxGb = 96
  const pct = Math.min((gb / maxGb) * 100, 100)
  const cat = getSizeCategory(vram)
  const color = sizeColors[cat]

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[10px] font-mono" style={{ color }}>{vram}</span>
    </div>
  )
}

/* ── Model Detail Modal ───────────────────────────────────── */

function ModelModal({ model, onClose }: { model: LLMModel; onClose: () => void }) {
  const color = model.type === 'custom' ? C.purple : C.accent

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[700px] max-h-[85vh] overflow-y-auto rounded-2xl border p-6"
        style={{ background: '#0f1629', borderColor: color + '30' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold" style={{ color: C.textBright }}>{model.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: color + '20', color }}>{model.tag}</span>
              <span
                className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full"
                style={{ background: typeColors[model.type] + '20', color: typeColors[model.type] }}
              >
                {model.type}
              </span>
            </div>
            <p className="text-[11px]" style={{ color: C.textDim }}>{model.purpose}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-lg cursor-pointer px-2"
            style={{ color: C.textDim }}
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <div className="rounded-lg border p-4 mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color }}>Description</div>
          <p className="text-[12px] leading-relaxed" style={{ color: C.textBright }}>{model.description}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <SpecRow label="Architecture" value={model.architecture} />
          <SpecRow label="Parameters" value={model.params} />
          <SpecRow label="Quantization" value={model.quantization} />
          <SpecRow label="Disk Size" value={model.size} />
          <SpecRow label="VRAM Required" value={model.vram} color={sizeColors[getSizeCategory(model.vram)]} />
          <SpecRow label="Context Window" value={`${model.context} tokens`} />
          {model.basedOn && <SpecRow label="Based On" value={model.basedOn} color={C.purple} />}
        </div>

        {/* Performance */}
        <div className="rounded-lg border p-4 mb-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.green100g }}>Performance</div>
          <div className="grid grid-cols-2 gap-3">
            {model.perfJericho && (
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: hostColors.jericho }} />
                <span className="text-[11px]" style={{ color: C.textDim }}>Jericho (96 GB):</span>
                <span className="text-[11px] font-mono font-semibold" style={{ color: C.textBright }}>{model.perfJericho}</span>
              </div>
            )}
            {model.perfSentinel && (
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: hostColors.sentinel }} />
                <span className="text-[11px]" style={{ color: C.textDim }}>Sentinel (32 GB):</span>
                <span className="text-[11px] font-mono font-semibold" style={{ color: C.textBright }}>{model.perfSentinel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Host Availability */}
        <div className="rounded-lg border p-4" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.warning }}>Workstation Availability</div>
          <div className="flex gap-4">
            {WORKSTATIONS.map(ws => {
              const present = model.hosts.includes(ws.id as any)
              return (
                <div key={ws.id} className="flex items-center gap-2">
                  <HostDot host={ws.id} present={present} />
                  <span className="text-[11px]" style={{ color: present ? hostColors[ws.id] : C.textDim }}>
                    {ws.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between rounded border px-3 py-2" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
      <span className="text-[10px]" style={{ color: C.textDim }}>{label}</span>
      <span className="text-[11px] font-mono font-semibold" style={{ color: color ?? C.textBright }}>{value}</span>
    </div>
  )
}

/* ── Workstation Cards ────────────────────────────────────── */

function WorkstationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {WORKSTATIONS.map(ws => {
        const color = hostColors[ws.id]
        const modelCount = LLM_MODELS.filter(m => m.hosts.includes(ws.id as any)).length
        return (
          <div
            key={ws.id}
            className="rounded-xl border p-4"
            style={{ borderColor: color + '25', background: color + '06' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}50` }} />
              <span className="text-[13px] font-bold" style={{ color }}>{ws.name}</span>
            </div>
            <div className="space-y-1">
              <div className="text-[10px]" style={{ color: C.textDim }}>
                <span style={{ color: C.textBright }}>{ws.gpu}</span> · {ws.vramTotal} VRAM
              </div>
              <div className="text-[10px]" style={{ color: C.textDim }}>{ws.ip}</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>{ws.role}</div>
              <div className="text-[11px] font-semibold mt-1" style={{ color }}>
                {modelCount} models loaded
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Model Table Row ──────────────────────────────────────── */

function ModelRow({ model, onClick }: { model: LLMModel; onClick: () => void }) {
  const color = model.type === 'custom' ? C.purple : C.accent

  return (
    <tr
      className="transition-colors cursor-pointer"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Name + Tag */}
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold" style={{ color: C.textBright }}>{model.name}</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: color + '15', color: color + 'cc' }}>{model.tag}</span>
        </div>
        {model.basedOn && (
          <div className="text-[9px] mt-0.5" style={{ color: C.textDim }}>
            Based on {model.basedOn}
          </div>
        )}
      </td>

      {/* Type */}
      <td className="py-2.5 px-3">
        <span
          className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full"
          style={{ background: typeColors[model.type] + '15', color: typeColors[model.type] }}
        >
          {model.type}
        </span>
      </td>

      {/* Architecture */}
      <td className="py-2.5 px-3">
        <span className="text-[11px]" style={{ color: C.textDim }}>{model.architecture}</span>
      </td>

      {/* Params */}
      <td className="py-2.5 px-3">
        <span className="text-[11px] font-mono" style={{ color: C.textBright }}>{model.params}</span>
      </td>

      {/* Size */}
      <td className="py-2.5 px-3">
        <span className="text-[11px] font-mono" style={{ color: C.textDim }}>{model.size}</span>
      </td>

      {/* VRAM */}
      <td className="py-2.5 px-3">
        <VRAMBar vram={model.vram} />
      </td>

      {/* Performance */}
      <td className="py-2.5 px-3">
        <span className="text-[11px] font-mono" style={{ color: model.perfJericho === 'N/A (embedding)' ? C.textDim : C.green100g }}>
          {model.perfJericho ?? '—'}
        </span>
      </td>

      {/* Context */}
      <td className="py-2.5 px-3">
        <span className="text-[11px] font-mono" style={{ color: C.textDim }}>{model.context}</span>
      </td>

      {/* Hosts */}
      <td className="py-2.5 px-3">
        <div className="flex gap-1.5">
          {WORKSTATIONS.map(ws => (
            <HostDot key={ws.id} host={ws.id} present={model.hosts.includes(ws.id as any)} />
          ))}
        </div>
      </td>
    </tr>
  )
}

/* ── VRAM Budget Chart ────────────────────────────────────── */

function VRAMBudget() {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: C.border }}>
      <div className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: C.warning }}>
        VRAM Budget per Workstation
      </div>
      <div className="space-y-3">
        {WORKSTATIONS.map(ws => {
          const totalVram = parseFloat(ws.vramTotal)
          const color = hostColors[ws.id]
          // Find the largest model that fits in this workstation's VRAM
          const fittingModels = LLM_MODELS.filter(m => {
            const vram = parseFloat(m.vram.replace(/[^0-9.]/g, ''))
            return vram <= totalVram && m.hosts.includes(ws.id as any)
          })
          const largestFit = fittingModels.reduce((max, m) => {
            const v = parseFloat(m.vram.replace(/[^0-9.]/g, ''))
            return v > max ? v : max
          }, 0)
          const pct = (largestFit / totalVram) * 100

          return (
            <div key={ws.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-[11px] font-semibold" style={{ color }}>{ws.name}</span>
                  <span className="text-[10px] font-mono" style={{ color: C.textDim }}>{ws.gpu}</span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: C.textDim }}>
                  {ws.vramTotal} total · largest model: {largestFit} GB
                </span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-[9px] text-center mt-3" style={{ color: C.textDim }}>
        Bar shows largest single model that fits in VRAM · Models &gt;VRAM require CPU offload
      </div>
    </div>
  )
}

/* ── Main Component ───────────────────────────────────────── */

export function LLMModelsView() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all')
  const [selectedModel, setSelectedModel] = useState<LLMModel | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = LLM_MODELS.filter(m => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false
    if (sizeFilter !== 'all' && getSizeCategory(m.vram) !== sizeFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        m.name.toLowerCase().includes(q) ||
        m.tag.toLowerCase().includes(q) ||
        m.purpose.toLowerCase().includes(q) ||
        m.architecture.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-4 max-w-[1500px] mx-auto">
      {/* Title */}
      <div className="text-center pb-1">
        <h2 className="text-xl font-bold">
          <span style={{ color: C.purple }}>LLM Models</span>
          {' '}
          <span style={{ color: C.textBright }}>Inventory</span>
        </h2>
        <p className="text-xs mt-1" style={{ color: C.textDim }}>
          {MODEL_STATS.totalModels} models synced across {MODEL_STATS.workstationCount} workstations · ~{MODEL_STATS.totalStoragePerHost} per host · Last synced {MODEL_STATS.lastSynced}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="flex justify-center gap-3 flex-wrap">
        <StatCard value={String(MODEL_STATS.totalModels)} label="Total Models" color={C.accent} />
        <StatCard value={String(MODEL_STATS.standardModels)} label="Standard" color={C.blue} />
        <StatCard value={String(MODEL_STATS.customModels)} label="Custom" color={C.purple} />
        <StatCard value={String(MODEL_STATS.workstationCount)} label="Workstations" color={C.green100g} />
        <StatCard value={MODEL_STATS.totalStoragePerHost} label="Storage / Host" color={C.warning} />
      </div>

      {/* Workstation Cards */}
      <WorkstationCards />

      {/* VRAM Budget */}
      <VRAMBudget />

      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textDim }}>Type:</span>
          <FilterButton active={typeFilter === 'all'} label="All" color={C.textBright} onClick={() => setTypeFilter('all')} />
          <FilterButton active={typeFilter === 'standard'} label="Standard" color={C.accent} onClick={() => setTypeFilter('standard')} />
          <FilterButton active={typeFilter === 'custom'} label="Custom" color={C.purple} onClick={() => setTypeFilter('custom')} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textDim }}>VRAM:</span>
          {(['all', 'small', 'medium', 'large', 'xl'] as SizeFilter[]).map(s => (
            <FilterButton key={s} active={sizeFilter === s} label={sizeLabels[s]} color={sizeColors[s]} onClick={() => setSizeFilter(s)} />
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 text-[11px] rounded-lg border outline-none transition-colors"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: searchQuery ? C.accent + '50' : 'rgba(255,255,255,0.1)',
              color: C.textBright,
            }}
          />
        </div>
      </div>

      {/* Model Table */}
      <div className="rounded-xl border overflow-x-auto" style={{ borderColor: C.border }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Model', 'Type', 'Architecture', 'Params', 'Disk', 'VRAM', 'Speed (Jericho)', 'Context', 'Hosts'].map(h => (
                <th
                  key={h}
                  className="text-left py-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: C.textDim }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <ModelRow key={`${m.name}-${m.tag}-${i}`} model={m} onClick={() => setSelectedModel(m)} />
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-[12px]" style={{ color: C.textDim }}>
            No models match the current filters
          </div>
        )}
      </div>

      {/* Host Legend */}
      <div className="flex justify-center gap-6 flex-wrap">
        {WORKSTATIONS.map(ws => (
          <div key={ws.id} className="flex items-center gap-2 text-[11px]">
            <HostDot host={ws.id} present={true} />
            <span style={{ color: C.textDim }}>{ws.name}</span>
            <span className="text-[9px] font-mono" style={{ color: C.textDim }}>({ws.ip})</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 pb-2 text-[11px]" style={{ color: '#475569' }}>
        LLM Model Inventory · Kaycha AI Lab · Synced {MODEL_STATS.lastSynced}
      </div>

      {/* Modal */}
      {selectedModel && <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </div>
  )
}
