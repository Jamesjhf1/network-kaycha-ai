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
  hyde:       { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.35)', title: '#f9a8d4' },
  rerank:     { bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.35)',title: '#c4b5fd' },
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

function CodeBlock({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="rounded-lg border p-4 font-mono text-[11px] leading-relaxed" style={{ background: color + '08', borderColor: color + '20', color }}>
      {children}
    </div>
  )
}

/* ── Collection Status Data (live as of 2026-03-19) ──────── */

const collections = [
  {
    name: 'jarvis_documents',
    chunks: '195,098',
    chunkSize: '1024',
    overlap: '200',
    bm25: 'SKIPPED',
    minScore: '0.25',
    status: 'ok' as const,
    note: 'SOPs, HR policies, PowerDMS docs — BM25 disabled (exceeds 80K limit), vector-only',
    source: 'Supabase Storage bucket pm-documents (31K+ docs, PDF + DOCX)',
  },
  {
    name: 'jarvis_code',
    chunks: '57,405',
    chunkSize: '768',
    overlap: '150',
    bm25: 'OK',
    minScore: '0.35',
    status: 'ok' as const,
    note: 'Source code from 11+ active repos — language-aware chunking (Python/PHP/JS/TS/SQL)',
    source: 'GitHub repos via git clone --depth 1, files <100KB, skip node_modules/vendor/.git',
  },
  {
    name: 'jarvis_legal',
    chunks: '28,223',
    chunkSize: '1536',
    overlap: '300',
    bm25: 'OK',
    minScore: '0.35',
    status: 'ok' as const,
    note: 'Contracts, NDAs, compliance agreements',
    source: 'Legal documents collection',
  },
  {
    name: 'jarvis_knowledge',
    chunks: '240',
    chunkSize: '768',
    overlap: '150',
    bm25: 'OK',
    minScore: '0.30',
    status: 'ok' as const,
    note: 'Architecture decisions, patterns, JARVIS KB entries, 49 help docs, domain knowledge',
    source: 'data/raw/jarvis_kb.json + help_docs.json + hardcoded domain knowledge',
  },
  {
    name: 'jarvis_regulations',
    chunks: '87',
    chunkSize: '1536',
    overlap: '300',
    bm25: 'OK',
    minScore: '0.28',
    status: 'ok' as const,
    note: '10-state cannabis testing compliance + federal — weekly Sunday refresh',
    source: 'Hardcoded per-state data: FL, AZ, CO, MA, MD, NC, NJ, NV, NY, CW + federal',
  },
  {
    name: 'jarvis_schemas',
    chunks: '59',
    chunkSize: '4096',
    overlap: '0',
    bm25: 'OK',
    minScore: '0.40',
    status: 'ok' as const,
    note: 'Full DB schemas — no overlap (one chunk per CREATE TABLE)',
    source: 'YourCOA (~239 tables x10 states), KaychaExec (267+ tables), 9 Supabase projects',
  },
  {
    name: 'jarvis_financial',
    chunks: '0',
    chunkSize: '1024',
    overlap: '100',
    bm25: 'OK',
    minScore: '0.28',
    status: 'needs_reingest' as const,
    note: 'Sales, AR aging, TAT metrics, corporate metrics — daily 3:30 AM ingest',
    source: 'KaychaExec Supabase: exec_sales_monthly_company, daily_sales, ar_aging, daily_tat, corporate_metrics',
  },
]

/* ── Legend ─────────────────────────────────────────────── */

