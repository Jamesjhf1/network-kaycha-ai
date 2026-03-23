import { C } from '../constants/colors'

/* ── Types ──────────────────────────────────────────────── */

export interface SoftwareEntry {
  name: string
  version: string
  description: string
}

export interface SoftwareCategory {
  id: string
  label: string
  icon: string
  color: string
  items: SoftwareEntry[]
}

export interface WorkstationSoftware {
  id: string
  name: string
  role: string
  color: string
  gpu: string
  ram: string
  cpu: string
  categories: SoftwareCategory[]
}

export interface MCPServer {
  name: string
  description: string
  tools: string[]
  host: string
}

export interface Skill {
  name: string
  trigger: string
  description: string
}

export interface ChromeExtension {
  name: string
  id: string
  version: string
  machines: string[]
}

export interface VersionDrift {
  software: string
  category: string
  versions: { hostname: string; version: string }[]
}

/* ── Unified Software Stack (shared across all workstations) ── */

const UNIFIED_CATEGORIES: SoftwareCategory[] = [
  {
    id: 'ai', label: 'AI / ML', icon: '🧠', color: C.purple,
    items: [
      { name: 'Ollama', version: '0.18.2', description: 'Local LLM inference server — hosts models for the fleet' },
      { name: 'NVIDIA CUDA Toolkit', version: '13.2', description: 'GPU compute platform for ML workloads' },
      { name: 'NVIDIA Nsight Compute', version: '2026.1.0', description: 'GPU kernel profiling and optimization tool' },
      { name: 'NVIDIA Nsight Systems', version: '2025.6.3', description: 'System-wide performance analysis for GPU workloads' },
      { name: 'NVIDIA Graphics Driver', version: '595.79', description: 'GPU display and compute driver' },
    ],
  },
  {
    id: 'dev', label: 'Development', icon: '⌨', color: C.accent,
    items: [
      { name: 'VS Code', version: '1.111.0', description: 'Lightweight code editor for quick edits and debugging' },
      { name: 'Cursor', version: '2.6.20', description: 'AI-powered code editor (Claude/GPT integrated)' },
      { name: 'Claude Desktop', version: 'latest', description: 'Anthropic Claude desktop client with MCP support' },
      { name: 'Claude Code', version: '2.1.79', description: 'Anthropic Claude CLI agent for multi-file agentic coding' },
      { name: 'Visual Studio Build Tools', version: '17.14.28', description: 'C/C++ compiler toolchain for native extensions' },
      { name: '.NET SDK', version: '9.0.312', description: 'Full .NET development kit' },
      { name: 'Node.js', version: '24.14.0', description: 'JavaScript runtime for server-side apps and tooling' },
      { name: 'pnpm', version: '10.32.1', description: 'Fast, disk-efficient package manager (default for Kaycha projects)' },
      { name: 'Python', version: '3.14.3', description: 'Primary scripting language for automation and ML' },
      { name: 'PowerShell 7', version: '7.5.5', description: 'Cross-platform shell and scripting framework' },
      { name: 'Git', version: '2.53.0', description: 'Distributed version control system' },
      { name: 'GitHub CLI', version: '2.88.1', description: 'Command-line interface for GitHub operations' },
      { name: 'Rustup', version: '1.28.2', description: 'Rust toolchain installer and version manager' },
      { name: 'uv', version: '0.10.10', description: 'Ultra-fast Python package manager (replaces pip)' },
      { name: 'FFmpeg', version: '8.0.1', description: 'Media processing toolkit for audio/video pipelines' },
      { name: 'jq', version: '1.8.1', description: 'Command-line JSON processor' },
      { name: 'yq', version: '4.52.4', description: 'Command-line YAML/XML/TOML processor' },
      { name: 'NSSM', version: '2.24-101', description: 'Non-Sucking Service Manager for Windows services' },
      { name: 'Wget', version: '1.21.4', description: 'Command-line HTTP/FTP downloader' },
      { name: 'GnuWin32 Make', version: '3.81', description: 'GNU Make build automation for Windows' },
      { name: 'Windows SDK', version: '10.1.26100', description: 'Windows platform development headers and libraries' },
      { name: 'Desktop Commander', version: '1.5.63', description: 'MCP-based file system and process management' },
    ],
  },
  {
    id: 'cloud', label: 'Containers & Cloud', icon: '☁', color: C.cyan10g,
    items: [
      { name: 'Docker Desktop', version: '4.64.0', description: 'Container runtime for dev and deployment' },
      { name: 'cloudflared', version: '2025.8.1', description: 'Cloudflare Tunnel daemon for secure ingress' },
      { name: 'Cloudflare WARP', version: '26.1.150.0', description: 'Cloudflare Zero Trust client for secure DNS and routing' },
      { name: 'WSL', version: '2.6.3', description: 'Windows Subsystem for Linux — Ubuntu/Debian environments' },
    ],
  },
  {
    id: 'db', label: 'Database', icon: '🗄', color: C.orange,
    items: [
      { name: 'PostgreSQL', version: '17.9-2', description: 'Primary relational database for local dev (IRON-PATRIOT)' },
    ],
  },
  {
    id: 'remote', label: 'Remote Access', icon: '🔗', color: C.teal,
    items: [
      { name: 'Tailscale', version: '1.94.2', description: 'WireGuard-based mesh VPN connecting all workstations' },
      { name: 'Parsec', version: '150-101b', description: 'Low-latency remote desktop for GPU workloads' },
      { name: 'Sunshine', version: '2025.924', description: 'Open-source game streaming server (Moonlight host)' },
      { name: 'Moonlight', version: '6.1.0', description: 'GameStream client for remote desktop access' },
      { name: 'OpenSSH', version: '10.0.0', description: 'Secure shell server for SSH/SCP fleet mesh' },
      { name: 'Mesh Agent', version: '2025-03-06', description: 'MeshCentral remote management agent' },
    ],
  },
  {
    id: 'monitor', label: 'Monitoring & Backup', icon: '📊', color: C.warning,
    items: [
      { name: 'windows_exporter', version: '0.31.3', description: 'Prometheus metrics exporter for Windows host stats' },
      { name: 'NAKIVO Backup', version: '11.0.4', description: 'Enterprise backup and replication solution' },
    ],
  },
  {
    id: 'prod', label: 'Productivity', icon: '📦', color: C.textDim,
    items: [
      { name: 'Google Chrome', version: '146.0.7680', description: 'Primary web browser' },
      { name: 'Microsoft Edge', version: '146.0.3856', description: 'Secondary browser (WebView2 runtime)' },
      { name: 'Adobe Acrobat', version: '25.001.21288', description: 'PDF creation and document management' },
      { name: 'Adobe Creative Cloud', version: '6.8.1', description: 'Adobe app manager and cloud services' },
      { name: 'Microsoft 365', version: '16.0.19725', description: 'Office suite — Word, Excel, Outlook, Teams' },
      { name: 'PowerToys', version: '0.98.0', description: 'Windows power-user utilities (FancyZones, etc.)' },
      { name: '7-Zip', version: '26.00', description: 'Archive compression and extraction utility' },
    ],
  },
]

