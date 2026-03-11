export type NodeStatus = 'online' | 'building' | 'coming-soon' | 'staging'

export interface AppEntry {
  name: string
  category: 'ide' | 'ai' | 'runtime' | 'devops' | 'monitoring' | 'remote' | 'test'
  detail?: string
  port?: string
}

export interface NetInterface {
  label: string
  speed: string
  target: string
  ip?: string
  color: 'fabric' | 'lan' | 'wan' | 'tailscale' | 'display'
}

export interface ServiceEntry {
  name: string
  port?: string
  detail?: string
}

export interface PortEntry {
  port: string
  speed: string
  device: string
  notes: string
}

export interface NodeData {
  id: string
  name: string
  badge: string
  status: NodeStatus
  role: string
  colorKey: string
  hardware: string[]
  apps: AppEntry[]
  interfaces: NetInterface[]
  services: ServiceEntry[]
  notes?: string[]
  ports?: PortEntry[]
}

export const NODES: Record<string, NodeData> = {
  ironman: {
    id: 'ironman',
    name: 'IRONMAN',
    badge: "ETA MAR '26",
    status: 'coming-soon',
    role: 'Flagship Inference + Primary Dev',
    colorKey: 'warning',
    hardware: [
      'CPU: AMD Threadripper PRO 9995WX — 64C/128T',
      'RAM: 256GB DDR5 ECC RDIMM (4×64GB)',
      'GPU: 2× RTX PRO 6000 Blackwell 96GB (192GB NVLink VRAM)',
      'SSD: 2× 4TB Samsung 990 PRO Gen4 NVMe',
      'PSU: 1650W 80+ Titanium',
      'Display: 2× Samsung 49" OLED G9 5120×1440 240Hz DP 2.1',
    ],
    apps: [
      { name: 'Cursor IDE', category: 'ide', detail: 'Primary coding IDE' },
      { name: 'VS Code', category: 'ide', detail: 'Secondary editor' },
      { name: 'Claude Desktop', category: 'ai', detail: '21 MCP servers configured' },
      { name: 'Claude Code CLI', category: 'ai', detail: 'Agentic multi-file coding' },
      { name: 'Open WebUI', category: 'ai', detail: 'Primary host :3000 — multi-endpoint to all Ollama nodes', port: '3000' },
      { name: 'Ollama', category: 'ai', detail: 'Qwen3.5-122B-A10B Q8 (primary) + Qwen3.5-35B-A3B (fast)', port: '11434' },
      { name: 'bolt.diy', category: 'ai', detail: 'Local AI-powered full-stack codegen' },
      { name: 'Parsec', category: 'remote', detail: 'GPU-accelerated remote desktop host' },
    ],
    interfaces: [
      { label: 'NIC1 (10G RJ45)', speed: '10GbE', target: 'Netgear MS510TXUP', ip: '10.2.10.TBD', color: 'lan' },
      { label: 'NIC2 (ConnectX-5 VPI)', speed: '100GbE', target: 'Mellanox SN2100 AI Fabric', ip: '10.0.100.10', color: 'fabric' },
      { label: 'Tailscale', speed: 'WireGuard', target: 'Mesh VPN overlay', ip: 'TBD', color: 'tailscale' },
      { label: 'DP 2.1 (×2)', speed: 'DisplayPort 2.1', target: '2× Samsung G9 OLED', color: 'display' },
    ],
    services: [
      { name: 'Ollama', port: '11434', detail: 'Qwen3.5-122B primary + 35B fast lane, 192GB VRAM' },
      { name: 'Open WebUI', port: '3000', detail: 'Multi-endpoint: all 3 Ollama nodes on AI Fabric' },
      { name: 'Parsec Host', detail: 'Near-native GPU remote desktop via RDMA fabric' },
    ],
    notes: [
      'NVLink bridge couples 2× 96GB GPUs → single 192GB VRAM pool',
      'Primary large-model inference: Qwen3.5-122B Q8 (~128GB VRAM)',
      'Future: Qwen3.5-397B Q4 (~200GB) when GGUF stable',
    ],
  },

  sentinel: {
    id: 'sentinel',
    name: 'SENTINEL',
    badge: 'DAILY DRIVER',
    status: 'online',
    role: "James's Primary Workstation",
    colorKey: 'pink',
    hardware: [
      'CPU: AMD Ryzen 9 9950X3D 16C/32T',
      'RAM: 192GB DDR5',
      'GPU: RTX 5090 32GB',
      'SSD: 4TB + 3TB (6.4TB total)',
    ],
    apps: [
      { name: 'Cursor IDE', category: 'ide', detail: 'Primary vibe coding IDE' },
      { name: 'VS Code', category: 'ide', detail: 'Secondary / Claude Code terminal' },
      { name: 'Claude Desktop', category: 'ai', detail: '11 MCP servers • config at AppData\\Roaming\\Claude', port: '' },
      { name: 'Claude Code CLI', category: 'ai', detail: 'Multi-file agentic coding sessions' },
      { name: 'Open WebUI', category: 'ai', detail: 'docker restart=always :3000', port: '3000' },
      { name: 'Ollama', category: 'ai', detail: 'daily-driver: Qwen3.5-35B-A3B (~149 tok/s)', port: '11434' },
      { name: 'mcpo (MCP proxy)', category: 'ai', detail: 'Python 3.14 MCP-over-HTTP bridge', port: '8001' },
      { name: 'Docker Desktop', category: 'devops', detail: 'AutoStart:true in settings-store.json' },
      { name: 'Parsec', category: 'remote', detail: 'Remote desktop client' },
      { name: 'Barrier KVM', category: 'remote', detail: 'Shared keyboard+mouse across nodes' },
      { name: 'Tailscale', category: 'remote', detail: 'WireGuard mesh client' },
    ],
    interfaces: [
      { label: 'Realtek 2.5GbE', speed: '2.5GbE', target: 'Netgear MS510TXUP', ip: '10.2.10.70', color: 'lan' },
      { label: 'Wi-Fi 6E (RZ616)', speed: 'Wi-Fi 6E', target: 'Wireless AP (backup)', color: 'lan' },
      { label: 'Tailscale', speed: 'WireGuard', target: 'Mesh VPN', ip: '100.98.251.57', color: 'tailscale' },
    ],
    services: [
      { name: 'Ollama', port: '11434', detail: 'Qwen3.5-35B-A3B daily driver (149 tok/s)' },
      { name: 'Open WebUI', port: '3000', detail: 'Docker container, restart=always' },
      { name: 'mcpo MCP proxy', port: '8001', detail: '11 MCP servers bridged over HTTP' },
      { name: 'WinRM', port: '5985', detail: 'PowerShell remoting — credentials in 1Password' },
      { name: 'Chat Harvester', detail: 'Every 30 min: OWU + Cursor + Claude Code → JARVIS-KB' },
    ],
    notes: [
      'CRITICAL: Claude Desktop config wipes mcpServers on save — always merge',
      'CRITICAL: PowerShell Set-Content -Encoding UTF8 adds BOM — use [System.IO.File]::WriteAllText()',
    ],
  },

  ironpatriot: {
    id: 'ironpatriot',
    name: 'IRON-PATRIOT',
    badge: '100G+2.5G',
    status: 'online',
    role: 'Docker / Monitoring / jarvis-rag Host',
    colorKey: 'purple',
    hardware: [
      'CPU: Intel Ultra 9 285K',
      'RAM: 128GB DDR5',
      'GPU: RTX PRO 6000 Ada 96GB',
      'SSD: 4TB Gen5 + 2×4TB',
    ],
    apps: [
      { name: 'VS Code', category: 'ide', detail: 'Remote SSH / server-side dev' },
      { name: 'Claude Desktop', category: 'ai', detail: 'MCP servers configured' },
      { name: 'Ollama', category: 'ai', detail: 'Worker node: Qwen3 32B / CodeLlama 34B', port: '11434' },
      { name: 'Docker Desktop', category: 'devops', detail: 'Grafana, Prometheus, jarvis-rag, JARVIS-OPS containers' },
      { name: 'Grafana', category: 'monitoring', detail: 'Metrics dashboards for AI fleet', port: '3000' },
      { name: 'Prometheus', category: 'monitoring', detail: 'Metrics scraping + alerting', port: '9090' },
      { name: 'jarvis-rag', category: 'ai', detail: 'Retrieval-augmented generation MCP server', port: '3100' },
    ],
    interfaces: [
      { label: 'Realtek 2.5GbE', speed: '2.5GbE', target: 'Netgear MS510TXUP', ip: '10.2.10.71', color: 'lan' },
      { label: 'ConnectX-5 VPI', speed: '100GbE', target: 'Mellanox SN2100 AI Fabric', ip: '10.0.100.20', color: 'fabric' },
      { label: 'Tailscale', speed: 'WireGuard', target: 'Mesh VPN', ip: '100.75.25.51', color: 'tailscale' },
    ],
    services: [
      { name: 'Ollama Worker', port: '11434', detail: 'Qwen3 32B / CodeLlama 34B — 96GB VRAM' },
      { name: 'Grafana', port: '3000', detail: 'AI fleet monitoring dashboards (Docker)' },
      { name: 'Prometheus', port: '9090', detail: 'Metrics scraper via WinRM across fleet' },
      { name: 'jarvis-rag', port: '3100', detail: 'RAG MCP server — rag_search, rag_context RPCs' },
      { name: 'WinRM', port: '5985', detail: 'PowerShell remoting — credentials in 1Password' },
    ],
    notes: [
      'Setup script may stall (winget broken) — run phases manually via SSH, do not re-run blindly',
    ],
  },

  jericho: {
    id: 'jericho',
    name: 'JERICHO',
    badge: '100G+2.5G',
    status: 'online',
    role: 'Primary Dev Workstation',
    colorKey: 'purple',
    hardware: [
      'CPU: Intel Ultra 9 285K',
      'RAM: 128GB DDR5',
      'GPU: RTX PRO 6000 Ada 96GB',
      'SSD: 4TB Gen5 + 2×4TB',
    ],
    apps: [
      { name: 'Cursor IDE', category: 'ide', detail: 'Primary vibe coding IDE' },
      { name: 'VS Code', category: 'ide', detail: 'Secondary editor' },
      { name: 'Claude Desktop', category: 'ai', detail: 'MCP servers via AppX AUMID Claude_pzs8sxrjxfjjc!Claude' },
      { name: 'Claude Code CLI', category: 'ai', detail: 'Multi-file agentic coding' },
      { name: 'Open WebUI', category: 'ai', detail: 'Docker container, restart=always', port: '3000' },
      { name: 'Ollama', category: 'ai', detail: 'Qwen3 32B / Mistral / embed models', port: '11434' },
      { name: 'Docker Desktop', category: 'devops', detail: 'AutoStart:true • JARVIS-OPS containers' },
      { name: 'JARVIS-OPS', category: 'devops', detail: 'Orchestrator + 3 workers, Supabase task queue' },
    ],
    interfaces: [
      { label: 'Realtek 2.5GbE', speed: '2.5GbE', target: 'Netgear MS510TXUP', ip: '10.2.10.35', color: 'lan' },
      { label: 'ConnectX-5 VPI', speed: '100GbE', target: 'Mellanox SN2100 AI Fabric', ip: '10.0.100.30', color: 'fabric' },
      { label: 'Tailscale', speed: 'WireGuard', target: 'Mesh VPN', ip: '100.85.6.71', color: 'tailscale' },
    ],
    services: [
      { name: 'Ollama Worker', port: '11434', detail: 'Qwen3 32B / Mistral / embed — 96GB VRAM' },
      { name: 'Open WebUI', port: '3000', detail: 'Docker restart=always' },
      { name: 'JARVIS-OPS Orchestrator', detail: 'Discord bot + task queue + 3 worker agents' },
      { name: 'WinRM', port: '5985', detail: 'PowerShell remoting — credentials in 1Password' },
    ],
    notes: [
      'Auto-start configured: Ollama (startup shortcut), Docker Desktop, Open WebUI (docker), Claude Desktop (AppX AUMID)',
      'Docker crash fix: stale Unix socket reparse points — kill Docker + wsl --shutdown, rename dirs',
    ],
  },

  warmachine: {
    id: 'warmachine',
    name: 'WAR-MACHINE',
    badge: 'BUILDING',
    status: 'building',
    role: "Jeremy's Dev Workstation (Remote)",
    colorKey: 'blue',
    hardware: [
      'CPU: AMD Ryzen 9 9950X',
      'RAM: 128GB DDR5-5600 (4×32GB Kingston KF556C40, arriving Mar 11)',
      'GPU: RTX 5080 16GB',
    ],
    apps: [
      { name: 'Cursor IDE', category: 'ide', detail: "Jeremy's primary IDE" },
      { name: 'VS Code', category: 'ide', detail: 'Secondary / remote work' },
      { name: 'Claude Code CLI', category: 'ai', detail: 'Agentic multi-file coding' },
      { name: 'Ollama', category: 'ai', detail: 'Local inference — secondary to JARVIS colo', port: '11434' },
    ],
    interfaces: [
      { label: 'Edge4 VPN', speed: 'VPN', target: 'ER4 Gateway → MS510TXUP Port 2', color: 'wan' },
      { label: 'Tailscale', speed: 'WireGuard', target: 'Mesh VPN', color: 'tailscale' },
      { label: 'JARVIS Colo (SSH tunnel)', speed: 'VPN tunnel', target: '4× L40S GPU inference server', color: 'wan' },
    ],
    services: [
      { name: 'Ollama', port: '11434', detail: 'Local inference on RTX 5080' },
      { name: 'JARVIS Colo Access', detail: 'SSH tunnel to 4× L40S 48GB for heavy inference (port 11434 → VPN tunnel)' },
    ],
    notes: [
      'Remote machine — connects to lab via ER4 VPN gateway',
      'RAM arriving Wed Mar 11 → shipping to Jeremy Thu Mar 12',
      'Windows username: Jeremy',
    ],
  },

  happy: {
    id: 'happy',
    name: 'HAPPY',
    badge: 'TEST RUNNER',
    status: 'online',
    role: 'E2E Test Runner / Home Desktop',
    colorKey: 'textDim',
    hardware: [
      'Home Desktop (not part of AI inference fleet)',
    ],
    apps: [
      { name: 'Claude Desktop', category: 'ai', detail: 'MCP servers configured (AUMID Claude_pzs8sxrjxfjjc!Claude)' },
      { name: 'Node.js + pnpm', category: 'runtime', detail: 'JS runtime for test execution' },
      { name: 'Playwright', category: 'test', detail: 'E2E browser tests — workers:1' },
      { name: 'NSSM Services', category: 'devops', detail: 'Windows service manager for test runners' },
    ],
    interfaces: [
      { label: '2.5GbE NIC', speed: '2.5GbE', target: 'Netgear MS510TXUP', ip: '10.2.10.112', color: 'lan' },
      { label: 'Tailscale', speed: 'WireGuard', target: 'Mesh VPN', ip: '100.87.48.124', color: 'tailscale' },
    ],
    services: [
      { name: 'kaycha-tests (Playwright)', detail: 'CRM 15/16 green • Exec auth broken (admin.createUser) • HR cookie mode' },
      { name: 'NSSM test services', detail: 'Scheduled E2E runs via NSSM Windows service wrapper' },
    ],
    notes: [
      'Claude Desktop config: C:\\Users\\James\\AppData\\Local\\Packages\\Claude_pzs8sxrjxfjjc\\LocalCache\\Roaming\\Claude\\claude_desktop_config.json',
      'Being cleaned up and prepped Mar 2026',
    ],
  },

  jarvis: {
    id: 'jarvis',
    name: 'JARVIS',
    badge: 'AI SERVER',
    status: 'online',
    role: 'Colo AI Inference Server — Boca Raton',
    colorKey: 'coloGreen',
    hardware: [
      'Model: Dell R760xa',
      'GPU: 4× NVIDIA L40S 48GB (192GB Total VRAM)',
      'Location: Revelex Colo — 6405 Congress Ave, Boca Raton FL',
    ],
    apps: [
      { name: 'Ollama', category: 'ai', detail: 'Heavy inference — 4× L40S 192GB VRAM', port: '11434' },
    ],
    interfaces: [
      { label: 'VPN Gateway', speed: 'VPN', target: 'Juniper VPN — .24', color: 'wan' },
      { label: 'SSH (ai-tool-hb)', speed: 'SSH', target: '.25 — primary access', color: 'wan' },
      { label: 'SSH (yourcoa-firewalled)', speed: 'SSH', target: '.26 — Jose needed for access', color: 'wan' },
      { label: 'iDRAC', speed: 'IPMI', target: '.23 — out-of-band management', color: 'wan' },
    ],
    services: [
      { name: 'Ollama', port: '11434', detail: 'BLOCKED externally — access via SSH tunnel only (Jose for .26 access)' },
      { name: 'iDRAC', detail: '.23 — out-of-band server management' },
    ],
    notes: [
      'Port 11434 blocked — must SSH tunnel for Ollama access',
      'Jose Almodovar (x235) needed for SSH to .26 + MySQL creds',
      'Subnet /26 • Russ Gnann (x260) for network changes',
    ],
  },

  starktower: {
    id: 'starktower',
    name: 'STARK-TOWER',
    badge: 'PROD #1',
    status: 'online',
    role: 'Primary Production Server',
    colorKey: 'webPurple',
    hardware: [
      'Location: Atlanta (Cloud)',
      'Role: Main Production Web + Database Stack',
    ],
    apps: [
      { name: 'Web / Database Stack', category: 'devops', detail: 'Production workloads' },
    ],
    interfaces: [
      { label: 'WAN', speed: 'Cloud', target: 'Atlanta datacenter — public internet', color: 'wan' },
      { label: 'VPN', speed: 'VPN', target: 'Colo mesh — Revelex', color: 'wan' },
    ],
    services: [
      { name: 'Web Stack', detail: 'Active production — STARK-TOWER primary' },
    ],
    notes: [],
  },

  starkindustries: {
    id: 'starkindustries',
    name: 'STARK-INDUSTRIES',
    badge: 'PROD #2',
    status: 'online',
    role: 'Secondary Production Server',
    colorKey: 'webPurple',
    hardware: [
      'Location: Boca Raton (Colo)',
      'Role: Secondary Production Web + Database Stack',
    ],
    apps: [
      { name: 'Web / Database Stack', category: 'devops', detail: 'Production workloads' },
    ],
    interfaces: [
      { label: 'Colo LAN', speed: 'LAN', target: 'Revelex Boca Raton /26 subnet', color: 'wan' },
    ],
    services: [
      { name: 'Web Stack', detail: 'Active production — secondary' },
    ],
    notes: [],
  },

  malibu: {
    id: 'malibu',
    name: 'MALIBU',
    badge: 'STAGING',
    status: 'staging',
    role: 'Staging / Test Environment',
    colorKey: 'webPurple',
    hardware: [
      'Location: Boca Raton (Colo)',
      'Role: Staging + Test Web + Database Stack',
    ],
    apps: [
      { name: 'Web / Database Stack', category: 'devops', detail: 'Staging environment' },
    ],
    interfaces: [
      { label: 'Colo LAN', speed: 'LAN', target: 'Revelex Boca Raton /26 subnet', color: 'wan' },
    ],
    services: [
      { name: 'Web Stack', detail: 'Staging — mirrors production for pre-deploy testing' },
    ],
    notes: [],
  },

  ms510txup: {
    id: 'ms510txup',
    name: 'MS510TXUP',
    badge: '10G LAN CORE',
    status: 'online',
    role: 'Netgear MS510TXUP — 10G/Multi-Gig Managed Switch',
    colorKey: 'cyan10g',
    hardware: [
      'Model: Netgear MS510TXUP',
      '4× 10G copper + 4× 2.5G copper + 2× SFP+ 10G',
      'PoE+ on 2.5G ports (295W budget)',
      'VLAN capable • Link aggregation • QoS',
    ],
    apps: [],
    interfaces: [
      { label: 'Uplink to GS752TPv2', speed: '1G SFP', target: 'PoE Edge switch (Cat6)', color: 'lan' },
    ],
    services: [],
    notes: [
      'Core switch for all local compute nodes',
      'Port 4 → GS752TPv2 links at 1G despite Cat6 (expected)',
      'ER4 on port 2 provides VPN gateway for WAR-MACHINE + remote sites',
    ],
    ports: [
      { port: '1', speed: '2.5G', device: 'HAPPY (10.2.10.112)', notes: 'Test runner' },
      { port: '2', speed: '2.5G', device: 'ER4', notes: 'VPN gateway → WAR-MACHINE + remote sites' },
      { port: '3', speed: '2.5G', device: 'Phone', notes: 'PoE powered' },
      { port: '4', speed: '2.5G', device: '→ GS752TPv2 uplink', notes: 'Cat6, links at 1G' },
      { port: '5', speed: '10G', device: 'SENTINEL (10.2.10.70)', notes: 'Primary inference, RTX 5090' },
      { port: '6', speed: '10G', device: 'IRON-PATRIOT (10.2.10.71)', notes: 'Docker/monitoring, RTX PRO 6000' },
      { port: '7', speed: '10G', device: 'JERICHO (10.2.10.35)', notes: 'Primary dev, RTX PRO 6000' },
      { port: '8', speed: '10G', device: 'IRONMAN (TBD)', notes: 'Threadripper PRO — future primary' },
      { port: '9 (SFP+)', speed: '10G', device: 'Spare', notes: 'Future 10G uplink or inter-switch' },
      { port: '10 (SFP+)', speed: '10G', device: 'Spare', notes: 'Future expansion' },
    ],
  },

  sn2100: {
    id: 'sn2100',
    name: 'SN2100',
    badge: '100GbE AI FABRIC',
    status: 'online',
    role: 'Mellanox SN2100 — 100GbE AI Fabric Switch',
    colorKey: 'green100g',
    hardware: [
      'Model: Mellanox SN2100 (Spectrum ASIC)',
      '16× QSFP28 100GbE ports',
      '3.2 Tb/s switching capacity',
      'RoCEv2 RDMA enabled — zero-copy model weight transfer',
    ],
    apps: [],
    interfaces: [],
    services: [],
    notes: [
      'Dedicated AI fabric — isolated from general LAN',
      'Subnet: 10.2.20.x',
      'All nodes use ConnectX-5 VPI NICs for RDMA',
    ],
    ports: [
      { port: '1', speed: '100GbE', device: 'SENTINEL (10.2.10.70)', notes: 'ConnectX-5 VPI' },
      { port: '2', speed: '100GbE', device: 'IRON-PATRIOT (10.2.10.71)', notes: 'ConnectX-5 VPI' },
      { port: '3', speed: '100GbE', device: 'JERICHO (10.2.10.35)', notes: 'ConnectX-5 VPI' },
      { port: '4', speed: '100GbE', device: 'IRONMAN (TBD)', notes: 'ConnectX-5 VPI — reserve now' },
      { port: '5-16', speed: '100GbE', device: 'Spare', notes: 'Future nodes / expansion' },
    ],
  },
}