const legendItems = [
  { color: '#8b5cf6', label: 'Clients' },
  { color: '#60a5fa', label: 'MCP Tools' },
  { color: '#a5b4fc', label: 'REST API' },
  { color: '#34d399', label: 'Vector Search' },
  { color: '#fbbf24', label: 'BM25 Hybrid' },
  { color: '#ec4899', label: 'HyDE + Reranking' },
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
            Dual-layer RAG with hybrid vector + BM25 + HyDE + cross-encoder reranking across 7 ChromaDB collections.
            FastAPI backend on IRON-PATRIOT:8100, MCP SSE proxy on :8101. nomic-embed-text 768d embeddings via SENTINEL:11434.
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
        <StatCard value="281K" label="Total Chunks" color={C.accent} />
        <StatCard value="7" label="Collections" color={C.teal} />
        <StatCard value="768d" label="Embed Dim" color={C.purple} />
        <StatCard value="Hybrid" label="Vec+BM25+HyDE" color={C.green100g} />
        <StatCard value="3" label="MCP Tools" color={C.orange} />
        <StatCard value="8" label="REST Endpoints" color={C.blue} />
        <StatCard value="2x/day" label="Live Refresh" color={C.pink} />
      </div>

      {/* ── Clients ───────────────────────────────────────── */}
      <Phase label="Clients" color="#8b5cf6">
        <HFlow>
          <Node icon="&lt;/&gt;" title="Claude Code" detail="CLI — all 5 workstations" variant="client" />
          <Node icon="D" title="Claude Desktop" detail="GUI — all 5 workstations" variant="client" />
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
            <Node icon="S" title="rag_search" detail="Semantic + hybrid search" file="n_results: 1-50 (default 10)" variant="mcp" />
            <InfoBlock title="Parameters" color="#60a5fa" items={[
              'query: natural language string',
              'n_results: max results (default 10)',
              'collections: comma-sep filter or all 7',
              'Returns: ranked results with scores + source metadata',
              'Best for: finding specific facts, code, or schema',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="C" title="rag_context" detail="Pre-formatted context block" file="max_tokens: 4K default, 16K max" variant="mcp" />
            <InfoBlock title="Parameters" color="#60a5fa" items={[
              'query: natural language question or topic',
              'max_tokens: 4000 default, 16000 max',
              'collections: optional filter',
              'Returns: [Source N: ...] formatted block with attribution',
              'Best for: session-start prompt injection',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="L" title="rag_collections" detail="Collection stats + metadata" file="IRON-PATRIOT:8101 → :8100" variant="mcp" />
            <InfoBlock title="Returns" color="#60a5fa" items={[
              'Collection names and live document counts',
              'Embedding model per collection',
              'BM25 availability per collection',
              'Total chunks across all collections',
              'Best for: health checks + debugging',
            ]} />
          </div>
        </div>
        <div className="mt-3 text-[10px] text-center" style={{ color: C.textDim }}>
          MCP server at :8101 (mcp_server.py) is a Python HTTP proxy forwarding to REST API at :8100.
          IRONMAN, JERICHO, SENTINEL register via .claude.json mcp-remote config.
        </div>
      </Phase>

      <Arrow />

      {/* ── REST API ──────────────────────────────────────── */}
      <Phase label="REST API — IRON-PATRIOT:8100 (Python/FastAPI)" color="#a5b4fc">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#a5b4fc' }}>8 Endpoints</div>
            <HFlow>
              <Node icon="P" title="POST /search" detail="Hybrid similarity search" file="use_bm25, rerank, use_hyde flags" variant="api" />
              <Node icon="P" title="POST /context" detail="Token-limited context block" variant="api" />
            </HFlow>
            <HFlow>
              <Node icon="G" title="GET /health" detail="Status + collection stats" variant="api" />
              <Node icon="G" title="GET /stats" detail="Per-collection statistics" variant="api" />
            </HFlow>
            <HFlow>
              <Node icon="G" title="GET /bm25-stats" detail="BM25 index file sizes" variant="api" />
              <Node icon="P" title="POST /bm25-rebuild" detail="Rebuild one/all indexes" variant="api" />
            </HFlow>
            <HFlow>
              <Node icon="G" title="GET /embed-check" detail="Embedding model consistency" variant="api" />
              <Node icon="G" title="GET /last-update" detail="Pipeline execution timestamps" variant="api" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <InfoBlock title="Runtime" color="#a5b4fc" items={[
              'Python 3.12 (C:\\Python312, NOT a venv)',
              'FastAPI + Uvicorn (NSSM Windows service)',
              'ChromaDB persistent storage (local SQLite + parquet)',
              'rank-bm25 (BM25Okapi indexing)',
              'sentence-transformers (cross-encoder reranking)',
              'pdfplumber + python-docx (document parsing)',
              'tiktoken cl100k_base (token counting)',
              'httpx (Ollama + Supabase HTTP client)',
            ]} />
            <InfoBlock title="Config (config.py)" color="#a5b4fc" items={[
              'OLLAMA_BASE_URL: http://localhost:11434',
              'HYDE_MODEL: llama3.2:3b (set "" to disable)',
              'BM25_MAX_DOCS: 80,000 per collection',
              'MAX_CACHED_INDEXES: 2 (LRU eviction)',
              'Embedding batch size: 64 chunks',
              'Embedding retry: 3 attempts, exponential backoff (2s, 4s, 8s)',
              'Max text per embedding: 3000 chars (8192 token limit)',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Hybrid Search Engine ──────────────────────────── */}
      <Phase label="4-Stage Hybrid Search Engine" color="#34d399">
        <div className="space-y-4">

          {/* Stage 1: Vector */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#6ee7b7' }}>Stage 1 — Vector Search (ChromaDB cosine similarity)</div>
            <HFlow>
              <Node icon="E" title="Query Embed" detail="nomic-embed-text 768d" file="SENTINEL:11434 (Ollama)" variant="vector" />
              <HArrow />
              <Node icon="C" title="ChromaDB" detail="Cosine distance, per-collection min_score" file="7 collections, local SQLite" variant="vector" />
              <HArrow />
              <Node icon="R" title="Vector Results" detail="Top-N by similarity (1.0 - distance)" file="~100-500ms" variant="vector" />
            </HFlow>
          </div>

          {/* Stage 2: BM25 */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fcd34d' }}>Stage 2 — BM25 Keyword Search (rank-bm25, 6 of 7 collections)</div>
            <HFlow>
              <Node icon="T" title="Tokenize" detail="Lowercase, alphanumeric+underscore, min 2 chars" file="18 stopwords removed" variant="bm25" />
              <HArrow />
              <Node icon="I" title="BM25 Index" detail="BM25Okapi, pickle-persisted" file="LRU cache, MAX_CACHED=2" variant="bm25" />
              <HArrow />
              <Node icon="R" title="BM25 Results" detail="Ranked by BM25 score (positive only)" file="~10-50ms" variant="bm25" />
            </HFlow>
            <div className="text-[10px] text-center mt-2" style={{ color: C.textDim }}>
              <span style={{ color: '#f87171' }}>jarvis_documents (195K chunks)</span> skipped — exceeds BM25_MAX_DOCS=80K (would use ~640MB RAM).
              Indexes persisted in data/bm25/*.pkl, rebuilt nightly 2:00 AM.
            </div>
          </div>

          {/* Stage 3: HyDE */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#f9a8d4' }}>Stage 3 — HyDE (Hypothetical Document Embeddings)</div>
            <HFlow>
              <Node icon="H" title="Hypothesis Generator" detail="llama3.2:3b via Ollama" file="Prompt: 'Write a factual paragraph...'" variant="hyde" />
              <HArrow />
              <Node icon="B" title="Blend Embeddings" detail="alpha=0.5: query + hypothesis" file="Falls back to query-only on failure" variant="hyde" />
              <HArrow />
              <Node icon="S" title="HyDE Search" detail="Blended embedding -> ChromaDB" file="Adds ~2-5s latency" variant="hyde" />
            </HFlow>
            <div className="text-[10px] text-center mt-2" style={{ color: C.textDim }}>
              Disabled if HYDE_MODEL="" or Ollama unavailable. Useful for abstract/conceptual queries where keywords fail.
            </div>
          </div>

          {/* Stage 4: Fusion + Reranking */}
          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#6ee7b7' }}>Stage 4 — Reciprocal Rank Fusion + Cross-Encoder Reranking</div>
            <HFlow>
              <Node icon="F" title="RRF Merge" detail="1/(k+rank_vec) + 1/(k+rank_bm25)" file="k=60, de-duplicate, merge" variant="vector" />
              <HArrow />
              <Node icon="R" title="Cross-Encoder" detail="ms-marco-MiniLM-L-6-v2" file="Reranks top-50 candidates" variant="rerank" />
              <HArrow />
              <Node icon="T" title="Token Trim" detail="Trim to max_tokens budget" file="tiktoken cl100k_base" variant="muted" />
            </HFlow>
            <div className="text-[10px] text-center mt-2" style={{ color: C.textDim }}>
              Cross-encoder reranking adds ~500-1000ms for 50 candidates. Falls back to score-sorted truncation if model unavailable.
              RRF handles BM25-only hits by fetching full text/metadata from ChromaDB.
            </div>
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── 7 Collections ─────────────────────────────────── */}
      <Phase label="7 ChromaDB Collections — Live Status (March 19, 2026)" color="#2dd4bf">
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
                  <div className="text-[9.5px] mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.3)' }}>{col.source}</div>
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
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>min_score:</span>{' '}
                  <span style={{ color: C.textBright }}>{col.minScore}</span>
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
          Total: <span style={{ color: C.textBright }}>281,112 chunks</span> across 7 collections.
          Collection min_score thresholds tuned per collection in config.py.
          jarvis_financial at 0 chunks — daily ingest scheduled 3:30 AM.
        </div>
      </Phase>

      <Arrow />

      {/* ── 6 Data Extractors ────────────────────────────── */}
      <Phase label="6 Data Extractors (Ingest Pipeline)" color="#f87171">
        <div className="space-y-4">
          <div className="text-[10px] text-center mb-2" style={{ color: C.textDim }}>
            Orchestrated via run_pipeline.py — run all, or per-source: schemas, knowledge, code, docs, regulations, financial
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoBlock title="1. schemas.py — Database Schemas" color="#f87171" items={[
              'YourCOA: ~239 tables x 10 states (FL,AZ,CO,MA,MD,NC,NJ,NV,NY,CW)',
              'KaychaExec: 267+ tables (finance, PM, HR, AR/AP, LIMS)',
              '9 Supabase projects with IDs + descriptions',
              'Chunk strategy: one CREATE TABLE per chunk (4096, no overlap)',
            ]} />
            <InfoBlock title="2. knowledge_base.py — KB + Domain" color="#f87171" items={[
              'JARVIS KB: pre-exported from KaychaExec (jarvis_kb.json)',
              '49 help doc articles (help_docs.json)',
              'Hardcoded domain knowledge: cannabis testing overview,',
              'corporate structure (9 entities), YourCOA query patterns,',
              'standard test panels (potency, pesticides, heavy metals...)',
            ]} />
            <InfoBlock title="3. github_code.py — Code Repos" color="#f87171" items={[
              'Git clone --depth 1 from Kaycha-Labs org',
              'Extensions: .py .php .js .ts .tsx .jsx .sql .sh .yml .json .toml .md',
              'Skip: node_modules, vendor, .git, dist, build, >100KB',
              'Language-aware chunking: Python def/class, PHP function/class,',
              'JS/TS arrow/class methods, SQL CREATE/ALTER/SELECT',
            ]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoBlock title="4. pdf_docs.py — PowerDMS Documents" color="#f87171" items={[
              'Download from Supabase Storage bucket pm-documents',
              'Concurrency: 20 workers, 30s timeout, max 20MB per file',
              'PDF: pdfplumber (max 100 pages), DOCX: python-docx',
              'Doc types: SOP, POLICY, METHOD_VALIDATION, QUALITY_MANUAL,',
              'SAFETY, CAPA, CALIBRATION, TRAINING, AUDIT, CERTIFICATE',
              'Domain mapping: SOP->operations, POLICY->compliance, etc.',
            ]} />
            <InfoBlock title="5. regulations.py — Cannabis Compliance" color="#f87171" items={[
              'Hardcoded per-state: regulatory_body, program_type, test_panels',
              'Action limits: pesticides, heavy_metals, potency, microbial',
              'FL (66 analytes, BioTrackTHC), AZ (55+, Metrc), NV (strictest)',
              'Federal: DEA Schedule I, 2018 Farm Bill (<0.3% THC), ISO 17025',
              'Cross-state comparisons: heavy metals, Metrc, potency tolerance',
            ]} />
            <InfoBlock title="6. financial.py — Financial Metrics" color="#f87171" items={[
              'Tables: exec_sales_monthly_company, daily_sales, ar_aging',
              'ar_aging_invoice_items, daily_tat, corporate_metrics',
              'Amounts in cents (divide by 100 for dollars)',
              'Company lookup: finance_companies.company_name (NOT .name)',
              'AR aging buckets: current, 1-30d, 31-60d, 61-90d, 91+d',
              'Generated: monthly sales, entity trends, top 100 debtors',
            ]} />
          </div>

          <Arrow />

          <div>
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#fca5a5' }}>Processing Pipeline</div>
            <HFlow>
              <Node icon="L" title="Loader" detail="File-type aware parsing" file="pdfplumber/python-docx/git" variant="muted" />
              <HArrow />
              <Node icon="C" title="Chunker" detail="4 strategies: text, schema, code, default" file="COLLECTION_CHUNK_CONFIG" variant="muted" />
              <HArrow />
              <Node icon="E" title="Embedder" detail="nomic-embed-text 768d, batch=64" file="SENTINEL:11434, 3 retries" variant="embed" />
              <HArrow />
              <Node icon="S" title="ChromaDB Store" detail="Upsert + BM25 index trigger" file="IRON-PATRIOT local" variant="collection" />
            </HFlow>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <InfoBlock title="run_pipeline.py CLI" color="#f87171" items={[
              'python run_pipeline.py — Run all 6 extractors',
              'python run_pipeline.py schemas — Only schemas',
              'python run_pipeline.py knowledge — KB + help + domain',
              'python run_pipeline.py code — GitHub repos',
              'python run_pipeline.py docs [--priority] [--max=500] — PowerDMS',
              'python run_pipeline.py regulations — Cannabis regs',
              'python run_pipeline.py financial — Supabase metrics',
              'python run_pipeline.py stats — Collection statistics',
              'python run_pipeline.py test — Test embedding + sample search',
            ]} />
            <InfoBlock title="maintenance.py CLI" color="#f87171" items={[
              'python maintenance.py bm25 — Rebuild all BM25 indexes',
              'python maintenance.py bm25 jarvis_financial — Single collection',
              'python maintenance.py reingest regulations — Clear + re-ingest',
              'python maintenance.py reingest financial — Needs SUPABASE_SERVICE_KEY',
              'python maintenance.py embed-check — Find stale embed_model metadata',
              'python maintenance.py all — BM25 + embed-check + financial refresh',
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
              <Node icon="6A" title="Live Refresh" detail="6:00 AM + 6:00 PM daily" file="financial + regulations" variant="schedule" />
              <Node icon="2A" title="BM25 Nightly" detail="2:00 AM daily" file="JarvisRAG-BM25-Nightly" variant="schedule" />
            </HFlow>
            <HFlow>
              <Node icon="3A" title="Financial Daily" detail="3:30 AM daily" file="JarvisRAG-Financial-Daily" variant="schedule" />
              <Node icon="Su" title="Regulations Weekly" detail="3:00 AM Sundays" file="JarvisRAG-Regulations-Weekly" variant="schedule" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <InfoBlock title="Task Wrappers" color="#fdba74" items={[
              'tools/task-bm25.bat -> maintenance.py bm25',
              'tools/task-financial.bat -> maintenance.py reingest financial',
              'tools/task-regulations.bat -> maintenance.py reingest regulations',
              'Logs: E:\\Projects\\jarvis-rag\\logs\\live-refresh-YYYY-MM-DD.log',
              'Last clean run: completed in 26.7s',
            ]} />
            <InfoBlock title="Performance Characteristics" color="#fdba74" items={[
              'Vector search: ~100-500ms (Ollama embed + ChromaDB)',
              'BM25 search: ~10-50ms (in-memory rank_bm25)',
              'RRF merge: ~5-10ms (O(n) merge of two sorted lists)',
              'HyDE generation: ~2-5s (Ollama hypothesis)',
              'Cross-encoder reranking: ~500-1000ms (50 candidates)',
              'Total (all features): 3-7s typical, 0.5s without HyDE/rerank',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Infrastructure ────────────────────────────────── */}
      <Phase label="Infrastructure" color="#94a3b8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="IRON-PATRIOT (Primary Host)" color={C.teal} items={[
            ':8100 — jarvis-rag REST API (FastAPI/Uvicorn, NSSM)',
            ':8101 — jarvis-rag MCP SSE (Python proxy -> :8100)',
            'Tailscale: 100.75.25.51 | LAN: 192.168.1.42',
            'RTX PRO 6000 96GB, 128GB RAM',
            'ChromaDB local: E:\\Projects\\jarvis-rag\\data\\chroma\\',
            'BM25 pickles: E:\\Projects\\jarvis-rag\\data\\bm25\\',
            'System Python: C:\\Python312 (not venv)',
          ]} />
          <InfoBlock title="SENTINEL (Embedding + Replica)" color={C.blue} items={[
            ':11434 — Ollama (nomic-embed-text 768d + llama3.2:3b HyDE)',
            'Tailscale: 100.98.251.57 | LAN: 192.168.1.40',
            'RTX 5090 32GB, 64GB RAM',
            'Embedding batch: 64 per call, 3000 char max',
            'Fallback: progressive truncation (2000, 1000, 500 chars)',
            'RAG replica: nightly sync + watchdog every 5min',
          ]} />
          <InfoBlock title="Memory Budget" color={C.orange} items={[
            'ChromaDB: ~500MB-1GB (depending on collection sizes)',
            'BM25 (2 cached): ~200-400MB per large collection',
            'Ollama embed model: ~1GB (nomic-embed-text)',
            'Cross-encoder: ~300MB (lazy-loaded on first rerank)',
            'Total peak: ~2.5-3GB RAM for retrieval stack',
            'Collections >80K docs: vector-only (BM25 disabled)',
          ]} />
        </div>
      </Phase>

      {/* ── Codebase Map ─────────────────────────────────── */}
      <Phase label="Codebase Map (E:\\Projects\\jarvis-rag)" color="#94a3b8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoBlock title="Core Pipeline" color={C.blue} items={[
            'config.py — 27 configuration parameters',
            'run_pipeline.py — 6 extractor orchestration',
            'pipeline/chunker.py — 4 chunking strategies + tiktoken',
            'pipeline/embedder.py — Ollama batch embed + retry',
            'pipeline/ingestor.py — ChromaDB upsert + BM25 trigger',
          ]} />
          <InfoBlock title="Retrieval Layer" color={C.green100g} items={[
            'retrieval/server.py — FastAPI 8 endpoints',
            'retrieval/search.py — Hybrid search orchestration',
            'retrieval/bm25_index.py — BM25 persistence + LRU',
            'mcp_server.py — 3 MCP tools, SSE on :8101',
          ]} />
          <InfoBlock title="6 Extractors" color={C.red} items={[
            'extractors/schemas.py — YourCOA + KaychaExec + Supabase',
            'extractors/knowledge_base.py — KB + help + domain knowledge',
            'extractors/github_code.py — Language-aware code chunking',
            'extractors/pdf_docs.py — PowerDMS PDF/DOCX extraction',
            'extractors/regulations.py — 10-state cannabis compliance',
            'extractors/financial.py — KaychaExec financial metrics',
          ]} />
        </div>
      </Phase>

      {/* ── End-to-End Query Flow ─────────────────────────── */}
      <div className="rounded-xl border p-5" style={{ borderColor: C.accent + '30', background: C.accent + '05' }}>
        <div className="text-[12px] font-semibold mb-3" style={{ color: C.accent }}>END-TO-END QUERY FLOW</div>
        <div className="font-mono text-[11px] space-y-1.5 mb-4" style={{ color: C.textDim }}>
          <div>
            <span style={{ color: '#8b5cf6' }}>1. Client</span>
            {' \u2192 '}rag_context(<span style={{ color: '#fbbf24' }}>"cannabis potency testing florida"</span>)
          </div>
          <div>
            <span style={{ color: '#a5b4fc' }}>2. mcp-remote</span>
            {' \u2192 SSE \u2192 IRON-PATRIOT:8101 MCP proxy'}
          </div>
          <div>
            <span style={{ color: '#a5b4fc' }}>3. MCP:8101</span>
            {' \u2192 POST http://localhost:8100/context'}
          </div>
          <div>
            <span style={{ color: '#f9a8d4' }}>4. Embed</span>
            {' \u2192 SENTINEL:11434 nomic-embed-text (768d vector, ~100ms)'}
          </div>
          <div>
            <span style={{ color: '#f9a8d4' }}>5. HyDE</span>
            {' \u2192 llama3.2:3b generates hypothesis, blend alpha=0.5 (~2-5s)'}
          </div>
          <div>
            <span style={{ color: '#6ee7b7' }}>6. ChromaDB</span>
            {' \u2192 cosine search jarvis_regulations + jarvis_knowledge (~100-500ms)'}
          </div>
          <div>
            <span style={{ color: '#fcd34d' }}>7. BM25</span>
            {' \u2192 keyword search same collections (~10-50ms)'}
          </div>
          <div>
            <span style={{ color: '#6ee7b7' }}>8. RRF</span>
            {' \u2192 merge: 1/(60+rank_vec) + 1/(60+rank_bm25), de-duplicate (~5-10ms)'}
          </div>
          <div>
            <span style={{ color: '#c4b5fd' }}>9. Rerank</span>
            {' \u2192 cross-encoder ms-marco-MiniLM-L-6-v2 top-50 (~500-1000ms)'}
          </div>
          <div>
            <span style={{ color: '#5eead4' }}>10. Format</span>
            {' \u2192 "[Source 1: jarvis_regulations] {chunk} [Source 2: ...]"'}
          </div>
          <div>
            <span style={{ color: '#c4b5fd' }}>11. Return</span>
            {' \u2192 context block injected into Claude prompt (grounded in 281K chunks)'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="Strengths" color={C.accent} items={[
            '4-stage hybrid outperforms pure vector on keyword-heavy queries',
            '10-state cannabis regulation coverage (87 dense chunks)',
            '7 purpose-built collections vs one generic vector store',
            'HyDE catches conceptual queries that keywords miss',
            'Cross-encoder reranking improves precision on ambiguous queries',
            'QUBO-optimized selection when used with jarvis-memory',
            '195K document chunks from PowerDMS (SOPs, policies, methods)',
            '57K code chunks with language-aware splitting',
          ]} />
          <InfoBlock title="Integration Points" color={C.green100g} items={[
            'jarvis-memory: memory_optimize calls rag sources in parallel',
            'KaychaExec: financial ingested from exec_sales_monthly_company',
            'PureLIMS: schemas + test methods in jarvis_schemas',
            'All 11 active repos: source code indexed in jarvis_code',
            'Session start protocol: always call rag_context first',
            'jarvis-memory bitmask: track loaded chunks for delta-only',
          ]} />
          <InfoBlock title="Known Limitations" color={C.orange} items={[
            'jarvis_documents BM25 disabled (195K > 80K limit)',
            'jarvis_financial at 0 chunks (daily ingest schedule)',
            'HyDE adds 2-5s latency (disable with HYDE_MODEL="")',
            'Embedding calls to SENTINEL add network hop vs local',
            'Cross-encoder lazy-loaded (~300MB, first-request penalty)',
            'mcp-remote proxy adds 1 hop vs native MCP connection',
          ]} />
        </div>
      </div>

    </div>
  )
}
