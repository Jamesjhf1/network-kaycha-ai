import { C } from '../../constants/colors'

export function SwitchCard({ x, y, w, h, label, badge, color, ports, activeCount, totalCount, selected, onClick }: {
  x: number; y: number; w: number; h: number; label: string; badge: string; color: string
  ports: number; activeCount: number; totalCount: number
  selected?: boolean; onClick?: () => void
}) {
  const portW = 8, portH = 6, gap = 3
  const totalW = totalCount * (portW + gap) - gap
  const startX = x + (w - totalW) / 2
  return (
    <g onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      {selected && (
        <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={9}
          fill="none" stroke={color} strokeWidth={1.5} opacity={0.3}
        />
      )}
      <rect x={x} y={y} width={w} height={h} rx={6}
        fill={selected ? color + '12' : C.panel}
        stroke={selected ? color : color + '60'}
        strokeWidth={selected ? 2 : 1.5}
        filter={selected ? `drop-shadow(0 0 14px ${color}50)` : undefined}
      />
      <rect x={x + 8} y={y + 4} width={badge.length * 7 + 12} height={16} rx={3} fill={color + '20'} stroke={color + '40'} strokeWidth={0.5} />
      <text x={x + 14} y={y + 15} fontSize={8} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{badge}</text>
      <text x={x + w / 2} y={y + 36} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.textBright} fontFamily="'JetBrains Mono'">{label}</text>
      {Array.from({ length: totalCount }).map((_, i) => (
        <rect key={i} x={startX + i * (portW + gap)} y={y + h - 16} width={portW} height={portH} rx={1}
          fill={i < activeCount ? color : C.border} opacity={i < activeCount ? 1 : 0.3}
        />
      ))}
      <text x={x + w / 2} y={y + h - 4} textAnchor="middle" fontSize={7} fill={C.textDim} fontFamily="'JetBrains Mono'">{activeCount}/{ports} active</text>
      {onClick && !selected && (
        <g>
          <rect x={x + w - 55} y={y + 4} width={47} height={14} rx={3}
            fill={color + '15'} stroke={color + '30'} strokeWidth={0.5}
          />
          <text x={x + w - 31} y={y + 14} textAnchor="middle" fontSize={7} fill={color + 'aa'} fontFamily="'JetBrains Mono'">ports ›</text>
        </g>
      )}
    </g>
  )
}