/* ── Per-machine software overrides ────────────────────── */
/* These items are ONLY on specific machines, not fleet-wide */

const SENTINEL_EXTRAS: SoftwareCategory[] = [
  {
    id: 'sentinel-only', label: 'SENTINEL Only', icon: '⭐', color: C.green100g,
    items: [
      { name: 'AnythingLLM', version: '1.10.0', description: 'Local RAG-powered LLM chat interface' },
      { name: 'Anaconda3', version: '2024.10-1', description: 'Python data science distribution (3.12.7)' },
      { name: '1Password CLI', version: '2.32.1', description: 'Password manager command-line interface' },
      { name: 'Adobe Photoshop 2025', version: '26.11.3', description: 'Image editing and design' },
      { name: 'Adobe Photoshop 2026', version: '27.4.0', description: 'Latest Photoshop release' },
      { name: '3DMark 11', version: '1.0.179', description: 'GPU benchmark suite' },
      { name: 'Barrier', version: '2.4.0', description: 'Software KVM — share keyboard/mouse across machines' },
      { name: 'Open WebUI', version: '0.6+', description: 'Web UI for Ollama (port 3000) — model routes for fleet' },
    ],
  },
]

const IRONMAN_EXTRAS: SoftwareCategory[] = [
  {
    id: 'ironman-only', label: 'IRONMAN Only', icon: '⭐', color: C.warning,
    items: [
      { name: 'AMD Ryzen Master', version: '3.0.1.4819', description: 'CPU overclocking and monitoring for TR PRO 9995WX' },
      { name: 'QNAP Qfinder Pro', version: '7.13.2', description: 'QNAP NAS discovery and management' },
      { name: 'RAIDXpert2', version: '9.3.2', description: 'AMD RAID management suite for NVMe arrays' },
      { name: 'NVIDIA RTX Desktop Manager', version: '205.38', description: 'Multi-display workspace management for RTX GPUs' },
      { name: 'CyberPower PowerPanel', version: '2.7.0', description: 'UPS monitoring and graceful shutdown management' },
    ],
  },
]

