import { C } from '../../constants/colors'

export function SpeedBadge({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  const w = label.length * 6 + 16
  return (
    <g>
      <rect x={x - w / 2} y={y - 8} width={w} height={16} rx={8} fill={C.bg} stroke={color} strokeWidth={1} />
      <text x={x} y={y + 3} textAnchor="middle" fontSize={8} fontWeight={600} fill={color} fontFamily="'JetBrains Mono'">{label}</text>
    </g>
  )
}
