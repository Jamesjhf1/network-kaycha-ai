import { C } from '../constants/colors'

/* ── Reusable sub-components (matching PipelineView style) ─── */

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

const nodeColors = {
  client:   { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)',  title: '#c4b5fd' },
  mcp:      { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', title: '#93c5fd' },
  qubo:     { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', title: '#6ee7b7' },
  domain:   { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', title: '#fcd34d' },
  store:    { bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.35)', title: '#5eead4' },
  entity:   { bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.35)',title: '#fca5a5' },
  feedback: { bg: 'rgba(253,186,116,0.12)',border: 'rgba(253,186,116,0.35)',title: '#fdba74' },
  session:  { bg: 'rgba(244,114,182,0.12)',border: 'rgba(244,114,182,0.35)',title: '#f9a8d4' },
  cache:    { bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.35)',title: '#c4b5fd' },
  embed:    { bg: 'rgba(129,140,248,0.12)',border: 'rgba(129,140,248,0.35)',title: '#a5b4fc' },
  muted:    { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', title: '#94a3b8' },
  sisyphus: { bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.35)', title: '#f9a8d4' },
  bench:    { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.35)', title: '#fdba74' },
  api:      { bg: 'rgba(129,140,248,0.12)',border: 'rgba(129,140,248,0.35)',title: '#a5b4fc' },
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

/* ── Legend ───────────────────────────────────────────────── */

const legendItems = [
  { color: '#8b5cf6', label: 'Clients' },
  { color: '#60a5fa', label: 'MCP Layer' },
  { color: '#fbbf24', label: 'Domain Intelligence' },
  { color: '#34d399', label: 'QUBO Solver' },
  { color: '#2dd4bf', label: 'Storage' },
  { color: '#f87171', label: 'Entity Graph' },
  { color: '#fdba74', label: 'Feedback Loop' },
  { color: '#f472b6', label: 'Session Continuity' },
  { color: '#ec4899', label: 'Sisyphus Integration' },
  { color: '#fb923c', label: 'Benchmarks' },
]

/* ── Main View ───────────────────────────────────────────── */

export function MemoryView() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title + Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold" style={{ color: C.textBright }}>JARVIS Memory System</h2>
          <p className="text-[11px] mt-1" style={{ color: C.textDim }}>
            QUBO-optimized persistent memory for Claude Code, Claude Desktop, and Cursor across all workstations.
            7-phase evolution: write pipeline, domain intelligence, feedback loop, entity graph, session continuity, contradiction detection, Sisyphus integration (HOBO + Bellman + surprise-driven recall).
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
        <StatCard value="8" label="MCP Tools" color={C.blue} />
        <StatCard value="8" label="API Endpoints" color={C.green100g} />
        <StatCard value="8" label="BQM Terms" color={C.teal} />
        <StatCard value="3" label="Domains" color={C.orange} />
        <StatCard value="768d" label="Embedding Dim" color={C.purple} />
        <StatCard value="~2.5s" label="Full Pipeline" color={C.pink} />
        <StatCard value="281K" label="RAG Chunks" color={C.accent} />
      </div>

      {/* ── Phase 0: Client Layer ─────────────────────────── */}
      <Phase label="Phase 0 - Client Layer" color="#8b5cf6">
        <HFlow>
          <Node icon="&lt;/&gt;" title="Claude Code" detail="CLI / stdio via mcp-remote" variant="client" />
          <Node icon="D" title="Claude Desktop" detail="GUI / SSE via mcp-remote" variant="client" />
          <Node icon="C" title="Cursor" detail="IDE / SSE via mcp-remote" variant="client" />
        </HFlow>
        <div className="text-[10px] text-center mt-3" style={{ color: C.textDim }}>
          All clients connect via mcp-remote to IRON-PATRIOT:8104 (SSE). Each connection gets its own MCP server instance.
          Transports: stdio (Claude Code default), SSE (Claude Desktop / Cursor / browser IDE).
        </div>
      </Phase>

      <Arrow />

      {/* ── Phase 1: MCP + Write Pipeline ─────────────────── */}
      <Phase label="Phase 1 - MCP Layer + Write Pipeline (8 Tools)" color="#60a5fa">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#93c5fd' }}>Read Tools (Retrieval)</div>
            <HFlow>
              <Node icon="Q" title="memory_optimize" detail="Full QUBO pipeline - both sources" file="POST /memory/optimize" variant="mcp" />
              <Node icon="R" title="rag_context" detail="Pre-formatted context string" file="POST /rag/context" variant="mcp" />
            </HFlow>
            <HFlow>
              <Node icon="O" title="rag_optimize" detail="RAG-only shortcut" file="POST /rag/optimize" variant="mcp" />
              <Node icon="C" title="optimize_chunks" detail="Optimize pre-fetched chunks" file="POST /memory/optimize-chunks" variant="mcp" />
            </HFlow>
          </div>
          <div className="space-y-3">
            <div className="text-[11px] font-semibold mb-2" style={{ color: '#93c5fd' }}>Write + Adaptive Tools</div>
            <HFlow>
              <Node icon="W" title="memory_write" detail="Session-end decision extraction" file="POST /memory/write" variant="mcp" />
              <Node icon="H" title="memory_health" detail="Service health + subsystem stats" file="GET /memory/health" variant="muted" />
            </HFlow>
            <div className="text-[11px] font-semibold mb-2 mt-3" style={{ color: '#f9a8d4' }}>Adaptive Recall (Sisyphus)</div>
            <HFlow>
              <Node icon="!" title="memory_recall_interrupt" detail="Surprise-driven targeted recall when stuck" file="POST /memory/recall-interrupt" variant="sisyphus" />
              <Node icon="B" title="memory_update_bitmask" detail="Report loaded chunks for delta-only" file="POST /memory/update-bitmask" variant="sisyphus" />
            </HFlow>
          </div>
        </div>

        {/* API Signatures */}
        <div className="mt-4 space-y-3">
          <div className="text-[11px] font-semibold" style={{ color: '#93c5fd' }}>Tool Signatures (TypeScript)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CodeBlock color="#60a5fa">
              <div style={{ color: '#93c5fd' }}>{'// memory_optimize'}</div>
              <div>{'{'} query: string</div>
              <div>{'  '}max_tokens?: 100-32000 <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'// default 4000'}</span></div>
              <div>{'  '}max_chunks?: 1-100 <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'// default 20'}</span></div>
              <div>{'  '}sources?: ["jarvis_memory","jarvis_rag"]</div>
              <div>{'  '}collection_weights?: {'{'} jarvis_schemas: 1.5 {'}'} {'}'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{'// Returns: selected_chunks[], energy, timing_ms, solver_used'}</div>
            </CodeBlock>
            <CodeBlock color="#ec4899">
              <div style={{ color: '#f9a8d4' }}>{'// memory_recall_interrupt'}</div>
              <div>{'{'} session_id: string</div>
              <div>{'  '}agent_context: string <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'// ~500 tokens'}</span></div>
              <div>{'  '}failure_context: string</div>
              <div>{'  '}D?: number <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'// Sisyphus divergence 0-1'}</span> {'}'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{'// Returns: triggered, new_chunks[] (delta), evicted[], hypothesis'}</div>
            </CodeBlock>
            <CodeBlock color="#60a5fa">
              <div style={{ color: '#93c5fd' }}>{'// memory_write'}</div>
              <div>{'{'} output: string <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'// max 100KB'}</span></div>
              <div>{'  '}repo?: string, task_id?: string</div>
              <div>{'  '}files_touched?: string[]</div>
              <div>{'  '}source?: "claude_session" | "jarvis_pipeline"</div>
              <div>{'  '}min_confidence?: 0-1 <span style={{ color: 'rgba(255,255,255,0.3)' }}>{'// default 0.6'}</span> {'}'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{'// Returns: extracted, stored, skipped, entries[]'}</div>
            </CodeBlock>
            <CodeBlock color="#ec4899">
              <div style={{ color: '#f9a8d4' }}>{'// memory_update_bitmask'}</div>
              <div>{'{'} session_id: string</div>
              <div>{'  '}loaded_chunk_ids: string[] {'}'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{'// Returns: bitmask state, total_loaded'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)' }}>{'// Call after every rag_context / memory_optimize'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)' }}>{'// Ensures future calls return delta-only'}</div>
            </CodeBlock>
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Phase 2: Domain Classification ─────────────────── */}
      <Phase label="Phase 2 - Domain Classification" color="#fbbf24">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          Every query is classified into a domain before retrieval. Keyword matching (&lt;1ms) with 100% accuracy on 16 test queries.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Node icon="L" title="Kaycha Labs" detail="Compliance, regulations, financial, multi-state ops" variant="domain" />
            <InfoBlock title="Weight Boosts" color="#fbbf24" items={[
              'Regulations: 1.5x',
              'Financial: 1.3x',
              'Legal: 1.2x',
              'Code: 0.7x (dampened)',
              'Contradiction eta: 15.0 (boosted)',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="V" title="Vibe Coding" detail="11+ projects, code patterns, bugs, architecture" variant="domain" />
            <InfoBlock title="Weight Boosts" color="#fbbf24" items={[
              'Code: 1.5x',
              'Schemas: 1.2x',
              'Regulations: 0.5x (dampened)',
              'Financial: 0.3x (dampened)',
              'Freshness delta: 2.0x (code changes fast)',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="N" title="NodePlus" detail="LIMS schema, test methods, compliance rules, COA" variant="domain" />
            <InfoBlock title="Weight Boosts" color="#fbbf24" items={[
              'Schemas: 1.6x',
              'Regulations: 1.3x',
              'Knowledge: 1.2x',
              'Dep coupling zeta: 1.5x (schema deps)',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Retrieval + Scoring + QUBO ─────────────────────── */}
      <Phase label="QUBO Pipeline - Retrieval, Scoring, Solving" color="#34d399">
        <div className="space-y-3">
          {/* Retrieval */}
          <div className="text-[11px] font-semibold" style={{ color: '#6ee7b7' }}>1. Retrieval (parallel, circuit-breaker protected)</div>
          <HFlow>
            <Node icon="M" title="jarvis_memory" detail="CF Worker FTS - decisions, patterns" file="222-428ms latency" variant="store" />
            <HArrow />
            <Node icon="R" title="jarvis_rag" detail="ChromaDB - 7 collections, 281K chunks" file="100-500ms latency" variant="store" />
            <HArrow />
            <Node icon="G" title="Entity Graph" detail="SQLite + NetworkX - N-hop expansion" file="92 nodes, 209 edges" variant="entity" />
          </HFlow>

          {/* Scoring */}
          <div className="text-[11px] font-semibold mt-3" style={{ color: '#6ee7b7' }}>2. Scoring (vectorized, domain-weighted)</div>
          <HFlow>
            <Node icon="E" title="Embeddings" detail="nomic-embed-text 768d via Ollama, batch=64" file="SENTINEL:11434" variant="embed" />
            <HArrow />
            <Node icon="P" title="Pairwise Similarity" detail="Vectorized matmul (normalized @ normalized.T)" variant="embed" />
            <HArrow />
            <Node icon="F" title="Freshness" detail="Temporal decay (evergreen/periodic/event/session)" variant="embed" />
          </HFlow>

          {/* BQM */}
          <div className="text-[11px] font-semibold mt-3" style={{ color: '#6ee7b7' }}>3. BQM Construction (8-term energy function)</div>
          <div className="rounded-lg border p-4 font-mono text-[11px] leading-relaxed" style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.15)', color: '#6ee7b7' }}>
            <div>H = <span style={{ color: '#fca5a5' }}>-alpha(5.0)</span> SUM(rel_i * s_i)</div>
            <div className="ml-4">+ <span style={{ color: '#fcd34d' }}>beta(3.0)</span> SUM(sim_ij * s_i * s_j)</div>
            <div className="ml-4">+ <span style={{ color: '#93c5fd' }}>gamma(4.0)</span> (SUM(tok_i * s_i) - B)^2</div>
            <div className="ml-4">- <span style={{ color: '#5eead4' }}>delta(1.5)</span> SUM(fresh_i * s_i)</div>
            <div className="ml-4">+ <span style={{ color: '#c4b5fd' }}>epsilon</span> per-source cap</div>
            <div className="ml-4">- <span style={{ color: '#fdba74' }}>zeta</span> SUM(dep_pairs s_i * s_j) + Sisyphus bias boost</div>
            <div className="ml-4">+ <span style={{ color: '#f9a8d4' }}>eta(25.0)</span> SUM(contradiction_ij * s_i * s_j)</div>
            <div className="ml-4">- <span style={{ color: '#ec4899' }}>theta</span> SUM(v_i * s_i) + SUM(v_ij * s_i * s_j)  <span style={{ color: '#ec489980' }}>[Bellman]</span></div>
          </div>
          <div className="text-[10px] text-center" style={{ color: C.textDim }}>
            Config: num_reads=50, early_stopping=true, warm_start_threshold=0.35, auto_scale=false
          </div>

          {/* Solver */}
          <div className="text-[11px] font-semibold mt-3" style={{ color: '#6ee7b7' }}>4. Hybrid Solve (SA + Tabu in parallel)</div>
          <HFlow>
            <Node icon="SA" title="Simulated Annealing" detail="D-Wave Ocean SDK, variable reads" variant="qubo" />
            <Node icon="T" title="Tabu Search" detail="Tenure-clamped, parallel with SA" variant="qubo" />
            <Node icon="CP" title="CP-SAT (fast tier)" detail="OR-Tools classical solver" variant="qubo" />
          </HFlow>
          <div className="text-[10px] text-center" style={{ color: C.textDim }}>
            Best energy wins. Warm-start from prior solutions via SHA-256 cache key. Solution cached for reuse.
            Typical solve time: 1-31 seconds. Fallback: degraded mode with flag set if solver unavailable.
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Contradiction Detection ────────────────────────── */}
      <Phase label="Phase 6 - Contradiction Detection" color="#f87171">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Node icon="T" title="Text Similarity" detail="Negation, supersession, antonym detection" variant="entity" />
            <InfoBlock title="Strategies" color="#f87171" items={[
              'Negation prefix: cosine > 0.85 + negation words',
              'Temporal supersession: cosine > 0.90 + age gap > 30d',
              'Antonym pairs: 50+ dev-domain antonyms',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="$" title="Structured Facts" detail="Numerical/financial contradiction detection" file="Phase 6" variant="entity" />
            <InfoBlock title="Fact Extraction" color="#f87171" items={[
              'AR aging: $amounts + periods',
              'Revenue/sales: $amounts + periods',
              'TAT: duration + timeframes',
              'Invoice counts + periods',
              'Same metric + same period + >10% divergence = contradiction',
            ]} />
          </div>
        </div>
        <div className="mt-3 text-[10px]" style={{ color: C.textDim }}>
          <span style={{ color: '#f87171' }}>Gap vs CML-MIC:</span> JARVIS handles contradictions implicitly via BQM Term 2 (redundancy) + Term 4 (freshness).
          CML-MIC has a full 6-rule deterministic engine (CR-01→CR-06) with a human review queue. P0 roadmap item: adopt CR-01 pair matching.
        </div>
      </Phase>

      <Arrow />

      {/* ── Caching + Feedback ─────────────────────────────── */}
      <Phase label="Caching + Feedback Loop" color="#a78bfa">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Node icon="L1" title="L1 Cache" detail="In-memory LRU, 50 entries, 15min TTL" variant="cache" />
            <Node icon="L2" title="L2 Cache" detail="Disk-backed JSON, 5000 entries, 2hr TTL" variant="cache" />
            <div className="text-[10px]" style={{ color: C.textDim }}>
              Semantic similarity matching (cosine &gt; 0.92 = cache hit). L2 promotes to L1 on hit.
            </div>
          </div>
          <div className="space-y-2">
            <Node icon="FB" title="Feedback Tracker" detail="SQLite-backed chunk utilization logging" file="Phase 3" variant="feedback" />
            <Node icon="WT" title="Weight Tuner" detail="Offline suggestions, bounded +/-20% per cycle" file="Phase 3" variant="feedback" />
            <div className="text-[10px]" style={{ color: C.textDim }}>
              Tracks which retrieved chunks were actually useful. Feeds into collection weight tuning per domain. Human review required.
            </div>
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Entity Graph + Sessions ────────────────────────── */}
      <Phase label="Knowledge Graph + Session Continuity" color="#f472b6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Node icon="G" title="Entity Graph" detail="SQLite + NetworkX DiGraph" file="92 nodes, 209 edges (jarvis-ops)" variant="entity" />
            <InfoBlock title="Entity Types" color="#f87171" items={[
              'person, project, codebase, api, decision, bug',
              'pattern, regulation, state, test_method, table',
              'Auto-extracted via regex from memory_remember',
              'Co-occurrence relations between entities in same memory',
              'FTS5 fuzzy search + N-hop traversal',
              'Code graph: recursive CTEs (get_dependencies, get_dependents)',
              'Incremental indexing via git post-commit hooks',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="S" title="Session Manager" detail="SQLite session chains + attempt tracking" file="Phase 5" variant="session" />
            <InfoBlock title="Session Tracking" color="#f472b6" items={[
              'Start session with client + domain',
              'Log attempts: success / failure / partial / abandoned',
              'Auto-generate handoff markdown on session end',
              'Writes to ai-context/handoffs/ for next session pickup',
              'Query prior attempts to avoid repeating failures',
              'Active workspace: git hook + 4hr TTL + 1.3x relevance boost',
            ]} />
          </div>
        </div>
      </Phase>

      <Arrow />

      {/* ── Phase 7: Sisyphus Integration ───────────────────── */}
      <Phase label="Phase 7 - Sisyphus Integration (HOBO + Bellman + Adaptive Recall)" color="#ec4899">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          Sisyphus Engine provides continuous thermodynamic optimization of memory chunk relationships.
          The engine runs a PID-controlled metabolism loop that verifies which chunk combinations are structurally load-bearing.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Node icon="S" title="Sisyphus MemoryWorld" detail="4 cognitive layers: Recall (degree-3), Sense, Desire, Affordance" file="sisyphus-engine" variant="sisyphus" />
            <InfoBlock title="HOBO Polynomial" color="#ec4899" items={[
              'BinaryPolynomial (degree 2+3) superposition',
              'Dimensional Slicer: N-D poly to degree-2 BQM',
              'make_quadratic() for surviving cubic terms',
              'Pinned state propagation across cycles',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="V" title="Bellman Value (Term 8)" detail="TD(lambda) trainer: predicts future chunk utility" file="bellman_trainer.py" variant="sisyphus" />
            <InfoBlock title="TD(lambda) Learning" color="#ec4899" items={[
              'v_i = learned linear value per chunk',
              'v_ij = learned pair value (top-K=3 pruning)',
              'Cold-start: bootstrap + 5-cycle eviction pin',
              'Age decay: 0.98x per cycle after 200 idle',
              'Trains every 100 interactions (offline)',
            ]} />
          </div>
          <div className="space-y-2">
            <Node icon="!" title="Surprise Detector" detail="3-signal trigger: D, rho, epsilon + anti-thrashing" file="surprise_detector.py" variant="sisyphus" />
            <InfoBlock title="Adaptive Recall" color="#ec4899" items={[
              'D(t): Sisyphus divergence (context mismatch)',
              'rho(t): semantic distance from memory anchors',
              'epsilon(t): confidence drop signal',
              'Exponential backoff (1.5x per interrupt)',
              'Incremental solve: delta-only, <100ms',
              'Session bitmask: never re-fetch loaded chunks',
            ]} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBlock title="Failure Hardening (7 mechanisms)" color="#ec4899" items={[
            'Temporal validity gating (expired chunks excluded)',
            'Cache incoherence detection (stale bias fallback)',
            'Cold-start chunk protection (-999 pin bias)',
            'PID anti-windup (I_max clamp + convergence flush)',
            'Solver determinism audit (variance check, Tabu fallback)',
            'Semantic drift detection (embedding model hash)',
            'Prometheus metrics (7 gauges/counters)',
          ]} />
          <InfoBlock title="Supabase Tables (jarvis_memory)" color="#ec4899" items={[
            'chunk_biases — Sisyphus-verified pairwise biases',
            'bellman_values — TD(lambda) learned v_i and v_ij',
            'RPC: get_max_bias_seq(), get_chunk_biases()',
            'Monotonic seq_id for staleness detection',
            'BiasWriter: confidence 1.0 (verified) / 0.6 (failsafe)',
          ]} />
        </div>
      </Phase>

      <Arrow />

      {/* ── CF Worker REST API ────────────────────────────── */}
      <Phase label="Cloudflare Worker REST API (Distributed Memory Operations)" color="#a5b4fc">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          Production API at jarvis-memory-api.kaycha-labs.workers.dev. Bearer token auth on all endpoints.
          Backpressure: 50 max concurrent, shed at 80% capacity. X-Machine-ID required on writes.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoBlock title="Context Store" color="#a5b4fc" items={[
            'POST /context — Store new entry',
            'GET /context/search?q=... — Full-text search',
            'GET /context/:hex_id — Retrieve by ID',
            'PATCH /context/:hex_id — Update entry',
            'DELETE /context/:hex_id — Delete entry',
          ]} />
          <InfoBlock title="Cluster + Locks" color="#a5b4fc" items={[
            'POST /heartbeat — Register machine heartbeat',
            'GET /cluster — All machine states',
            'GET /cluster/leader — Current leader',
            'POST /locks/acquire — Distributed file lock',
            'POST /locks/release — Release lock',
          ]} />
          <InfoBlock title="Tasks + Logs" color="#a5b4fc" items={[
            'POST /task-specs — Upsert task spec',
            'GET /task-specs/:task_id — Get task spec',
            'POST /feedback — Record task feedback',
            'POST /logs — Write agent log(s)',
            'GET /logs?machine_id=... — Query logs',
          ]} />
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBlock title="context_store Schema" color="#a5b4fc" items={[
            'hex_id (PK), domain (exec/legal/infra/finance/code/...)',
            'project, topic, summary, content (TEXT)',
            'source (machine_id,source_name), machine_id',
            'ttl_days, expires_at, created_at, updated_at',
            'Full-text search enabled (wfts index)',
          ]} />
          <InfoBlock title="task_feedback Schema" color="#a5b4fc" items={[
            'task_id, machine_id, outcome (success/failure/partial/timeout)',
            'execution_time_ms, review_score, test_pass_rate',
            'validation_passed, energy_at_dispatch',
            'd_score (Sisyphus divergence), retry_count',
            'feedback_notes, created_at',
          ]} />
        </div>
      </Phase>

      <Arrow />

      {/* ── Benchmark Results ────────────────────────────────── */}
      <Phase label="Benchmark Results (March 9, 2026 Audit)" color="#fb923c">
        <div className="text-[10px] text-center mb-3" style={{ color: C.textDim }}>
          CML-MIC vs JARVIS Comparative Benchmark — 433-line autonomous audit report.
          Source: jarvis-ops/reports/CML-MIC-vs-JARVIS-Benchmark-Report-2026-03-09.md
        </div>

        {/* Latency Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-semibold" style={{ color: '#fdba74' }}>Live Performance Metrics</div>
            <div className="grid grid-cols-2 gap-2">
              <StatCard value="2.0-2.7s" label="Full Pipeline" color="#fb923c" />
              <StatCard value="222-428ms" label="CF Worker FTS" color="#34d399" />
              <StatCard value="100-500ms" label="Vector Search" color="#60a5fa" />
              <StatCard value="10-50ms" label="BM25 Search" color="#fbbf24" />
              <StatCard value="<100ms" label="RRF Merge" color="#2dd4bf" />
              <StatCard value="1-31s" label="QUBO Solve" color="#ec4899" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[11px] font-semibold" style={{ color: '#fdba74' }}>Live System Status (Audited)</div>
            <div className="grid grid-cols-2 gap-2">
              <StatCard value="281K" label="Total Chunks" color="#34d399" />
              <StatCard value="7" label="RAG Collections" color="#2dd4bf" />
              <StatCard value="92" label="Code Graph Nodes" color="#a5b4fc" />
              <StatCard value="209" label="Code Graph Edges" color="#a5b4fc" />
              <StatCard value="95%" label="Audit Pass Rate" color="#34d399" />
              <StatCard value="151/151" label="Health Checks" color="#34d399" />
            </div>
          </div>
        </div>

        {/* Head-to-Head */}
        <div className="mt-4">
          <div className="text-[11px] font-semibold mb-2" style={{ color: '#fdba74' }}>Head-to-Head: JARVIS vs CML-MIC PRD v1.2</div>
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <table className="w-full text-[10.5px]">
              <thead>
                <tr style={{ background: 'rgba(251,146,60,0.08)' }}>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: '#fdba74' }}>Dimension</th>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: '#fdba74' }}>Winner</th>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: '#fdba74' }}>Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Context Selection', 'JARVIS', '6-term QUBO BQM vs top-K heuristic'],
                  ['Retrieval Architecture', 'JARVIS', 'Parallel FTS + ChromaDB + QUBO vs two-tier SQL + pgvector'],
                  ['Conflict Detection', 'CML-MIC', '6-rule deterministic engine vs implicit BQM penalty'],
                  ['Claim Lifecycle', 'CML-MIC', '7-state machine vs flat TTL expiry'],
                  ['Knowledge Extraction', 'CML-MIC', 'LLM-powered (8 types) vs regex (5 types)'],
                  ['Code Dependency', 'JARVIS', '92-node graph + BQM Term 6 vs not addressed'],
                  ['Workspace Tracking', 'JARVIS', 'Git hook + 4hr TTL + 1.3x boost vs not addressed'],
                  ['Scale (live data)', 'JARVIS', '281K chunks operational vs theoretical'],
                  ['Multi-Machine', 'JARVIS', '5 workstations + Tailscale vs single Docker Compose'],
                ].map(([dim, winner, why], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td className="px-3 py-1.5" style={{ color: C.textBright }}>{dim}</td>
                    <td className="px-3 py-1.5" style={{ color: winner === 'JARVIS' ? '#34d399' : '#fbbf24' }}>{winner}</td>
                    <td className="px-3 py-1.5" style={{ color: C.textDim }}>{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUBO Benchmark Config */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBlock title="QUBO Solver Benchmark Suite" color="#fb923c" items={[
            'benchmark_qubo.py — BQM build time, solve time, energy, cache hits',
            'benchmark_suite.py — 6 canonical tasks, SA vs Tabu vs Hybrid comparison',
            'compliance_qubo_benchmark.py — 10-term Hamiltonian, 8 state compliance',
            'retrieval_health.py — 5-target health (CF Worker, ChromaDB, Graph, Workspace, Ollama)',
            '30+ unit tests in qubo/tests/ covering builder, solver, circuit breaker, scheduler',
          ]} />
          <InfoBlock title="Known Issues (from benchmark)" color="#f87171" items={[
            'HIGH: jarvis_schemas HNSW index error ("Nothing found on disk")',
            'HIGH: Full pipeline 0 candidates on some queries',
            'MEDIUM: CF Worker FTS returning 0 results (needs re-index)',
            'LOW: memory_write errors: 3 in dry_run mode',
            'RESOLVED: Embedding model upgraded 384d -> 768d (nomic-embed-text)',
          ]} />
        </div>

        {/* Benchmark Academic Scores */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoBlock title="LOCOMO (Long-term Memory)" color="#fb923c" items={[
            'Adversarial: CML-MIC > JARVIS (no explicit contradiction)',
            'Temporal reasoning: Competitive (BQM Term 4 freshness)',
            'Multi-session: CML-MIC > JARVIS (flat chunk store)',
            'Standard retrieval: JARVIS competitive',
          ]} />
          <InfoBlock title="LongMemEval (Multi-Session)" color="#fb923c" items={[
            'Knowledge update: Competitive (implicit freshness)',
            'Session TTL: CML-MIC (configurable vs fixed 90d)',
            'Cross-session promotion: CML-MIC > JARVIS (no concept)',
            'Basic retrieval: JARVIS competitive',
          ]} />
          <InfoBlock title="BEAM (Extreme Scale)" color="#fb923c" items={[
            'Scale: Both handle 100K-10M tokens',
            'Event ordering: CML-MIC (provenance chain)',
            'Contradiction at scale: CML-MIC (deterministic rules)',
            'Retrieval diversity: JARVIS > CML-MIC (QUBO)',
            'Token optimization: JARVIS > CML-MIC (BQM Term 3)',
          ]} />
        </div>
      </Phase>

      <Arrow />

      {/* ── Infrastructure ─────────────────────────────────── */}
      <Phase label="Infrastructure" color="#94a3b8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBlock title="IRON-PATRIOT (Primary)" color={C.teal} items={[
            ':8104 - MCP SSE Server (Node.js, NSSM)',
            ':7472 - Memory Optimizer (Python/FastAPI, NSSM)',
            'SQLite: entity_graph.db, feedback.db, sessions.db',
            'RTX PRO 6000 96GB, 128GB RAM',
            'MEMORY_OPTIMIZER_URL=http://localhost:7472',
            'Bearer token: jmopt-0KXmkRGO... (MEMORY_OPTIMIZER_API_KEY)',
          ]} />
          <InfoBlock title="SENTINEL (Hot Backup)" color={C.blue} items={[
            ':7472 - Memory Optimizer (same code, synced data)',
            'Ollama host for embeddings (nomic-embed-text 768d)',
            'RTX 5090 32GB, 64GB RAM',
            'Data sync via SCP of SQLite files',
            'OWU :3000 with 199 model routes',
          ]} />
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoBlock title="MCP Server Stack" color={C.green100g} items={[
            '@modelcontextprotocol/sdk ^1.12.1',
            'dotenv ^17.3.1 (env loading)',
            'zod ^3.24.2 (input validation)',
            'Node.js native http (NOT fetch/undici)',
            'launch.mjs wrapper for NSSM service',
            'TIMEOUT_MS = 60s (QUBO can take ~31s)',
            'MAX_RETRIES = 2 (1s, 2s exponential backoff)',
          ]} />
          <InfoBlock title="Monitoring" color={C.orange} items={[
            'Prometheus metrics: /metrics endpoint',
            'Health: /memory/health + /memory/health/deep',
            'Circuit breakers per retrieval source',
            'Rate limiting: 30 req/min token bucket',
            'Request tracing via X-Request-ID',
            'Backpressure: 50 max concurrent, shed at 80%',
          ]} />
          <InfoBlock title="Security" color={C.red} items={[
            'Bearer token auth (mandatory)',
            'JSON serialization (no pickle RCE)',
            'Firewall rules per port per machine',
            'Tailscale mesh networking',
            'NSSM auto-restart on crash',
            'X-Machine-ID header on writes',
          ]} />
        </div>
      </Phase>

      {/* ── Codebase Map ─────────────────────────────────── */}
      <Phase label="Codebase Map" color="#94a3b8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBlock title="jarvis-memory-mcp (Node.js MCP)" color={C.blue} items={[
            'src/index.ts — Main server (stdio + SSE transport)',
            'src/services/memory-api.ts — HTTP client to optimizer',
            'src/tools/optimize.ts — memory_optimize, rag_optimize, rag_context, optimize_chunks',
            'src/tools/recall.ts — memory_recall_interrupt, memory_update_bitmask',
            'src/tools/write.ts — memory_write',
            'src/tools/health.ts — memory_health',
            'launch.mjs — NSSM service wrapper',
          ]} />
          <InfoBlock title="jarvis-memory-api (CF Worker)" color={C.teal} items={[
            'src/index.ts — REST API routes (context, cluster, locks, logs, tasks)',
            'src/types.ts — TypeScript schemas',
            'wrangler.toml — Cloudflare Worker config',
            'Deployed: jarvis-memory-api.kaycha-labs.workers.dev',
            'DB: Supabase (jarvis_memory schema)',
            'Tables: context_store, cluster_state, file_locks, agent_logs, task_specs, task_feedback',
          ]} />
        </div>
      </Phase>

      {/* ── Roadmap ──────────────────────────────────────── */}
      <div className="rounded-xl border p-5" style={{ borderColor: C.accent + '30', background: C.accent + '05' }}>
        <div className="text-[12px] font-semibold mb-3" style={{ color: C.accent }}>ROADMAP (From CML-MIC Benchmark)</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="P0 — Critical" color={C.red} items={[
            'Contradiction detection: adopt CR-01 pair matching from CML-MIC',
            'Prevents serving conflicting context silently',
          ]} />
          <InfoBlock title="P1 — High" color={C.orange} items={[
            'Claim lifecycle states: active/superseded/archived',
            'Structured extraction via LLM (replace regex with qwen3.5-35B)',
            'Higher recall on decision extraction',
          ]} />
          <InfoBlock title="P2 — Medium" color={C.blue} items={[
            'Provenance chain: session -> transcript -> evidence',
            'Dashboard for human conflict resolution',
            'Cross-project promotion workflow',
            'Hybrid architecture: CML-MIC write path + JARVIS read path',
          ]} />
        </div>
      </div>
    </div>
  )
}
