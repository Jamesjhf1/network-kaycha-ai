export function FooterStats() {
  const stats = [
    { label: 'Total VRAM', value: '416 GB', color: '#f59e0b' },
    { label: 'AI Fabric', value: '100 GbE', color: '#34d399' },
    { label: 'LAN Core', value: '10G/2.5G', color: '#38bdf8' },
    { label: 'Total RAM', value: '704 GB', color: '#00d4ff' },
    { label: 'GPU Count', value: '5 GPUs', color: '#f472b6' },
    { label: 'Upgrade Cost', value: '$14,295', color: '#a78bfa' },
  ]

  return (
    <footer className="border-t border-border bg-panel/90 backdrop-blur-sm">
      <div className="max-w-[1800px] mx-auto px-6 py-3">
        <div className="grid grid-cols-6 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded bg-bg/50 border border-border"
            >
              <span className="text-[10px] text-textDim uppercase tracking-wider">{s.label}</span>
              <span className="text-sm font-semibold" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