const JERICHO_EXTRAS: SoftwareCategory[] = [
  {
    id: 'jericho-only', label: 'JERICHO Only', icon: '⭐', color: C.accent,
    items: [
      { name: 'Windsurf', version: '1.9577.27', description: 'Codeium AI code editor (alternative to Cursor)' },
      { name: 'NVIDIA RTX Desktop Manager', version: '205.38', description: 'Multi-display workspace management for RTX GPUs' },
      { name: 'iPerf3', version: '3.20', description: 'Network bandwidth measurement tool' },
    ],
  },
]

const HAPPY_EXTRAS: SoftwareCategory[] = [
  {
    id: 'happy-only', label: 'HAPPY Only', icon: '⭐', color: C.pink,
    items: [
      { name: 'iPerf3', version: '3.20', description: 'Network bandwidth measurement tool' },
    ],
  },
]

/* ── Workstation Software Inventory ─────────────────────── */

export const WORKSTATIONS_SOFTWARE: WorkstationSoftware[] = [
  {
    id: 'sentinel',
    name: 'SENTINEL',
    role: 'Primary Inference · Ollama · OWU',
    color: C.green100g,
    gpu: 'RTX 5090 32GB',
    ram: '192 GB',
    cpu: 'AMD Ryzen 9 9950X3D · 16C/32T',
    categories: [...UNIFIED_CATEGORIES, ...SENTINEL_EXTRAS],
  },
  {
    id: 'iron-patriot',
    name: 'IRON-PATRIOT',
    role: 'Docker · Monitoring · JARVIS-RAG Host',
    color: C.purple,
    gpu: 'RTX PRO 6000 96GB',
    ram: '128 GB',
    cpu: 'Intel Core Ultra 9 285K · 24C/24T',
    categories: UNIFIED_CATEGORIES,
  },
  {
    id: 'jericho',
    name: 'JERICHO',
    role: 'Primary Dev Workstation',
    color: C.accent,
    gpu: 'RTX PRO 6000 96GB',
    ram: '128 GB',
    cpu: 'Intel Core Ultra 9 285K · 24C/24T',
    categories: [...UNIFIED_CATEGORIES, ...JERICHO_EXTRAS],
  },
  {
    id: 'ironman',
    name: 'IRONMAN',
    role: 'Primary Inference · TR PRO 9995WX',
    color: C.warning,
    gpu: '2× RTX PRO 6000 192GB',
    ram: '256 GB',
    cpu: 'AMD Threadripper PRO 9995WX · 96C/192T',
    categories: [...UNIFIED_CATEGORIES, ...IRONMAN_EXTRAS],
  },
  {
    id: 'happy',
    name: 'HAPPY',
    role: 'Test Runner · NSSM Services',
    color: C.pink,
    gpu: 'GTX 1660 Ti 6GB',
    ram: '40 GB',
    cpu: 'Intel Core i7-11700 · 8C/16T',
    categories: [...UNIFIED_CATEGORIES, ...HAPPY_EXTRAS],
  },
]

