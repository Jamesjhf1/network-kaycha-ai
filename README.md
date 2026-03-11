# network.kaycha.ai

Interactive infrastructure topology dashboard for Kaycha Labs' AI compute fleet. Visualizes 10 machines across 4 views: physical network topology, logical VLAN layout, power/UPS budget, and the JARVIS-OPS development pipeline.

## Live Site

[https://network.kaycha.ai](https://network.kaycha.ai)

## Views

- **Physical** — SVG network topology showing all machines, switches, and connections with speed labels
- **Logical** — Two-column VLAN layout (VLAN 10 AI Fabric / VLAN 20 General LAN) with services, endpoints, and VRAM budget
- **Power** — UPS layout, per-device idle/peak wattage, power budget table, and circuit requirements
- **Pipeline** — 10-phase JARVIS-OPS development pipeline with architecture stats

## Fleet Overview

| Machine | GPU | VRAM | Network |
|---------|-----|------|---------|
| Ironman | 2× RTX PRO 6000 Blackwell (NVLink) | 192 GB | 100GbE |
| Iron-Patriot | RTX PRO 6000 Ada | 96 GB | 100GbE |
| Jericho | RTX PRO 6000 Ada | 96 GB | 100GbE |
| Sentinel | RTX 5090 | 32 GB | 2.5GbE |
| War-Machine | RTX 5080 | 16 GB | 2.5GbE |

**Local fleet total:** 416 GB VRAM across 100GbE fabric + 2.5GbE LAN

## Tech Stack

- React 19 + TypeScript 5.7
- Vite 6
- Tailwind CSS 4
- Static SPA (no backend)

## Development

```bash
pnpm install
pnpm dev
```

## Build & Deploy

```bash
pnpm build
```

Deploys automatically to Netlify via GitHub Actions on push to `main`.

## Project Structure

```
src/
├── App.tsx                  # Main shell with tab navigation
├── constants/colors.ts      # Shared color palette
├── components/
│   ├── FooterStats.tsx      # Aggregate fleet stats bar
│   └── NodeModal.tsx        # Machine detail modal
├── data/
│   └── nodes.ts             # All machine specs (hardcoded)
└── views/
    ├── PhysicalView.tsx     # SVG topology diagram
    ├── LogicalView.tsx      # VLAN services layout
    ├── PowerView.tsx        # UPS & power budget
    └── PipelineView.tsx     # JARVIS-OPS pipeline
```
