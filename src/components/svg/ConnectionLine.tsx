export function ConnectionLine({ x1, y1, x2, y2, color, dashed, thick }: {
  x1: number; y1: number; x2: number; y2: number; color: string; dashed?: boolean; thick?: boolean
}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={thick ? 3 : 1.5}
      strokeDasharray={dashed ? '6,4' : undefined}
      opacity={0.7}
    />
  )
}