/* ── MCP Servers ────────────────────────────────────────── */

export const MCP_SERVERS: MCPServer[] = [
  { name: 'jarvis-memory', description: 'QUBO-optimized context retrieval from all JARVIS knowledge sources with hybrid SA+Tabu solver', tools: ['memory_optimize', 'rag_optimize', 'rag_context', 'optimize_chunks', 'memory_write', 'memory_recall_interrupt', 'memory_update_bitmask', 'memory_health'], host: 'IRON-PATRIOT' },
  { name: 'jarvis-rag', description: 'Vector similarity search across 7 ChromaDB knowledge base collections (schemas, code, docs, regulations, financial, legal, knowledge)', tools: ['rag_search', 'rag_context', 'rag_collections'], host: 'IRON-PATRIOT' },
  { name: 'openai-consultant', description: 'Architecture Critic (o3) — schema/RLS review, edge cases, design critique', tools: ['consult_architecture'], host: 'Local' },
  { name: 'deepseek-consultant', description: 'Debugger (DeepSeek Reasoner) — step-by-step debugging, root cause analysis', tools: ['consult_debug'], host: 'Local' },
  { name: 'gemini-consultant', description: 'Strategy Advisor (Gemini 2.5 Pro) — business decisions, competitive analysis', tools: ['consult_strategy'], host: 'Local' },
  { name: 'glm-consultant', description: 'Code Consultant (GLM-5) — code review, alternative approaches, second opinions', tools: ['consult_code'], host: 'Local' },
  { name: 'owu-mcp-server', description: 'Open WebUI dispatch — route prompts to any Ollama/cloud model via OWU API', tools: ['list_models', 'dispatch_task', 'dispatch_with_context', 'dispatch_conversation', 'read_file', 'write_file', 'list_directory'], host: 'SENTINEL' },
  { name: 'kaychaexec-mcp', description: 'KaychaExec Supabase data — monthly sales, AR aging, lab metrics, sales trends', tools: ['get_monthly_sales', 'get_ar_aging', 'get_lab_metrics', 'get_companies', 'get_sales_trend', 'exec_query'], host: 'Supabase' },
  { name: 'yourcoa-mcp', description: 'YourCOA LIMS databases — sample requests, billing, throughput, failure rates across 9 state labs', tools: ['yourcoa_query', 'yourcoa_sales_summary', 'yourcoa_revenue_by_client', 'yourcoa_lab_throughput', 'yourcoa_sample_requests', 'yourcoa_failure_rates', 'yourcoa_turnaround_times', 'yourcoa_billing_summary', 'yourcoa_ar_aging', 'yourcoa_list_databases', 'yourcoa_describe_table'], host: 'MySQL' },
  { name: 'kaychadevhub', description: 'Developer hub — posts, prompts, ADRs, code snippets, standups, module health', tools: ['devhub_list_channels', 'devhub_create_post', 'devhub_search', 'devhub_list_adrs', 'devhub_create_adr', 'devhub_list_snippets', 'devhub_submit_standup', 'devhub_get_module_health'], host: 'Supabase' },
  { name: 'desktop-commander', description: 'File system operations, process management, streaming search across local machines', tools: ['read_file', 'write_file', 'edit_block', 'start_process', 'list_directory', 'start_search', 'get_file_info', 'write_pdf'], host: 'Local' },
  { name: 'github', description: 'GitHub API — repos, issues, PRs, code search, branch management', tools: ['create_or_update_file', 'search_repositories', 'create_pull_request', 'list_issues', 'search_code', 'push_files', 'merge_pull_request', 'get_pull_request_files'], host: 'GitHub' },
  { name: 'supabase', description: 'Supabase project management — SQL, migrations, edge functions, branches, types', tools: ['execute_sql', 'apply_migration', 'deploy_edge_function', 'list_tables', 'generate_typescript_types', 'get_logs', 'get_advisors', 'search_docs'], host: 'Supabase' },
  { name: 'cloudflare', description: 'Cloudflare infrastructure — Workers, D1, KV, R2, Hyperdrive, documentation search', tools: ['workers_list', 'd1_database_query', 'kv_namespaces_list', 'r2_buckets_list', 'search_cloudflare_documentation', 'hyperdrive_configs_list'], host: 'Cloudflare' },
  { name: 'netlify', description: 'Netlify project management — deploy, env vars, forms, teams, build config', tools: ['get-project', 'deploy-site', 'manage-env-vars', 'get-extensions', 'get-netlify-coding-context'], host: 'Netlify' },
  { name: 'puppeteer', description: 'Headless browser automation — navigate, screenshot, click, evaluate JS', tools: ['puppeteer_navigate', 'puppeteer_screenshot', 'puppeteer_click', 'puppeteer_evaluate'], host: 'Local' },
  { name: 'playwright', description: 'Browser automation via Playwright — snapshot, click, fill, navigate, tabs, network', tools: ['browser_snapshot', 'browser_click', 'browser_navigate', 'browser_take_screenshot', 'browser_fill_form', 'browser_evaluate', 'browser_run_code'], host: 'Local' },
  { name: 'claude-in-chrome', description: 'Chrome browser control — read page, find elements, execute JS, manage tabs, GIF recording', tools: ['read_page', 'find', 'javascript_tool', 'computer', 'navigate', 'tabs_context_mcp', 'gif_creator', 'form_input', 'upload_image'], host: 'Chrome' },
  { name: 'claude-preview', description: 'Dev server management — start/stop servers, screenshots, snapshots, inspect, click, network', tools: ['preview_start', 'preview_stop', 'preview_screenshot', 'preview_snapshot', 'preview_inspect', 'preview_click', 'preview_fill', 'preview_eval', 'preview_network', 'preview_logs', 'preview_console_logs', 'preview_resize'], host: 'Local' },
  { name: 'scheduled-tasks', description: 'Persistent scheduled task runner — cron-based recurring jobs and one-shot reminders', tools: ['list_scheduled_tasks', 'create_scheduled_task', 'update_scheduled_task'], host: 'Local' },
  { name: 'tavily', description: 'Web search and content extraction — search, extract, crawl, map, deep research', tools: ['tavily_search', 'tavily_extract', 'tavily_crawl', 'tavily_map', 'tavily_research'], host: 'Cloud' },
  { name: 'gmail', description: 'Gmail integration — search, read, draft, send emails', tools: ['gmail_search_messages', 'gmail_read_message', 'gmail_read_thread', 'gmail_create_draft', 'gmail_list_labels', 'gmail_get_profile', 'gmail_list_drafts'], host: 'Google' },
  { name: 'gcal', description: 'Google Calendar — create/update/delete events, find free time, meeting scheduling', tools: ['gcal_create_event', 'gcal_list_events', 'gcal_find_meeting_times', 'gcal_find_my_free_time', 'gcal_update_event', 'gcal_delete_event', 'gcal_respond_to_event', 'gcal_list_calendars', 'gcal_get_event'], host: 'Google' },
  { name: 'google-drive', description: 'Google Drive file search and document retrieval', tools: ['google_drive_search', 'google_drive_fetch'], host: 'Google' },
  { name: 'ollama', description: 'Local Ollama code tools — generate, explain, review, refactor, fix, test code', tools: ['ollama_generate_code', 'ollama_generate_code_with_context', 'ollama_explain_code', 'ollama_explain_file', 'ollama_review_code', 'ollama_review_file', 'ollama_refactor_code', 'ollama_fix_code', 'ollama_write_tests', 'ollama_analyze_files', 'ollama_general_task'], host: 'Local' },
  { name: 'filesystem', description: 'Sandboxed filesystem — read, write, edit, search files within allowed directories', tools: ['read_text_file', 'read_media_file', 'read_multiple_files', 'write_file', 'edit_file', 'search_files', 'list_directory', 'directory_tree', 'create_directory', 'move_file', 'get_file_info'], host: 'Local' },
  { name: 'mcp-registry', description: 'MCP connector registry — search for and suggest available MCP integrations', tools: ['search_mcp_registry', 'suggest_connectors'], host: 'Cloud' },
]

