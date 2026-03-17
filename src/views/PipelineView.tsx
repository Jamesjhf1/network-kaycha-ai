import { C } from '../constants/colors'

/* ── Reusable sub-components ─────────────────────────────── */

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

function WideNode({ icon, title, detail, file, variant }: {
  icon: string; title: string; detail: string; file?: string
  variant: keyof typeof nodeColors
}) {
  return <div className="min-w-[240px] max-w-[320px]"><Node icon={icon} title={title} detail={detail} file={file} variant={variant} /></div>
}

const nodeColors = {
  user:     { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)',  title: '#c4b5fd' },
  prd:      { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', title: '#93c5fd' },
  bridge:   { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', title: '#fcd34d' },
  qubo:     { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', title: '#6ee7b7' },
  dispatch: { bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.35)',title: '#fca5a5' },
  test:     { bg: 'rgba(244,114,182,0.12)',border: 'rgba(244,114,182,0.35)',title: '#f9a8d4' },
  feedback: { bg: 'rgba(253,186,116,0.12)',border: 'rgba(253,186,116,0.35)',title: '#fdba74' },
  heal:     { bg: 'rgba(167,139,250,0.12)',border: 'rgba(167,139,250,0.35)',title: '#c4b5fd' },
  memory:   { bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.35)', title: '#5eead4' },
  discord:  { bg: 'rgba(129,140,248,0.12)',border: 'rgba(129,140,248,0.35)',title: '#a5b4fc' },
  muted:    { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', title: '#94a3b8' },
  cicd:     { bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.35)', title: '#fb7185' },
  autofix:  { bg: 'rgba(251,146,60,0.15)',border: 'rgba(251,146,60,0.4)', title: '#fdba74' },
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

function Sub({ children, highlight }: { children: React.ReactNode; highlight?: string }) {
  const style = highlight
    ? { background: highlight + '08', border: `1px solid ${highlight}20`, borderRadius: 8, padding: '8px 12px' }
    : {}
  return <div className="text-[10px] text-center py-1" style={{ color: C.textDim, ...style }}>{children}</div>
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

function BranchColumn({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-semibold" style={{ color }}>{label}</span>
      {children}
    </div>
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

/* ── Legend ───────────────────────────────────────────────── */

const legendItems = [
  { color: '#8b5cf6', label: 'User Input' },
  { color: '#60a5fa', label: 'PRD Factory' },
  { color: '#fbbf24', label: 'Bridge / Routing' },
  { color: '#34d399', label: 'QUBO Engine' },
  { color: '#f87171', label: 'Dispatch / Workers' },
  { color: '#f472b6', label: 'Testing' },
  { color: '#fb923c', label: 'Feedback / Autofix' },
  { color: '#a78bfa', label: 'Self-Healing' },
  { color: '#2dd4bf', label: 'Memory Layer' },
  { color: '#f43f5e', label: 'CI/CD Pipeline' },
]

/* ── Main Component ──────────────────────────────────────── */

export function PipelineView() {
  return (
    <div className="space-y-2 max-w-[1400px] mx-auto">
      {/* Title */}
      <div className="text-center pb-2">
        <h2 className="text-xl font-bold">
          <span style={{ color: C.blue }}>PRD Factory</span>
          {' + '}
          <span style={{ color: C.blue }}>JARVIS-OPS</span>
          {' Pipeline'}
        </h2>
        <p className="text-xs mt-1" style={{ color: C.textDim }}>
          Autonomous SDLC: PRD Generation &rarr; QUBO Optimization &rarr; Multi-Agent Execution &rarr; Autofix Loop &rarr; Self-Healing &rarr; CI/CD
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-5 flex-wrap pb-3">
        {legendItems.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-[11px]" style={{ color: C.textDim }}>
            <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* ── PHASE 1 ─────────────────────────────────────── */}
      <Phase label="Phase 1 — User Input" color={C.purple}>
        <HFlow>
          <Node icon="👤" title="User / CEO" detail="Describes product idea, feature request, or problem statement" variant="user" />
          <HArrow />
          <Node icon="📝" title="PRD Factory Web App" detail="Standalone SaaS app for PRD creation. State machine with 10 states: DRAFT → FINALIZED" file="PRD_FACTORY/apps/workers/src/" variant="prd" />
        </HFlow>
      </Phase>

      <Arrow />

      {/* ── PHASE 2 ─────────────────────────────────────── */}
      <Phase label="Phase 2 — PRD Generation (AI-Driven)" color={C.blue}>
        <HFlow>
          <Node icon="🤖" title="AI Research Agent" detail="Gathers context: market research, technical constraints, competitive analysis" file="research_results table" variant="prd" />
          <HArrow />
          <Node icon="📄" title="PRD Generator" detail="Section-by-section generation of 8 PRD sections with sliding 2-section context window" file="prd-generator.ts" variant="prd" />
          <HArrow />
          <Node icon="✅" title="State Machine" detail="10 states with optimistic concurrency. DRAFT → RESEARCHING → GENERATING → REVIEW → FINALIZED" file="state-machine.ts" variant="prd" />
        </HFlow>
        <Sub>8 PRD Sections: executive_summary, problem_statement, goals, user_stories, technical_architecture, data_model, api_design, glossary</Sub>
      </Phase>

      <Arrow />

      {/* ── PHASE 3 ─────────────────────────────────────── */}
      <Phase label="Phase 3 — PRD-to-Task Bridge" color={C.warning}>
        <HFlow>
          <Node icon="📦" title="Finalized PRD" detail="Complete PRD document with all 8 sections, stored in PRD Factory Supabase" file="projects + outputs tables" variant="prd" />
          <HArrow />
          <Node icon="🔗" title="PRD Bridge" detail="importProject() reads PRD, creates pm_project + pm_tasks in KaychaExec with rollback support" file="bridge/prd-bridge.ts (306 lines)" variant="bridge" />
          <HArrow />
          <Node icon="📋" title="KaychaExec PM" detail="pm_projects + pm_tasks created with status BACKLOG. Tasks linked to PRD source." file="Supabase: wqvdwngeewtuqcqtdhfd" variant="bridge" />
        </HFlow>
        <Sub>Bridge endpoint: POST /bridge/prd/import · Rollback on failure · pm_tasks status values are UPPERCASE</Sub>
      </Phase>

      <Arrow />

      {/* ── PHASE 4 ─────────────────────────────────────── */}
      <Phase label="Phase 4 — Task Preparation (Claude Haiku)" color={C.warning}>
        <HFlow>
          <Node icon="📚" title="Raw pm_tasks" detail="Title + description from PRD decomposition. Need enrichment before dispatch." variant="bridge" />
          <HArrow />
          <WideNode icon="⚡" title="/api/tasks/prepare (Claude Haiku)" detail="Enriches each task with: execution_backend (worker target), prompt template, acceptance_criteria, estimated complexity, file targets" file="DecomposeClient in bridge/" variant="bridge" />
          <HArrow />
          <Node icon="🚀" title="Prepared task_specs" detail="Ready for QUBO scheduling. Stored in jarvis_ops.tasks with metadata + acceptance criteria" file="Supabase: uzsjtgxnfaggdzjnxlst" variant="bridge" />
        </HFlow>
      </Phase>

      {/* Arrow + cycle badge */}
      <div className="flex justify-center items-center gap-4 py-1.5">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="w-0 h-0" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid rgba(255,255,255,0.3)' }} />
        </div>
        <Badge color={C.green100g}>🔄 Every 5 minutes (APScheduler)</Badge>
      </div>

      {/* ── PHASE 5 ─────────────────────────────────────── */}
      <Phase label="Phase 5 — QUBO Decision Engine (5-Min Cycle)" color={C.green100g}>
        {/* Steps 1-3 */}
        <HFlow>
          <Node icon="1️⃣" title="Check Test Feedback" detail="Process any pending test results from previous cycle" file="test_feedback.py" variant="qubo" />
          <HArrow />
          <Node icon="2️⃣" title="Fetch Pending Tasks" detail="Query jarvis_ops.tasks WHERE status IN (BACKLOG, TODO, rework)" file="scheduler.py" variant="qubo" />
          <HArrow />
          <Node icon="3️⃣" title="D-Score Semantic Scoring" detail="all-MiniLM-L6-v2 embeddings. Routes: <0.25 → qwen35b, <0.55 → qwen122b, ≥0.55 → claude-opus" file="scorer.py (IP-002)" variant="qubo" />
        </HFlow>
        <div className="h-3" />
        {/* Steps 4-6 */}
        <HFlow>
          <Node icon="4️⃣" title="Build BQM" detail="6-term energy function. 3 binary vars per task (x=dispatch, r=review, t=test). Lambdas: lam1-5 + base priority" file="builder.py" variant="qubo" />
          <HArrow />
          <Node icon="5️⃣" title="Solve (SA + Tabu)" detail="Hybrid SimulatedAnnealing + Tabu solver. 150 num_reads. Solution cache for repeat inputs." file="solver.py (D-Wave Ocean SDK)" variant="qubo" />
          <HArrow />
          <Node icon="6️⃣" title="Interpret Solution" detail="Read binary vars: x=1 → DISPATCH, r=1 → REVIEW, t=1 → TEST, else HOLD/BLOCKED" file="scheduler.py" variant="qubo" />
        </HFlow>
        <div className="mt-2">
          <Sub highlight={C.green100g}>
            <strong style={{ color: '#6ee7b7' }}>BQM Energy Terms:</strong>
            {' lam1: blocked penalty | lam2: queue cap | lam3: divergence review | lam4: test staleness | lam5: rework urgency | base: priority score'}
          </Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 6 ─────────────────────────────────────── */}
      <Phase label="Phase 6 — Dispatch to Workers" color={C.red}>
        <div className="text-center mb-3">
          <div className="inline-block">
            <WideNode icon="📤" title="Dispatcher" detail="5 action types: DISPATCH, REVIEW, TEST, BLOCKED, HOLD. Routes to appropriate worker based on D-Score tier." file="dispatcher.py" variant="dispatch" />
          </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <BranchColumn label="DISPATCH" color={C.red}>
            <Node icon="🤖" title="Claude Code Workers" detail="Complex coding tasks. Multi-file changes. D-Score ≥ 0.55" file="worker-main (IRON-PATRIOT) · worker-jericho · worker-sentinel" variant="dispatch" />
            <Node icon="🤖" title="Ollama Workers" detail="D-Score < 0.55: qwen3.5-35b (simple) or qwen3.5-122b (medium). Local GPU on RTX 5090" file="SENTINEL Ollama :11434" variant="dispatch" />
          </BranchColumn>
          <BranchColumn label="REVIEW" color={C.warning}>
            <Node icon="🔍" title="SENTINEL Review" detail="daily-driver LLM (Qwen3.5-35B) code review. Checks acceptance criteria, code quality." file="bridge/reviewer.ts" variant="bridge" />
          </BranchColumn>
          <BranchColumn label="TEST" color={C.pink}>
            <Node icon="🧪" title="HAPPY E2E Worker" detail="Playwright tests. Atomic claim (FOR UPDATE SKIP LOCKED). JSON output parsed by result-reporter.js" file="HAPPY/worker.js + result-reporter.js" variant="test" />
          </BranchColumn>
          <BranchColumn label="HOLD / BLOCKED" color={C.textDim}>
            <Node icon="⏸️" title="Deferred" detail="Task held for next cycle or marked BLOCKED with Discord alert" variant="muted" />
          </BranchColumn>
        </div>

        <div className="mt-2 space-y-0.5">
          <Sub><strong>Machine Topology:</strong> IRON-PATRIOT (orchestrator + worker-main) · JERICHO (worker-jericho) · SENTINEL (worker-sentinel, RTX 5090) · HAPPY (E2E test runner)</Sub>
          <Sub><strong>3-Tier Task Claiming:</strong> worker-targeted → machine-targeted → general pool</Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 7 ─────────────────────────────────────── */}
      <Phase label="Phase 7 — Results Sync + Push" color={C.warning}>
        <HFlow>
          <Node icon="💾" title="Worker Output" detail="Code changes committed + pushed to main. Review verdicts written to jarvis_ops.tasks metadata." variant="dispatch" />
          <HArrow />
          <Node icon="🔄" title="TaskBridge SyncBack" detail="Mirrors status back to KaychaExec pm_tasks. Keeps both DBs in sync." file="bridge/sync-back.ts" variant="bridge" />
          <HArrow />
          <Node icon="💬" title="Discord Notifications" detail="Per-worker channels. Task completion, failures, cycle summaries via webhook." file="Discord Bot Framework" variant="discord" />
        </HFlow>
      </Phase>

      <Arrow />

      {/* ── PHASE 7b ─────────────────────────────────────── */}
      <Phase label="Phase 7b — Post-Push: Docs + Dependency Tree + Test Dispatch" color="#f43f5e">
        <Sub><strong style={{ color: '#fb7185' }}>Trigger:</strong> Worker pushes to main → CI passes → index.yml workflow fires automatically</Sub>
        <div className="mt-2">
          <HFlow>
            <Node icon="📖" title="Doc Generator" detail="Rebuilds API.md, CONFIG.md, SCHEMA.md, ARCHITECTURE.md from source. Commits with [skip ci]." file="doc-generator.ts" variant="cicd" />
            <HArrow />
            <Node icon="🕸️" title="Dependency Tree Update" detail="Incremental graph_ingest — parses imports, updates code_nodes + code_edges in Supabase." file="graph_ingest.py --incremental" variant="cicd" />
            <HArrow />
            <Node icon="🧪" title="Test Dispatch" detail="Classifies changed files, generates e2e_test tasks, dispatches to HAPPY. Deduplicates pending." file="test_orchestrator.py" variant="cicd" />
          </HFlow>
        </div>
        <div className="mt-2">
          <Sub highlight="#f43f5e">
            <strong style={{ color: '#fb7185' }}>This ensures:</strong>
            {' docs are always current, dependency graph reflects latest code, and tests are dispatched for every code change — all before the next QUBO cycle picks up results'}
          </Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 8 ─────────────────────────────────────── */}
      <Phase label="Phase 8 — Test Feedback + Autonomous Fix Loop (IP-007)" color={C.orange}>
        <div className="text-center mb-3">
          <div className="inline-block">
            <WideNode icon="📈" title="test_feedback.py" detail="Processes E2E test results. 4 outcome paths. Autofix agent generates patches on failure. Dual idempotency." variant="feedback" />
          </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <BranchColumn label="PASS" color={C.green100g}>
            <Node icon="✅" title="Mark COMPLETED" detail="Task done. Status → COMPLETED. SyncBack to KaychaExec." variant="qubo" />
          </BranchColumn>
          <BranchColumn label="FAIL → AUTOFIX" color={C.red}>
            <Node icon="🔧" title="AutofixAgent" detail="Classifies failure (import/type/logic/timeout/syntax). Generates fix via qwen3.5:35b → Claude fallback." file="autofix_agent.py" variant="autofix" />
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-3" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="w-0 h-0" style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid rgba(255,255,255,0.2)' }} />
            </div>
            <Node icon="📝" title="Commit to Branch" detail="autofix/<task>-iter<N>. Max 800 LOC patch. File denylist enforced." file="git push autofix/*" variant="autofix" />
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-3" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="w-0 h-0" style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid rgba(255,255,255,0.2)' }} />
            </div>
            <Node icon="🧪" title="Re-test on Happy" detail="TestOrchestrator dispatches targeted re-test. Loop: fix→test→fix up to 3 iterations." file="test_orchestrator.py" variant="test" />
            <Badge color={C.warning}>🔁 Max 3 autofix iterations</Badge>
          </BranchColumn>
          <BranchColumn label="INFRA FAIL" color={C.warning}>
            <Node icon="⚠️" title="Retry (No Count)" detail="Infrastructure failure (network, timeout). Max 5 infra retries before BLOCKED." variant="feedback" />
          </BranchColumn>
          <BranchColumn label="ESCALATE" color={C.purple}>
            <Node icon="🚨" title="BLOCKED → Human" detail="Autofix exhausted or non-auto-fixable (OOM, resource). Discord critical alert." variant="heal" />
          </BranchColumn>
        </div>

        <div className="mt-2 space-y-0.5">
          <Sub highlight={C.orange}>
            <strong style={{ color: '#fdba74' }}>Autonomous Fix Loop:</strong>
            {' test failure → classify → LLM generates patch → commit to branch → re-test on Happy → iterate until clean or escalate'}
          </Sub>
          <Sub><strong>Guardrails:</strong> 3 iteration cap · 800 LOC max patch · file denylist (migrations, .env, CI, secrets) · 500K daily token budget · AUTOFIX_ENABLED kill-switch</Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 9 ─────────────────────────────────────── */}
      <Phase label="Phase 9 — Self-Healing Architecture (Multi-Tier)" color={C.purple}>
        {/* Tier 1: Retry → CB → DLQ */}
        <Sub><strong style={{ color: '#c4b5fd' }}>Tier 1 — Transient Fault Tolerance</strong></Sub>
        <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
          <Node icon="🔁" title="Retry with Backoff" detail="Exponential backoff + jitter. base=1s, max=30s. Prevents thundering herd." variant="heal" />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>on exhaust →</span>
          <Node icon="⚡" title="Circuit Breaker" detail="3-state: CLOSED → OPEN → HALF_OPEN. Threshold: 3 failures. Cooldown: 60s." file="circuit_breaker.py" variant="heal" />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>on exhaust →</span>
          <Node icon="📦" title="Dead Letter Queue" detail="In-memory deque (maxlen=100). Drain-and-stage flush at cycle end. 72h TTL sweep." file="dead_letter.py" variant="heal" />
        </div>

        {/* Tier 2: Component health */}
        <Sub><strong style={{ color: '#c4b5fd' }}>Tier 2 — Component Health Monitoring</strong></Sub>
        <div className="flex justify-center gap-3 flex-wrap mb-3">
          <Node icon="👁️" title="Watchdog Monitor" detail="6-component health: exec_supabase, ops_supabase, bridge, discord, ollama, HAPPY. 30s interval." file="watchdog.py" variant="heal" />
          <Node icon="💓" title="Scheduler Heartbeat" detail="Writes JSON file + Supabase row every cycle. Dual-write: local (supervisor) + remote (monitoring)." file="scheduler_heartbeat table" variant="heal" />
          <Node icon="🛫" title="Preflight Checks" detail="On startup: DB reachable, secrets present, DLQ < threshold. Fail-fast if not." file="scheduler.py" variant="heal" />
          <Node icon="🔒" title="PID File Lock" detail="Prevents dual execution (NSSM service vs child process). Stale PID reclaim on startup." file="qubo/.qubo.pid" variant="heal" />
        </div>

        {/* Tier 3: Supervisor */}
        <Sub><strong style={{ color: '#c4b5fd' }}>Tier 3 — Supervisor ("Who Watches the Watcher?")</strong></Sub>
        <div className="flex justify-center gap-3 flex-wrap">
          <WideNode icon="🏗️" title="WatchdogSupervisor" detail="Separate NSSM service. Checks scheduler heartbeat every 2min. If stale > 7min → NSSM restart. 3 consecutive failures → HARD STOP + critical Discord alert." file="watchdog_supervisor.py" variant="heal" />
          <Node icon="📊" title="QUBO Metrics" detail="Per-cycle structured metrics: decisions, dispatch count, solve time, energy, stall streak." file="qubo_metrics table" variant="heal" />
          <Node icon="🔥" title="Worker Heartbeat" detail="60s interval. Stale > 10min → mark as error. Auto-reclaimed by stale task recovery." variant="heal" />
          <Node icon="💾" title="DLQ + Disk Alert" detail="Supervisor monitors DLQ length (alert > 20 entries) and disk space (alert < 1GB)." variant="heal" />
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 10 ────────────────────────────────────── */}
      <Phase label="Phase 10 — Shared Memory & Learning Loop" color={C.teal}>
        <div className="flex justify-center gap-3 flex-wrap mb-3">
          <Node icon="🧠" title="jarvis_memory Schema" detail="7 tables: context_store, task_specs, file_locks, cluster_state, agent_logs, task_feedback, schema_version" file="Supabase: uzsjtgxnfaggdzjnxlst" variant="memory" />
          <Node icon="📈" title="Memory Optimizer" detail="7-term BQM for knowledge chunk selection: relevance, redundancy, token budget, freshness, source diversity, dependency coupling, contradiction" file="memory_optimizer.py :7472" variant="memory" />
          <Node icon="📐" title="Code Graph" detail="92 nodes, 209 edges. 8 RPC functions. BQM Term 6: dependency coupling via expand_for_bqm from code_edges." file="graph_parser.py, graph_ingest.py" variant="memory" />
          <Node icon="🖥️" title="Active Workspace" detail="record_touch + get_active_files. Git post-commit hook. Tracks which files are actively being modified." file="workspace_client.py" variant="memory" />
        </div>

        <HFlow>
          <Node icon="📚" title="memory_write" detail="Extracts decisions, error→fix pairs, patterns from session output. Feeds back into knowledge base for future cycles." file="memory_writer.py" variant="memory" />
          <HArrow />
          <Node icon="🌐" title="CF Worker API" detail="17 endpoints. Bearer auth. jarvis-memory-api.kaycha-labs.workers.dev" variant="memory" />
          <HArrow />
          <Node icon="🔭" title="RAG Collections" detail="7 collections: schemas, code, documents, knowledge, regulations, financial, legal. ChromaDB vectors." file="jarvis-rag SSE :8101" variant="memory" />
        </HFlow>

        <div className="mt-2">
          <Sub highlight={C.teal}>
            <strong style={{ color: '#5eead4' }}>Learning Loop:</strong>
            {' Every task execution → memory_write extracts decisions & patterns → stored in jarvis_memory → future QUBO cycles benefit from accumulated knowledge via rag_optimize / memory_optimize'}
          </Sub>
        </div>
      </Phase>

      {/* ── Summary Stats ────────────────────────────────── */}
      <div className="flex justify-center gap-3 flex-wrap pt-4">
        <StatCard value="11" label="Pipeline Phases" color={C.blue} />
        <StatCard value="7" label="Intellectual Property" color={C.green100g} />
        <StatCard value="5" label="Action Types" color={C.red} />
        <StatCard value="5" label="Worker Machines" color={C.warning} />
        <StatCard value="3" label="Self-Heal Tiers" color={C.purple} />
        <StatCard value="0" label="Human Required" color={C.teal} />
      </div>

      {/* Footer */}
      <div className="text-center pt-6 pb-2 text-[11px]" style={{ color: '#475569' }}>
        JARVIS-OPS Autonomous SDLC Pipeline · Kaycha Labs · March 2026 · IP-001 through IP-007
      </div>
    </div>
  )
}
