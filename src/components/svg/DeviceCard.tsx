import { C } from '../../constants/colors'

export interface DeviceCardProps {
  x: number; y: number; w: number; h: number
  nodeId: string
  label: string; badge?: string; color: string
  specs: string[]; selected: boolean; onClick: () => void
}

export function DeviceCard({ x, y, w, h, label, badge, color, specs, selected, onClick }: DeviceCardProps) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      {selected && (
        <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={10}
          fill="none" stroke={color} strokeWidth={1.5} opacity={0.3}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill={selected ? color + '12' : C.panel}
        stroke={selected ? color : C.border}
        strokeWidth={selected ? 2 : 1}
        filter={selected ? `drop-shadow(0 0 14px ${color}50)` : undefined}
      />
      {!selected && (
        <g>
          <rect x={x + w - 50} y={y + h - 20} width={42} height={14} rx={3}
            fill={color + '15'} stroke={color + '30'} strokeWidth={0.5}
          />
          <text x={x + w - 29} y={y + h - 9} textAnchor="middle" fontSize={7} fill={color + 'aa'} fontFamily="'JetBrains Mono'">details ›</text>
        </g>
      )}
      {badge && (
        <g>
          <rect x={x + w - 8 - badge.length * 6.5} y={y + 6} width={badge.length * 6.5 + 12} height={18} rx={4} fill={color + '25'} stroke={color + '50'} strokeWidth={0.5} />
          <text x={x + w - 2 - badge.length * 3.25} y={y + 19} textAnchor="middle" fontSize={9} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{badge}</text>
        </g>
      )}
      <text x={x + 12} y={y + 22} fontSize={12} fontWeight={700} fill={color} fontFamily="'JetBrains Mono'">{label}</text>
      {specs.map((s, i) => (
        <text key={i} x={x + 12} y={y + 40 + i * 15} fontSize={9} fill={C.textDim} fontFamily="'JetBrains Mono'">{s}</text>
      ))}
    </g>
  )
}