/* ── Skills ─────────────────────────────────────────────── */

export const SKILLS: Skill[] = [
  { name: 'vibe-coding-partner', trigger: 'Any code/debug/feature request', description: 'Full-stack coding assistant — components, APIs, migrations, debugging' },
  { name: 'financial-analyst', trigger: 'Revenue, costs, margins, board decks', description: 'CFO assistant — P&L, budgets, Sage X3, AR aging, shareholder comms' },
  { name: 'ai-orchestration', trigger: 'Model routing, RAG, OWU config', description: 'AI model management, JARVIS-KB, embedding pipelines, context optimization' },
  { name: 'schedule', trigger: 'Recurring tasks, cron jobs', description: 'Create and manage scheduled tasks with cron expressions' },
  { name: 'mcp-builder', trigger: 'Build MCP server', description: 'Guide for creating MCP servers in Python (FastMCP) or TypeScript' },
  { name: 'skill-creator', trigger: 'Create/edit/test skills', description: 'Build new skills, run evals, benchmark performance' },
  { name: 'internal-comms', trigger: 'Status reports, memos, newsletters', description: 'Write internal communications in company-standard formats' },
  { name: 'canvas-design', trigger: 'Create poster, art, design', description: 'Visual design in PNG/PDF using design philosophy principles' },
  { name: 'web-artifacts-builder', trigger: 'Complex React artifacts', description: 'Multi-component HTML artifacts with React, Tailwind, shadcn/ui' },
  { name: 'theme-factory', trigger: 'Style/theme artifacts', description: '10 preset themes for slides, docs, reports, landing pages' },
  { name: 'pdf', trigger: '.pdf file operations', description: 'Read, merge, split, watermark, encrypt, OCR PDF files' },
  { name: 'docx', trigger: '.docx file operations', description: 'Create, edit, format Word documents with TOC, headers, images' },
  { name: 'xlsx', trigger: 'Spreadsheet operations', description: 'Read, edit, create Excel files — formulas, charts, data cleaning' },
  { name: 'pptx', trigger: '.pptx file operations', description: 'Create, edit, parse PowerPoint presentations and slide decks' },
  { name: 'claude-api', trigger: 'Anthropic SDK / Claude API', description: 'Build apps with Claude API, Anthropic SDKs, and Agent SDK' },
  { name: 'simplify', trigger: '/simplify', description: 'Review changed code for reuse, quality, and efficiency' },
  { name: 'loop', trigger: '/loop interval /command', description: 'Run a prompt or slash command on a recurring interval' },
  { name: 'keybindings-help', trigger: 'Customize keyboard shortcuts', description: 'Rebind keys, add chord shortcuts, modify keybindings.json' },
  { name: 'update-config', trigger: 'Configure settings, hooks, permissions', description: 'Manage Claude Code harness settings, hooks, env vars, permissions' },
]

