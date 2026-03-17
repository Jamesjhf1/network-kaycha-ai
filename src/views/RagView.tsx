import { C } from '../constants/colors'

/* ── Sub-components (matching MemoryView style) ─────────── */

function Phase({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border p-5 pt-6" style={{ borderColor: color + '30' }}>
      <div
        className="absolute -top-2.5 left-5 px-2.5 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color, background: C.bg }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

const nodeColors = {
  client:     { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)',  title: '#c4b5fd' },
  mcp:        { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', title: '#93c5fd' },
  api:        { bg: 'rgba(129,140,248,0.12)',border: 'rgba(129,140,248,0.35)',title: '#a5b4fc' },
  vector:     { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', title: '#6ee7b7' },
  bm25:       { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', title: '#fcd34d' },
  collection: { bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.35)', title: '#5eead4' },
  source:     { bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.35)',title: '#fca5a5' },
  schedule:   { bg: 'rgba(253,186,116,0.12)',border: 'rgba(253,186,116,0.35)',title: '#fdba74' },
  embed:      { bg: 'rgba(244,114,182,0.12)',border: 'rgba(244,114,182,0.35)',title: '#f9a8d4' },
  muted:      { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', title: '#94a3b8' },
}

function Node({ icon, title, detail, file, variant }: {
  icon: string; title: string; detail: string; file?: string
  variant: keyof typeof nodeColors
}) {
  const nc = nodeColors[variant]
  return (
    <div
      className="flex flex-col items-center p-3.5 rounded-lg text-center min-w-[150px] max-w-[220px] transition-transform hover:-translate-y-0.5"
      style={{ background: nc.bg, border: `1px solid ${nc.border}` }}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-[13px] font-semibold leading-tight" style={{ color: nc.title }}>{title}</span>
      <span className="text-[10.5px] mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.55)' }}>{detail}</span>
      {file && <span className="text-[9.5px] font-mono mt-1.5 break-all" style={{ color: 'rgba(255,255,255,0.35)' }}>{file}</span>}
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex justify-center py-1.5">
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div className="w-0 h-0" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid rgba(255,255,255,0.3)' }} />
      </div>
    </div>
  )
}

function HArrow() {
  return <span className="text-xl" style={{ color: 'rgba(255,255,255,0.25)' }}>&rarr;</span>
}

function HFlow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center gap-2 flex-wrap">{children}</div>
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
      style={{ background: color + '20', border: `1px solid ${color}40`, color }}
    >
      {children}
    </span>
  )
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg border text-center px-5 py-3.5 min-w-[130px]" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[11px]" style={{ color: C.textDim }}>{label}</div>
    </div>
  )
}

function InfoBlock({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="rounded-lg border p-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="text-[12px] font-semibold mb-2" style={{ color }}>{title}</div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] leading-relaxed" style={{ color: C.textDim }}>
            <span style={{ color: color + 'aa' }}>-</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Collection Status Data ─────────────────────────────── */

const collections = [
  {
    name: 'jarvis_documents',
    chunks: '176K+',
    chunkSize: '1024',
    overlap: '200',
    bm25: 'SKIPPED',
    status: 'needs_reingest' as const,
    note: 'Largest collection — BM25 disabled (exceeds 80K doc limit), vector-only',
  },
  {
    name: 'jarvis_financial',
    chunks: '53K+',
    chunkSize: '1024',
    overlap: '100',
    bm25: 'OK',
    status: 'ok' as const,
    note: 'Daily Supabase pull — exec_sales_monthly_company, AR aging, TAT metrics',
  },
  {
    name: 'jarvis_legal',
    chunks: '27,974',
    chunkSize: '1536',
    overlap: '300',
    bm25: 'OK',
    status: 'needs_reingest' as const,
    note: 'Contracts, NDAs, compliance agreements — missing embed_model metadata (cosmetic)',
  },
  {
    name: 'jarvis_regulations',
    chunks: '87',
    chunkSize: '1536',
    overlap: '300',
    bm25: 'OK',
    status: 'ok' as const,
    note: '10-state cannabis testing compliance rules — weekly Sunday refresh',
  },
  {
    name: 'jarvis_knowledge',
    chunks: '—',
    chunkSize: '768',
    overlap: '150',
    bm25: 'OK',
    status: 'needs_reingest' as const,
    note: 'Architecture decisions, patterns, ops runbooks — missing embed_model (cosmetic)',
  },
  {
    name: 'jarvis_schemas',
    chunks: '—',
    chunkSize: '4096',
    overlap: '0',
    bm25: 'OK',
    status: 'needs_reingest' as const,
    note: 'Full DB schemas, no overlap (tables inlined whole) — missing embed_model (cosmetic)',
  },
  {
    name: 'jarvis_code',
    chunks: '—',
    chunkSize: '512',
    overlap: '50',
    bm25: 'OK',
    status: 'needs_reingest' as const,
    note: 'Source code from 11+ active repos — missing embed_model (cosmetic, search works)',
  },
]

/* ── Legend ─────────────────────────────────────────────── */

const legendItems = [
  { color: '#8b5cf6', label: 'Clients' },
  { color: '#60a5fa', label: 'MCP Tools' },
  { color: '#a5b4fc', label: 'REST API' },
  { color: '#34d399', label: 'Vector Search' },
  { color: '#fbbf24', label: 'BM25 Hybrid' },
  { color: '#2dd4bf', label: 'Collections' },
  { color: '#f87171', label: 'Ingest Sources' },
  { color: '#fdba74', label: 'Schedules' },
]

/* ── Main View ──────────────────────────────────────────── */

export function RagView() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Title + Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: C.textBright }}>JARVIS RAG — Knowledge Retrieval</h2>
          <p className="text-[11px] mt-1" style={{ color: C.textDim }}>
            Hybrid vector + BM25 retrieval across 7 ChromaDB collections. Serves Claude Code, Claude Desktop,
            and Cursor via MCP SSE proxy on IRON-PATRIOT. nomic-embed-text 768d embeddings via SENTINEL.
            QUBO-optimized context assembly when combined with jarvis-memory.
          </p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {legendItems.map((l) => (
            <Badge key={l.label} color={l.color}>{l.label}</Badge>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-3 flex-wrap justify-center">
        <StatCard value="7" label="Collections" color={C.teal} />
        <StatCard value="176K+" label="Doc Chunks" color={C.blue} />
        <StatCard value="768d" label="Embed Dim" color={C.purple} />
        <StatCard value="Hybrid" label="Search Mode" color={C.green100g} />
        <StatCard value="3" label="MCP Tools" color={C.orange} />
        <StatCard value="2×/day" label="Live Refresh" color={C.pink} />
      </div>

      {/* ── Clients ───────────────────────────────────────── */}
      <Phase label="Clients" color="#8b5cf6">
        <HFlow>
          <Node icon="&lt;/&gt;" title="Claude Code" detail="CLI — JERICHO / IRONMAN" variant="client" />
          <Node icon="D" title="Claude Desktop" detail="GUI — JERICHO / IRONMAN" variant="client" />
          <Node icon="C" title="Cursor" detail="IDE — JERICHO / IRONMAN" variant="client" />
        </HFlow>
        <div className="text-[10px] text-center mt-3" style={{ color: C.textDim }}>
          All clients connect via <span style={{ color: '#c4b5fd' }}>mcp-remote</span> →{' '}
          <span style={{ color: '#c4b5fd' }}>IRON-PATRIOT:8101</span> (SSE).
          3 available tools: rag_search, rag_context, rag_collections.
        </div>
      </Phase>

      <Arrow />

      {/* ── MCP Layer ─────────────────────────────────────── */}
      <Phase label="MCP Layer — 3 Tools (IRON-PATRIOT:8101 SSE)" color="#60a5fa">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Node icon="🔍" title="rag_search" detail="Semantic + hybrid search" file="n_results: 1–50 (default 10)" variant="mcp" />
            <InfoBlock title="Parameters" color="#60a5fa" items={[
              'query: natural language string',
              'n_results: max results to return (default 10)',
              'collections: comma-sep filter or all 7',
              'Returns: ranked results with scores + source',
              'Best for: finding specific facts or code snippets',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="📄" title="rag_context" detail="Pre-formatted context block" file="max_tokens: 4K default, 16K max" variant="mcp" />
            <InfoBlock title="Parameters" color="#60a5fa" items={[
              'query: natural language question or topic',
              'max_tokens: 4000 default, 16000 max',
              'collections: optional filter',
              'Returns: [Source N: …] formatted block',
              'Best for: session-start prompt injection',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="📊" title="rag_collections" detail="Collection stats + metadata" file="IRON-PATRIOT:8101 → :8100" variant="mcp" />
            <InfoBlock title="Returns" color="#60a5fa" items={[
              'Collection names and document counts',
              'Embedding model per collection',
              'BM25 availability per collection',
              'Last ingest timestamp',
              'Best for: health checks + debugging',
            ]} />
          </div>
        </div>
        <div className="mt-3 text-[10px] text-center" style={{ color: C.textDim }}>
          MCP server at :8101 is an HTTP proxy — rewrote 2026-03-14 to forward requests to REST API at :8100.
          Timeout fix applied. IRONMAN + JERICHO register via .claude.json mcp-remote config.
        </div>
      </Phase>

      <Arrow />

      {/* ── REST API ──────────────────────────────────────── */}
      <Phase label="REST API — IRON-PATRIOT:8100 (Python/FastAPI)" color="#a5b4fc">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#a5b4fc' }}>Endpoints</div>
            <HFlow>
              <Node icon="P" title="POST /search" detail="Hybrid similarity search" variant="api" />
              <Node icon="P" title="POST /context" detail="Token-limited context block" variant="api" />
            </HFlow>
            <HFlow>
              <Node icon="G" title="GET /collections" detail="List all collections + stats" variant="api" />
              <Node icon="G" title="GET /health" detail="Service liveness check" variant="api" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <InfoBlock title="Runtime" color="#a5b4fc" items={[
              'System Python — C:\\Python312 (NOT a venv)',
              'Phase 2 deps: rank-bm25, sentence-transformers',
              'Install via: C:\\Python312\\python.exe -m pip install …',
              'Served via NSSM Windows service (auto-restart)',
              'Logs: E:\\Projects\\jarvis-rag\\logs\\',
            ]} />
            <InfoBlock title="Auth + Observability" color="#a5b4fc" items={[
              'Bearer token auth (mandatory on all endpoints)',
              'Rate limiting: 30 req/min token bucket',
              'Circuit breakers per retrieval source',
              'Prometheus /metrics endpoint',
              'Request tracing via X-Request-ID header',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Hybrid Search Engine ──────────────────────────── */}
      <Phase label="Hybrid Search Engine" color="#34d399">
        <div className="space-y-4">

          {/* Vector */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#6ee7b7' }}>1. Vector Search (ChromaDB — cosine similarity)</div>
            <HFlow>
              <Node icon="E" title="Query Embed" detail="nomic-embed-text 768d" file="SENTINEL:11434 (Ollama)" variant="vector" />
              <HArrow />
              <Node icon="C" title="ChromaDB" detail="Cosine distance search" file="All 7 collections, local" variant="vector" />
              <HArrow />
              <Node icon="R" title="Vector Results" detail="Top-N by cosine score" file="Filtered by collection if set" variant="vector" />
            </HFlow>
          </div>

          {/* BM25 */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fcd34d' }}>2. BM25 Keyword Search (rank-bm25 — 6 of 7 collections)</div>
            <HFlow>
              <Node icon="T" title="Tokenize Query" detail="Simple whitespace + lower" variant="bm25" />
              <HArrow />
              <Node icon="I" title="BM25 Index" detail="In-memory LRU, MAX_CACHED=2" file="Rebuilt nightly 2:00 AM" variant="bm25" />
              <HArrow />
              <Node icon="R" title="BM25 Results" detail="Ranked by BM25 score" file="jarvis_documents SKIPPED" variant="bm25" />
            </HFlow>
            <div className="text-[10px] text-center mt-2" style={{ color: C.textDim }}>
              <span style={{ color: '#f87171' }}>jarvis_documents (176K+ chunks)</span> intentionally skipped —
              exceeds BM25_MAX_DOCS=80K. BM25_MAX_DOCS and MAX_CACHED_INDEXES configurable in{' '}
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>retrieval/bm25_index.py</span>
            </div>
          </div>

          {/* Fusion */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#6ee7b7' }}>3. Reciprocal Rank Fusion — Merge + Re-rank</div>
            <div className="rounded-lg border p-4 font-mono text-[11px] leading-relaxed" style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }}>
              <div>score(d) = <span style={{ color: '#fcd34d' }}>alpha</span> × vector_score(d)</div>
              <div className="ml-10">+ <span style={{ color: '#fb923c' }}>(1 − alpha)</span> × bm25_score(d)</div>
              <div className="mt-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{'// Results merged, de-duplicated, re-ranked, trimmed to token budget'}</div>
            </div>
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── 7 Collections ─────────────────────────────────── */}
      <Phase label="7 ChromaDB Collections — Chunk Config + Status" color="#2dd4bf">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {collections.map((col) => (
            <div
              key={col.name}
              className="rounded-lg border p-3.5"
              style={{
                background: col.status === 'ok' ? 'rgba(52,211,153,0.04)' : 'rgba(251,191,36,0.03)',
                borderColor: col.status === 'ok' ? 'rgba(52,211,153,0.2)' : 'rgba(251,191,36,0.15)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[12px] font-semibold font-mono" style={{ color: '#5eead4' }}>{col.name}</div>
                  <div className="text-[10.5px] mt-0.5 leading-snug" style={{ color: C.textDim }}>{col.note}</div>
                </div>
                <div
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap"
                  style={{
                    background: col.status === 'ok' ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.12)',
                    color: col.status === 'ok' ? '#34d399' : '#fbbf24',
                    border: `1px solid ${col.status === 'ok' ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.25)'}`,
                  }}
                >
                  {col.status === 'ok' ? 'CURRENT' : 'NEEDS REINGEST'}
                </div>
              </div>
              <div className="flex gap-4 mt-2 flex-wrap">
                <span className="text-[10px]" style={{ color: C.textDim }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>chunks:</span>{' '}
                  <span style={{ color: C.textBright }}>{col.chunks}</span>
                </span>
                <span className="text-[10px]" style={{ color: C.textDim }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>chunk_size:</span>{' '}
                  <span style={{ color: C.textBright }}>{col.chunkSize}</span>
                </span>
                <span className="text-[10px]" style={{ color: C.textDim }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>overlap:</span>{' '}
                  <span style={{ color: C.textBright }}>{col.overlap}</span>
                </span>
                <span className="text-[10px]" style={{ color: C.textDim }}>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>bm25:</span>{' '}
                  <span style={{ color: col.bm25 === 'OK' ? '#34d399' : '#f87171' }}>{col.bm25}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-center" style={{ color: C.textDim }}>
          <span style={{ color: '#fbbf24' }}>NEEDS REINGEST</span> = cosmetic only — missing{' '}
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>embed_model</span> metadata from pre-Phase-1 ingestion.
          Search works. Run <span style={{ color: 'rgba(255,255,255,0.4)' }}>maintenance.py reingest &lt;collection&gt;</span> to resolve.
        </div>
      </Phase>

      <Arrow />

      {/* ── Ingest Pipeline ───────────────────────────────── */}
      <Phase label="Ingest Pipeline" color="#f87171">
        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fca5a5' }}>Data Sources</div>
            <HFlow>
              <Node icon="🗄" title="Supabase" detail="Financial data — exec schema" file="wqvdwngeewtuqcqtdhfd" variant="source" />
              <Node icon="⚖" title="Regulations" detail="10-state cannabis compliance" file="Text files + scraped docs" variant="source" />
              <Node icon="📁" title="Documents" detail="SOPs, reports, HR policies" file="jarvis-rag/data/documents/" variant="source" />
              <Node icon="⚖" title="Legal" detail="Contracts, NDAs, agreements" file="jarvis-rag/data/legal/" variant="source" />
              <Node icon="&lt;/&gt;" title="Code" detail="11+ active repos, src/**" file="direct-ingest.py" variant="source" />
              <Node icon="🧠" title="Knowledge" detail="Architecture, runbooks, patterns" file="Manual + session writes" variant="source" />
            </HFlow>
          </div>

          <Arrow />

          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fca5a5' }}>Processing Pipeline</div>
            <HFlow>
              <Node icon="L" title="Loader" detail="File-type aware parsing" variant="muted" />
              <HArrow />
              <Node icon="C" title="Chunker" detail="COLLECTION_CHUNK_CONFIG driven" file="config.py" variant="muted" />
              <HArrow />
              <Node icon="E" title="Embedder" detail="nomic-embed-text 768d batch=50" file="SENTINEL:11434" variant="embed" />
              <HArrow />
              <Node icon="S" title="ChromaDB Store" detail="Upsert with embed_model + date" file="IRON-PATRIOT local" variant="collection" />
            </HFlow>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <InfoBlock title="maintenance.py CLI (all ops)" color="#f87171" items={[
              'python maintenance.py bm25 — rebuild BM25 all collections',
              'python maintenance.py bm25 jarvis_financial — single collection',
              'python maintenance.py reingest regulations — clear + re-ingest',
              'python maintenance.py reingest financial — needs SUPABASE_SERVICE_KEY',
              'python maintenance.py embed-check — find stale embed_model metadata',
              'python maintenance.py all — BM25 + embed-check + financial',
            ]} />
            <InfoBlock title="Ingest Notes" color="#f87171" items={[
              'Use direct-ingest.py for ad-hoc / one-off ingestion',
              'ingest-all.py is RETIRED — redundant, do not use',
              'SUPABASE_SERVICE_KEY → E:\\Projects\\jarvis-rag\\.env (auto-loaded)',
              'Key source: G:\\Projects\\kaycha-dataroom\\.env.local as SUPABASE_SERVICE_ROLE_KEY',
              'Financial ref schema: wqvdwngeewtuqcqtdhfd (exec_sales_monthly_company JOIN finance_companies)',
              'USE fc.company_name (NOT fc.name) in financial queries',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Maintenance Schedules ─────────────────────────── */}
      <Phase label="Maintenance Schedules — Windows Task Scheduler (IRON-PATRIOT)" color="#fdba74">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fdba74' }}>Scheduled Tasks</div>
            <HFlow>
              <Node icon="⏰" title="Live Refresh" detail="6:00 AM + 6:00 PM daily" file="financial + regulations" variant="schedule" />
              <Node icon="⏰" title="BM25 Nightly" detail="2:00 AM daily" file="JarvisRAG-BM25-Nightly" variant="schedule" />
            </HFlow>
            <HFlow>
              <Node icon="⏰" title="Financial Daily" detail="3:30 AM daily" file="JarvisRAG-Financial-Daily" variant="schedule" />
              <Node icon="⏰" title="Regulations Weekly" detail="3:00 AM Sundays" file="JarvisRAG-Regulations-Weekly" variant="schedule" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <InfoBlock title="Task Wrapper Bats" color="#fdba74" items={[
              'tools/task-bm25.bat → maintenance.py bm25',
              'tools/task-financial.bat → maintenance.py reingest financial',
              'tools/task-regulations.bat → maintenance.py reingest regulations',
              'Logs: E:\\Projects\\jarvis-rag\\logs\\live-refresh-YYYY-MM-DD.log',
              'Last clean run (2026-03-16 06:00): completed in 26.7s',
            ]} />
            <InfoBlock title="Phase 2+3 Migration Status (2026-03-17)" color="#fdba74" items={[
              'jarvis_regulations: CURRENT — 87 chunks @ 1536/300',
              'jarvis_financial: CURRENT — 53K+ chunks @ 1024/100',
              'jarvis_legal: 27,974 chunks — needs_reingest (cosmetic)',
              'jarvis_documents: 176K+ — needs_reingest + BM25 intentionally skipped',
              'jarvis_schemas, jarvis_code, jarvis_knowledge: needs_reingest (cosmetic)',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Infrastructure ────────────────────────────────── */}
      <Phase label="Infrastructure" color="#94a3b8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="IRON-PATRIOT (Primary Host)" color={C.teal} items={[
            ':8100 — jarvis-rag REST API (Python/FastAPI, NSSM)',
            ':8101 — jarvis-rag MCP SSE (HTTP proxy → :8100)',
            'Tailscale: 100.75.25.51 | LAN: 192.168.1.42',
            'RTX PRO 6000 96GB, 128GB RAM',
            'ChromaDB local storage (E:\\Projects\\jarvis-rag\\data\\)',
            'System Python: C:\\Python312 (not venv)',
          ]} />
          <InfoBlock title="SENTINEL (Embedding + Replica)" color={C.blue} items={[
            ':11434 — Ollama (nomic-embed-text 768d)',
            'Tailscale: 100.98.251.57 | LAN: 192.168.1.40',
            'RTX 5090 32GB, 64GB RAM',
            'RAG replica: nightly sync 2:00 AM',
            'Watchdog: every 5 min',
            'Ollama batch size: 50 embeddings per call',
          ]} />
          <InfoBlock title="Distribution + Backups" color={C.green100g} items={[
            'RAG cache: weekly SCP export to 4 remote machines (Sun 3AM)',
            'pg_dump: daily 4:00 AM auto-backup on IRON-PATRIOT',
            'jarvis-rag MCP registered in .claude.json (not settings.json)',
            'IRONMAN + JERICHO: connect via mcp-remote to IRON-PATRIOT:8101',
            'Config source: E:\\Projects\\ai-context\\master-config.yaml',
          ]} />
        </div>
      </Phase>

      {/* ── End-to-End Query Flow ─────────────────────────── */}
      <div className="rounded-xl border p-5" style={{ borderColor: C.accent + '30', background: C.accent + '05' }}>
        <div className="text-[12px] font-semibold mb-3" style={{ color: C.accent }}>END-TO-END QUERY FLOW</div>
        <div className="font-mono text-[11px] space-y-1.5 mb-4" style={{ color: C.textDim }}>
          <div>
            <span style={{ color: '#8b5cf6' }}>1. Client</span>
            {' → '}rag_context(<span style={{ color: '#fbbf24' }}>"cannabis potency testing florida"</span>)
          </div>
          <div>
            <span style={{ color: '#a5b4fc' }}>2. mcp-remote</span>
            {' → '}SSE → IRON-PATRIOT:8101 MCP proxy
          </div>
          <div>
            <span style={{ color: '#a5b4fc' }}>3. MCP:8101</span>
            {' → '}POST http://localhost:8100/context
          </div>
          <div>
            <span style={{ color: '#f9a8d4' }}>4. REST API</span>
            {' → '}embed query via SENTINEL:11434 (nomic-embed-text, 768d vector)
          </div>
          <div>
            <span style={{ color: '#6ee7b7' }}>5. ChromaDB</span>
            {' → '}cosine search jarvis_regulations + jarvis_knowledge (+ others if unfiltered)
          </div>
          <div>
            <span style={{ color: '#fcd34d' }}>6. BM25</span>
            {' → '}keyword search same collections (jarvis_regulations: 87 chunks, fast)
          </div>
          <div>
            <span style={{ color: '#6ee7b7' }}>7. RRF Fusion</span>
            {' → '}merge + re-rank → trim to max_tokens budget
          </div>
          <div>
            <span style={{ color: '#5eead4' }}>8. Format</span>
            {' → '}"[Source 1: jarvis_regulations]↵{`{chunk text}`}↵[Source 2: …]"
          </div>
          <div>
            <span style={{ color: '#c4b5fd' }}>9. Return</span>
            {' → '}context block injected into Claude prompt → answers grounded in KB
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="Strengths" color={C.accent} items={[
            'Hybrid search outperforms pure vector on sparse/keyword-heavy queries',
            '10-state cannabis regulation coverage — 87 dense chunks',
            '7 purpose-built collections vs one generic vector store',
            'Daily financial refresh from live Supabase exec schema',
            'QUBO-optimized selection when used with jarvis-memory',
          ]} />
          <InfoBlock title="Integration Points" color={C.green100g} items={[
            'jarvis-memory: memory_optimize calls rag_context as source',
            'KaychaExec: financial ingested from exec_sales_monthly_company',
            'PureLIMS: schemas + test methods in jarvis_schemas',
            'All 11 active repos: source code indexed in jarvis_code',
            'Session start protocol: always call rag_context first',
          ]} />
          <InfoBlock title="Known Issues (2026-03-17)" color={C.orange} items={[
            'REST API :8100 returning HTTP 500 — needs diagnosis',
            'jarvis_documents BM25 intentionally disabled (176K > 80K)',
            '5 collections cosmetically need reingest (embed_model metadata)',
            'Embedding calls to SENTINEL add network latency vs local',
            'mcp-remote proxy adds 1 hop vs native MCP connection',
          ]} />
        </div>
      </div>

    </div>
  )
}
