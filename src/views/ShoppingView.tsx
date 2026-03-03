const C = {
  warning: '#f59e0b',
  purple: '#a78bfa',
  pink: '#f472b6',
  green100g: '#34d399',
  cyan10g: '#38bdf8',
  accent: '#00d4ff',
  red: '#ef4444',
  textDim: '#94a3b8',
  textBright: '#e2e8f0',
  panel: '#111827',
  border: '#1e293b',
}

function LineItem({ name, qty, unit, total, color, selected }: {
  name: string; qty: number; unit: number; total: number; color: string; selected?: boolean
}) {
  return (
    <div className={`flex items-center gap-3 py-2 px-3 rounded ${selected ? 'ring-1' : ''}`}
      style={{
        borderBottom: `1px solid ${C.border}`,
        background: selected ? color + '08' : undefined,
        ringColor: selected ? color + '40' : undefined,
      }}>
      <span className="text-[11px] flex-1" style={{ color: selected ? color : C.textBright }}>
        {qty}× {name}
      </span>
      <span className="text-[10px]" style={{ color: C.textDim }}>@ ${unit.toLocaleString()}</span>
      <span className="text-[11px] font-semibold w-20 text-right" style={{ color }}>${total.toLocaleString()}</span>
    </div>
  )
}

export function ShoppingView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Items */}
        <div className="space-y-4">
          {/* AI Fabric Switch */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.green100g + '40', background: C.panel }}>
            <div className="text-xs font-bold mb-2" style={{ color: C.green100g }}>AI FABRIC SWITCH</div>
            <LineItem name="NVIDIA Mellanox SN2100 (MSN2100-BB2F)" qty={1} unit={3563} total={3563} color={C.green100g} />
            <div className="text-[9px] mt-1 pl-3" style={{ color: C.textDim }}>BB2F = back-to-front airflow variant</div>
          </div>

          {/* LAN Core Switch */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.cyan10g + '40', background: C.panel }}>
            <div className="text-xs font-bold mb-2" style={{ color: C.cyan10g }}>LAN CORE SWITCH</div>
            <LineItem name="Netgear MS510TXUP" qty={1} unit={660} total={660} color={C.cyan10g} />
            <div className="text-[9px] mt-1 pl-3" style={{ color: C.textDim }}>4× 2.5G + 4× 10G PoE++ + 2× SFP+, 295W PoE budget</div>
          </div>

          {/* NICs */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.purple + '40', background: C.panel }}>
            <div className="text-xs font-bold mb-2" style={{ color: C.purple }}>NETWORK CARDS</div>
            <div className="mb-2">
              <div className="text-[10px] font-semibold mb-1" style={{ color: C.textDim }}>Option A: Genuine Mellanox</div>
              <LineItem name="Mellanox MCX556A-EDAT ConnectX-5 Ex VPI" qty={3} unit={649} total={1947} color={C.textDim} />
            </div>
            <div className="p-2 rounded ring-1" style={{ background: C.purple + '08', ringColor: C.purple + '40' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[10px] font-semibold" style={{ color: C.purple }}>Option B: Vogzone (SELECTED)</div>
                <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: C.green100g + '20', color: C.green100g }}>SAVE $972</span>
              </div>
              <LineItem name="Vogzone CX-5 VPI MCX556A-EDAT" qty={3} unit={325} total={975} color={C.purple} selected />
              <div className="text-[9px] mt-1 pl-3" style={{ color: C.textDim }}>Same CX-5 chipset, same performance</div>
            </div>
          </div>

          {/* Cables */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.border, background: C.panel }}>
            <div className="text-xs font-bold mb-2" style={{ color: C.textBright }}>CABLES</div>
            <LineItem name="10Gtek QSFP28 DAC 2.5m" qty={3} unit={28} total={84} color={C.green100g} />
            <div className="text-[9px] mt-1 pl-3" style={{ color: C.textDim }}>2.5m for desk-to-floor slack</div>
            <LineItem name="Jadaol Cat6 5ft 5-pack" qty={1} unit={13} total={13} color={C.cyan10g} />
            <div className="text-[9px] mt-1 pl-3" style={{ color: C.textDim }}>Onboard NIC → MS510TXUP patch runs</div>
          </div>

          {/* GPU */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.warning + '40', background: C.panel }}>
            <div className="text-xs font-bold mb-2" style={{ color: C.warning }}>GPU UPGRADE</div>
            <LineItem name="RTX PRO 6000 Blackwell 96GB DDR7 ECC (Empowered PC)" qty={1} unit={9000} total={9000} color={C.warning} />
            <div className="text-[9px] mt-1 pl-3" style={{ color: C.textDim }}>2nd card for Ironman, self-install</div>
          </div>
        </div>

        {/* Right: Summary + Performance */}
        <div className="space-y-4">
          {/* Cost Summary */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.accent + '40', background: C.panel }}>
            <div className="text-xs font-bold mb-3" style={{ color: C.accent }}>COST SUMMARY</div>
            <div className="space-y-2">
              {[
                { label: 'AI Fabric Switch (SN2100)', cost: 3563, color: C.green100g },
                { label: 'LAN Core (MS510TXUP)', cost: 660, color: C.cyan10g },
                { label: 'NICs (3× Vogzone CX-5)', cost: 975, color: C.purple },
                { label: 'Cables (DAC + Cat6)', cost: 97, color: C.textDim },
                { label: 'GPU (RTX PRO 6000)', cost: 9000, color: C.warning },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-[10px]">
                  <span style={{ color: item.color }}>{item.label}</span>
                  <span style={{ color: C.textBright }}>${item.cost.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: C.border }}>
                <span className="text-[10px]" style={{ color: C.textDim }}>Option A (genuine NICs)</span>
                <span className="text-[10px] line-through" style={{ color: C.textDim }}>$15,267</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded" style={{ background: C.accent + '10' }}>
                <span className="text-xs font-bold" style={{ color: C.accent }}>Option B (Vogzone) ← SELECTED</span>
                <span className="text-sm font-bold" style={{ color: C.accent }}>$14,295</span>
              </div>
            </div>
          </div>

          {/* Performance Impact */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.green100g + '40', background: C.panel }}>
            <div className="text-xs font-bold mb-3" style={{ color: C.green100g }}>PERFORMANCE IMPACT</div>
            <table className="w-full text-[10px]">
              <thead>
                <tr style={{ color: C.textDim }}>
                  <th className="text-left py-1.5 border-b" style={{ borderColor: C.border }}>Metric</th>
                  <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>Before (1GbE)</th>
                  <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>After</th>
                  <th className="text-right py-1.5 border-b" style={{ borderColor: C.border }}>Gain</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'AI inter-node throughput', before: '125 MB/s', after: '12.5 GB/s', gain: '100×', gainColor: C.green100g },
                  { metric: 'LAN throughput (Ironman)', before: '125 MB/s', after: '1.25 GB/s', gain: '10×', gainColor: C.cyan10g },
                  { metric: 'Ollama model load (70B)', before: '~10 min', after: '~6 sec', gain: '100×', gainColor: C.green100g },
                  { metric: 'Parsec remote desktop', before: 'Good', after: 'Near-native', gain: 'RDMA', gainColor: C.accent },
                  { metric: 'Distributed inference', before: 'Barely', after: 'Practical', gain: 'Yes!', gainColor: C.warning },
                ].map(r => (
                  <tr key={r.metric}>
                    <td className="py-1.5 border-b" style={{ borderColor: C.border, color: C.textBright }}>{r.metric}</td>
                    <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: C.textDim }}>{r.before}</td>
                    <td className="text-right py-1.5 border-b" style={{ borderColor: C.border, color: C.textBright }}>{r.after}</td>
                    <td className="text-right py-1.5 border-b font-bold" style={{ borderColor: C.border, color: r.gainColor }}>{r.gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Purchase Notes */}
          <div className="rounded-lg border p-4" style={{ borderColor: C.border, background: C.panel }}>
            <div className="text-xs font-bold mb-2" style={{ color: C.textBright }}>PURCHASE NOTES</div>
            <div className="space-y-1.5 text-[10px]" style={{ color: C.textDim }}>
              {[
                'SN2100 BB2F = back-to-front airflow variant, same switch',
                'Vogzone saves $972 vs genuine at same CX-5 chipset',
                'DAC cables 2.5m for desk-to-floor slack',
                'RTX PRO 6000 = 2nd card for Ironman, self-install',
                'MS510TXUP = new LAN core, GS752TPv2 cascades off SFP+',
                'Ironman gets 10G LAN, J2/J3/Jarvis get 2.5G LAN',
                'Cat6 5-pack for onboard NIC → MS510TXUP patch runs',
                'All prices from Amazon cart (March 2026)',
              ].map((note, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: C.accent }}>▸</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
