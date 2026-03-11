import { C } from '../constants/colors'

function ProgressBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const pct = (value / max) * 100
  const warn = pct > 80
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span style={{ color: C.textDim }}>{label}</span>
        <span style={{ color: warn ? C.red : color }}>{value}W / {max}W ({pct.toFixed(0)}%)</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: C.border }}>
        <div className="h-full rounded-full transition-all" style={{
          width: `${pct}%`,
          background: warn ? `linear-gradient(90deg, ${color}, ${C.red})` : color,
        }} />
      </div>
    </div>
  )
}

function PowerDevice({ name, idle, peak, color }: { name: string; idle: number; peak: number; color: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5 border-b" style={{ borderColor: C.border }}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-[11px] font-semibold flex-1" style={{ color }}>{name}</span>
      <span className="text-[10px] w-16 text-right" style={{ color: C.textDim }}>{idle}W idle</span>
      <span className="text-[10px] w-20 text-right font-semibold" style={{ color: C.textBright }}>{peak}W peak</span>
    </div>
  )
}

export function PowerView() {
  return (
    <div className="space-y-6">
      {/* UPS Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* UPS 1 */}
        <div className="rounded-lg border p-4" style={{ borderColor: C.warning + '40', background: C.panel }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔋</span>
            <div>
              <div className="text-xs font-bold" style={{ color: C.warning }}>UPS 1 — DEDICATED</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>2400W capacity</div>
            </div>
          </div>
          <div className="space-y-3">
            <PowerDevice name="Ironman" idle={350} peak={1300} color={C.warning} />
            <PowerDevice name="G9 Monitor #1" idle={80} peak={80} color={C.accent} />
            <div className="pt-2" />
            <ProgressBar value={1380} max={2400} color={C.warning} label="Peak Load" />
            <div className="text-[10px] mt-1" style={{ color: C.green100g }}>
              1020W headroom (43% spare)
            </div>
          </div>
        </div>

        {/* UPS 2 */}
        <div className="rounded-lg border p-4" style={{ borderColor: C.purple + '40', background: C.panel }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔋</span>
            <div>
              <div className="text-xs font-bold" style={{ color: C.purple }}>UPS 2 — SHARED</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>2400W capacity</div>
            </div>
          </div>
          <div className="space-y-3">
            <PowerDevice name="Iron-Patriot" idle={180} peak={700} color={C.purple} />
            <PowerDevice name="Jericho" idle={180} peak={700} color={C.purple} />
            <div className="pt-2" />
            <ProgressBar value={1400} max={2400} color={C.purple} label="Peak Load" />
            <div className="text-[10px] mt-1" style={{ color: C.green100g }}>
              1000W headroom (42% spare)
            </div>
          </div>
        </div>

        {/* Unprotected */}
        <div className="rounded-lg border p-4" style={{ borderColor: C.red + '40', background: C.panel }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⚠️</span>
            <div>
              <div className="text-xs font-bold" style={{ color: C.red }}>UNPROTECTED STRIP</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>No UPS protection</div>
            </div>
          </div>
          <div className="space-y-3">
            <PowerDevice name="Sentinel" idle={150} peak={800} color={C.pink} />
            <PowerDevice name="G9 Monitor #2" idle={80} peak={80} color={C.accent} />
            <PowerDevice name="Switches (×3)" idle={50} peak={150} color={C.textDim} />
            <div className="pt-2" />
            <ProgressBar value={1030} max={1800} color={C.red} label="Estimated Load" />
            <div className="text-[10px] mt-1 p-2 rounded" style={{ color: C.red, background: C.red + '10' }}>
              ⚠ Sentinel pulls ~800W peak on unprotected strip — consider adding UPS
            </div>
          </div>
        </div>
      </div>

      {/* Power Budget Table */}
      <div className="rounded-lg border p-4" style={{ borderColor: C.border, background: C.panel }}>
        <div className="text-xs font-bold mb-3" style={{ color: C.textBright }}>POWER BUDGET BREAKDOWN</div>
        <table className="w-full text-[10px]">
          <thead>
            <tr style={{ color: C.textDim }}>
              <th className="text-left py-1.5 border-b" style={{ borderColor: C.border }}>Device</th>
              <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>Idle (W)</th>
              <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>Peak (W)</th>
              <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>Protection</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Ironman', idle: 350, peak: 1300, prot: 'UPS 1', color: C.warning },
              { name: 'Iron-Patriot', idle: 180, peak: 700, prot: 'UPS 2', color: C.purple },
              { name: 'Jericho', idle: 180, peak: 700, prot: 'UPS 2', color: C.purple },
              { name: 'Sentinel', idle: 150, peak: 800, prot: 'None', color: C.pink },
              { name: 'Displays (2× G9)', idle: 160, peak: 160, prot: 'Split', color: C.accent },
              { name: 'Switches (3×)', idle: 50, peak: 150, prot: 'None', color: C.textDim },
            ].map(r => (
              <tr key={r.name}>
                <td className="py-1.5 border-b" style={{ borderColor: C.border, color: r.color }}>{r.name}</td>
                <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: C.textDim }}>{r.idle}</td>
                <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: C.textBright }}>{r.peak}</td>
                <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: r.prot === 'None' ? C.red : C.green100g }}>{r.prot}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="py-2" style={{ color: C.textBright }}>TOTAL</td>
              <td className="text-right py-2" style={{ color: C.warning }}>~1,070W</td>
              <td className="text-right py-2" style={{ color: C.red }}>~3,810W</td>
              <td className="text-right py-2" style={{ color: C.textDim }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Circuit Requirements */}
      <div className="rounded-lg border p-4" style={{ borderColor: C.red + '40', background: C.panel }}>
        <div className="text-xs font-bold mb-2" style={{ color: C.red }}>CIRCUIT REQUIREMENTS</div>
        <div className="space-y-2 text-[11px]" style={{ color: C.textDim }}>
          <div className="flex items-start gap-2">
            <span style={{ color: C.red }}>▸</span>
            <span>Peak draw: <span style={{ color: C.textBright }}>~3,810W ÷ 120V = 31.8A</span></span>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: C.red }}>▸</span>
            <span><span style={{ color: C.red }}>Exceeds single 20A circuit.</span> Single 20A/120V = 2,400W max (80% rule = 1,920W continuous)</span>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: C.green100g }}>▸</span>
            <span style={{ color: C.green100g }}>Recommended: 2× dedicated 20A/120V circuits OR 1× 30A/240V circuit</span>
          </div>
          <div className="flex items-start gap-2">
            <span style={{ color: C.warning }}>▸</span>
            <span>Typical idle draw (~1,070W) fits on a single 20A circuit</span>
          </div>
        </div>
      </div>
    </div>
  )
}