/* ── Chrome Extensions (fleet-wide) ────────────────────── */

export const CHROME_EXTENSIONS: ChromeExtension[] = [
  { name: 'Claude', id: 'fcoeoabgfenejglbffodgkkbkcdhcgfn', version: '1.0.63', machines: ['SENTINEL', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: '1Password', id: 'aeblfdkhhhdcdjpifhhbdiojplfjncoa', version: '8.12.8.26', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Grammarly', id: 'kbfnbcaeplbcioakkpcpgfkobkghlhen', version: '14.1277.0', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Bitwarden', id: 'ohfgljdgelakfkefopgklcohadegdpjf', version: '0.23.18', machines: ['SENTINEL', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'AbacusAI', id: 'dnlbfebpeemnjlnehbalkhkmghljjbbi', version: '1.1.6', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Apollo.io', id: 'alhgpfoeiimagjlnfekdhkjlkiomcapa', version: '14.0.0', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Loom Screen Recorder', id: 'liecbddmkiiihnedobmlmillhodjkdmb', version: '5.5.173', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Screencastify', id: 'mmeijimgabbpbgpdklnllpncmdofkcpn', version: '4.22.4', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Tampermonkey', id: 'dhdgffkkebhmkfjojejmpbldmpobfkfo', version: '5.4.1', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Auto Dark Mode', id: 'bhghoamapcdpbohphigoooaddinpkbai', version: '8.0.1', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Open Multiple URLs', id: 'oifijhaokejakekmnjmphonojcfkpbbh', version: '1.7.5', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Trello Card Counter', id: 'ggamggchfpnmhmkeicjgpedgjcllcefp', version: '2.0.0', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Google Translate', id: 'aapbdbdomjkkjkaonfhkkikfgjllcleb', version: '2.0.16', machines: ['SENTINEL', 'IRON-PATRIOT', 'JERICHO', 'IRONMAN', 'HAPPY'] },
  { name: 'Adobe Acrobat PDF', id: 'efaidnbmnnnibpcajpcglclefindmkaj', version: '26.2.2.1', machines: ['SENTINEL', 'IRONMAN', 'HAPPY'] },
  { name: 'Google Docs Offline', id: 'ghbmnnjooekpmoecnnnilnnbdlolhkhi', version: '1.102.1', machines: ['SENTINEL', 'HAPPY'] },
  { name: 'Okta Browser Plugin', id: 'foikfmnjgoljejophccdlhenbkogiemo', version: '0.5.0', machines: ['SENTINEL', 'HAPPY'] },
  { name: 'Read on reMarkable', id: 'bfhkfdnddlhfippjbflipboognpdpoeh', version: '1.2.6', machines: ['HAPPY'] },
]

/* ── Version Drift (live scan 2026-03-23) ──────────────── */

export const VERSION_DRIFT: VersionDrift[] = [
  { software: 'Ollama', category: 'ai_tool', versions: [
    { hostname: 'SENTINEL', version: '0.18.2' }, { hostname: 'IRON-PATRIOT', version: '0.18.2' },
    { hostname: 'JERICHO', version: '0.18.2' }, { hostname: 'IRONMAN', version: '0.18.2' },
    { hostname: 'HAPPY', version: '0.17.6' },
  ]},
  { software: 'NVIDIA Graphics Driver', category: 'driver', versions: [
    { hostname: 'SENTINEL', version: '595.79' }, { hostname: 'IRON-PATRIOT', version: '595.79' },
    { hostname: 'JERICHO', version: '595.79' }, { hostname: 'IRONMAN', version: '595.79' },
    { hostname: 'HAPPY', version: '581.95' },
  ]},
  { software: 'Docker Desktop', category: 'dev_tool', versions: [
    { hostname: 'SENTINEL', version: '4.64.0' }, { hostname: 'IRON-PATRIOT', version: '4.64.0' },
    { hostname: 'JERICHO', version: '4.64.0' }, { hostname: 'IRONMAN', version: '4.64.0' },
    { hostname: 'HAPPY', version: '4.63.0' },
  ]},
  { software: 'VS Code', category: 'dev_tool', versions: [
    { hostname: 'SENTINEL', version: '1.109.5' }, { hostname: 'IRON-PATRIOT', version: '1.109.5' },
    { hostname: 'JERICHO', version: '1.111.0' }, { hostname: 'IRONMAN', version: '1.111.0' },
    { hostname: 'HAPPY', version: '1.111.0' },
  ]},
  { software: 'Cursor', category: 'dev_tool', versions: [
    { hostname: 'SENTINEL', version: '2.6.19' }, { hostname: 'IRON-PATRIOT', version: '2.6.19' },
    { hostname: 'JERICHO', version: '2.6.20' }, { hostname: 'IRONMAN', version: '2.6.20' },
    { hostname: 'HAPPY', version: '2.6.19' },
  ]},
  { software: 'GitHub CLI', category: 'dev_tool', versions: [
    { hostname: 'SENTINEL', version: '2.88.1' }, { hostname: 'IRON-PATRIOT', version: '2.88.1' },
    { hostname: 'JERICHO', version: '2.88.1' }, { hostname: 'IRONMAN', version: '2.88.1' },
    { hostname: 'HAPPY', version: '2.87.3' },
  ]},
  { software: 'Google Chrome', category: 'productivity', versions: [
    { hostname: 'SENTINEL', version: '146.0.7680.80' }, { hostname: 'IRON-PATRIOT', version: '146.0.7680.80' },
    { hostname: 'JERICHO', version: '146.0.7680.80' }, { hostname: 'IRONMAN', version: '146.0.7680.153' },
    { hostname: 'HAPPY', version: '146.0.7680.80' },
  ]},
  { software: 'windows_exporter', category: 'system', versions: [
    { hostname: 'SENTINEL', version: '0.29.2' }, { hostname: 'IRON-PATRIOT', version: '0.29.2' },
    { hostname: 'JERICHO', version: '0.31.3' }, { hostname: 'IRONMAN', version: '0.31.3' },
    { hostname: 'HAPPY', version: '0.29.2' },
  ]},
  { software: 'Visual Studio Build Tools', category: 'dev_tool', versions: [
    { hostname: 'SENTINEL', version: '17.14.27' }, { hostname: 'IRON-PATRIOT', version: '17.14.27' },
    { hostname: 'JERICHO', version: '17.14.28' }, { hostname: 'IRONMAN', version: '17.14.28' },
    { hostname: 'HAPPY', version: '17.14.28' },
  ]},
  { software: 'Git', category: 'dev_tool', versions: [
    { hostname: 'SENTINEL', version: '2.53.0' }, { hostname: 'IRON-PATRIOT', version: '2.53.0' },
    { hostname: 'JERICHO', version: '2.53.0' }, { hostname: 'IRONMAN', version: '2.53.0.2' },
    { hostname: 'HAPPY', version: '2.53.0.2' },
  ]},
  { software: 'Adobe Creative Cloud', category: 'productivity', versions: [
    { hostname: 'SENTINEL', version: '6.8.1.865' },
    { hostname: 'IRONMAN', version: '6.8.1.865' },
    { hostname: 'HAPPY', version: '6.9.0.618' },
  ]},
]

/* ── Stats ──────────────────────────────────────────────── */

export const SOFTWARE_STATS = {
  totalMCPServers: MCP_SERVERS.length,
  totalMCPTools: MCP_SERVERS.reduce((sum, s) => sum + s.tools.length, 0),
  totalSkills: SKILLS.length,
  totalWorkstations: WORKSTATIONS_SOFTWARE.length,
  totalChromeExtensions: CHROME_EXTENSIONS.length,
  totalVersionDrifts: VERSION_DRIFT.length,
  auditDate: '2026-03-23',
}
