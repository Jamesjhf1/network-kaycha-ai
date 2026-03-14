import { useState } from 'react'
import { C } from '../constants/colors'
import {
  TESTING_STATS,
  STANDARD_CATEGORY_IDS,
  GROUP_COLORS,
  CI_JOBS,
  TEST_SCRIPTS,
} from '../data/testing-stats'
import type { CategoryStats } from '../data/testing-stats'

const S = TESTING_STATS

/* ── Reusable sub-components ─────────────────────────────── */

function Phase({
  label, color, children, defaultOpen = true,
}: {
  label: string; color: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="relative rounded-xl border" style={{ borderColor: color + '30' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-5 py-2.5 text-left cursor-pointer rounded-xl transition-colors"
        style={{ background: open ? 'transparent' : color + '06' }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-widest flex-1"
          style={{ color }}
        >
          {label}
        </span>
        <span className="text-[11px]" style={{ color: C.textDim }}>
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
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
  plan:     { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.35)',  title: '#93c5fd' },
  author:   { bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.4)',   title: '#c4b5fd' },
  infra:    { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.35)',  title: '#fcd34d' },
  execute:  { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  title: '#6ee7b7' },
  report:   { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.35)', title: '#f9a8d4' },
  ci:       { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', title: '#fca5a5' },
  guard:    { bg: 'rgba(253,186,116,0.12)', border: 'rgba(253,186,116,0.35)', title: '#fdba74' },
  observe:  { bg: 'rgba(45,212,191,0.12)',  border: 'rgba(45,212,191,0.35)',  title: '#5eead4' },
  muted:    { bg: 'rgba(100,116,139,0.1)',  border: 'rgba(100,116,139,0.3)',  title: '#94a3b8' },
  category: { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.35)', title: '#c4b5fd' },
  ai:       { bg: 'rgba(129,140,248,0.15)', border: 'rgba(129,140,248,0.4)',  title: '#a5b4fc' },
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
  { color: '#60a5fa', label: 'Planning' },
  { color: '#8b5cf6', label: 'Authoring' },
  { color: '#fbbf24', label: 'Infrastructure' },
  { color: '#34d399', label: 'Execution' },
  { color: '#f472b6', label: 'Reporting' },
  { color: '#f87171', label: 'CI / CD' },
  { color: '#fb923c', label: 'Quality Gates' },
  { color: '#2dd4bf', label: 'Observability' },
  { color: '#818cf8', label: 'AI / ML' },
]

/* ── Category Card ────────────────────────────────────────── */

function CategoryCard({ cat }: { cat: CategoryStats }) {
  const color = GROUP_COLORS[cat.group]
  return (
    <div
      className="rounded-lg border p-2.5 flex items-start gap-2 min-w-[190px]"
      style={{ borderColor: color + '25', background: color + '08' }}
    >
      <span className="text-base flex-shrink-0">{cat.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold" style={{ color }}>{cat.label}</span>
          <span className="text-[10px] font-mono" style={{ color: C.textDim }}>
            {cat.testCount} {cat.testCount === 1 ? 'spec' : 'specs'}
          </span>
        </div>
        <div className="text-[9.5px] mt-0.5 leading-snug" style={{ color: C.textDim }}>
          {cat.description}
        </div>
      </div>
    </div>
  )
}

/* ── App × Category Coverage Matrix ──────────────────────── */

function CoverageMatrix() {
  const apps = S.apps
  const cats = STANDARD_CATEGORY_IDS
  const matrix = S.coverageMatrix

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[10px] border-collapse">
        <thead>
          <tr>
            <th className="text-left py-1 px-2 font-semibold" style={{ color: C.textDim }}>Category</th>
            {apps.map(a => (
              <th key={a.name} className="py-1 px-1.5 font-semibold text-center" style={{ color: C.textBright }}>
                {a.displayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cats.map(catId => {
            const catDef = S.categories.find(c => c.id === catId)
            const color = catDef ? GROUP_COLORS[catDef.group] : C.textDim
            return (
              <tr key={catId} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td className="py-1 px-2 font-medium" style={{ color }}>
                  {catDef?.icon} {catDef?.label ?? catId}
                </td>
                {apps.map(a => {
                  const has = matrix[a.name]?.[catId]
                  return (
                    <td key={a.name} className="py-1 px-1.5 text-center">
                      {has
                        ? <span className="inline-block w-3 h-3 rounded-sm" style={{ background: color + '60' }} />
                        : <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="text-[9px] text-center mt-2" style={{ color: C.textDim }}>
        Filled = spec file exists for that app × category combination
      </div>
    </div>
  )
}

/* ── CI Jobs Grid ─────────────────────────────────────────── */

function CIJobsGrid() {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {CI_JOBS.map(job => (
        <div
          key={job}
          className="rounded border px-2.5 py-1.5 text-[10px] font-medium"
          style={{ borderColor: C.red + '30', background: C.red + '08', color: '#fca5a5' }}
        >
          {job}
        </div>
      ))}
    </div>
  )
}

/* ── Script Reference ─────────────────────────────────────── */

function ScriptPanel() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? TEST_SCRIPTS : TEST_SCRIPTS.slice(0, 8)

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: C.teal + '30' }}>
      <div className="text-[11px] font-semibold mb-3" style={{ color: C.teal }}>
        TEST SCRIPTS ({TEST_SCRIPTS.length} commands)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {visible.map(s => (
          <div key={s.cmd} className="flex items-baseline gap-2 py-0.5">
            <code className="text-[9.5px] font-mono flex-shrink-0" style={{ color: C.teal }}>{s.cmd}</code>
            <span className="text-[9px]" style={{ color: C.textDim }}>{s.description}</span>
          </div>
        ))}
      </div>
      {TEST_SCRIPTS.length > 8 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-[10px] font-medium cursor-pointer"
          style={{ color: C.teal }}
        >
          {expanded ? 'Show less ▴' : `Show all ${TEST_SCRIPTS.length} scripts ▾`}
        </button>
      )}
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────── */

export function TestingView() {
  return (
    <div className="space-y-2 max-w-[1400px] mx-auto">
      {/* Title */}
      <div className="text-center pb-2">
        <h2 className="text-xl font-bold">
          <span style={{ color: C.blue }}>E2E Testing</span>
          {' '}
          <span style={{ color: C.textBright }}>Process &amp; Architecture</span>
        </h2>
        <p className="text-xs mt-1" style={{ color: C.textDim }}>
          Playwright-based end-to-end testing pipeline: fixture-driven, cross-browser, CI-integrated, AI-augmented
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

      {/* ── Summary Stats (data-driven) ──────────────────── */}
      <div className="flex justify-center gap-3 flex-wrap pb-3">
        <StatCard value={`${S.totals.tests}+`} label="Total Tests" color={C.green100g} />
        <StatCard value={String(S.totals.specFiles)} label="Spec Files" color={C.blue} />
        <StatCard value={String(S.ci.parallelJobs)} label="CI Jobs" color={C.red} />
        <StatCard value={String(S.ci.browsers.length)} label="Browsers" color={C.orange} />
        <StatCard value={String(S.ci.viewports.length)} label="Viewports" color={C.pink} />
        <StatCard value={String(S.totals.categories)} label="Categories" color={C.purple} />
        <StatCard value={String(S.totals.apps)} label="Apps" color={C.teal} />
      </div>

      {/* ── PHASE 1 — Test Planning ──────────────────────── */}
      <Phase label="Phase 1 — Test Planning &amp; Coverage Mapping" color={C.blue}>
        <HFlow>
          <Node icon="🗺️" title="Route Discovery" detail="Automated crawl of live app. Discovers all navigable routes, sidebar links, and admin sub-routes." file="scripts/discover-routes.js" variant="plan" />
          <HArrow />
          <Node icon="📊" title="Coverage Audit" detail="Routes × test types matrix. Identifies gaps: uncovered routes, missing RBAC/CRUD/edge-case tests per app." file="docs/coverage-audit.md" variant="plan" />
          <HArrow />
          <Node icon="📐" title="Dependency Tree" detail="FK relationship DAGs mapped per app. Ensures CRUD tests delete children before parents and seed in correct order." file="docs/dependency-trees.md" variant="plan" />
        </HFlow>
        <Sub>Coverage targets: 100% route coverage, 100% test-type matrix, 66%+ FK edge coverage</Sub>
      </Phase>

      <Arrow />

      {/* ── PHASE 2 — Test Authoring ─────────────────────── */}
      <Phase label="Phase 2 — Test Authoring &amp; Scaffolding" color={C.purple}>
        <div className="text-center mb-3">
          <div className="inline-block">
            <WideNode icon="⚙️" title="Scaffold Generator" detail="CLI tool generates a full test suite from templates. Creates spec files, fixture JSON, and config entries from a single command." file="scripts/generate-tests.js" variant="author" />
          </div>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <BranchColumn label="SPEC TEMPLATES" color={C.purple}>
            <Node icon="📝" title="10 Spec Templates" detail="Auth, routes, CRUD, RBAC, journey, search, negative, API intercept, visual, features — all with {{APP_NAME}} placeholders." file="templates/spec/*.template.js" variant="author" />
          </BranchColumn>
          <BranchColumn label="FIXTURE TEMPLATE" color={C.blue}>
            <Node icon="📦" title="Fixture JSON" detail="Populated from real Supabase data. Contains accounts, entities, search terms, route paths, stage names." file="fixtures/{{app}}.json" variant="plan" />
          </BranchColumn>
          <BranchColumn label="CONFIG WIRING" color={C.orange}>
            <Node icon="🔧" title="Auto-Config" detail="Generator updates playwright.config.js with new project entries and package.json with new test scripts." file="playwright.config.js" variant="infra" />
          </BranchColumn>
        </div>

        <div className="mt-2">
          <Sub highlight={C.purple}>
            <strong style={{ color: '#c4b5fd' }}>Authoring Pattern:</strong>
            {' CommonJS (require/module.exports) · Data-or-empty-state assertions · SPA click-based navigation · Per-role auth with createAuthState(app, role)'}
          </Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 3 — Auth & Data Infrastructure ─────────── */}
      <Phase label="Phase 3 — Auth &amp; Data Infrastructure" color={C.warning}>
        <HFlow>
          <Node icon="🔑" title="Auth Factory" detail="createAuthState(app, role) generates magic link via service_role key, extracts hashed_token, calls verifyOtp to obtain session." file="lib/auth.js" variant="infra" />
          <HArrow />
          <Node icon="💉" title="Session Injection" detail="Two modes: localStorage (addInitScript) for SPA apps, cookie injection (addCookies with @supabase/ssr chunking) for SSR apps." variant="infra" />
          <HArrow />
          <Node icon="🧹" title="Cleanup System" detail="service_role client for test data. [E2E] marker prefix. afterEach deletes entities (FK children first). globalTeardown sweeps all DBs." file="lib/cleanup.js · lib/global-teardown.js" variant="infra" />
        </HFlow>

        <div className="h-3" />

        <HFlow>
          <Node icon="👥" title="Per-Role Users" detail="20+ test users across all apps. Each worker authenticates as a different role to enable parallel execution without magic link races." file="scripts/fix-role-users.js" variant="infra" />
          <HArrow />
          <Node icon="⏱️" title="Session Cache" detail="Module-scope cache with 2-min-early expiry. Prevents redundant magic link generation. Auth retry on expired/invalid tokens." variant="infra" />
          <HArrow />
          <Node icon="🛡️" title="522 Guard" detail="Promise.race timeout pattern. Supabase JS client hangs on Cloudflare 522 instead of throwing — tryAuth() skips tests gracefully." variant="guard" />
        </HFlow>

        <div className="mt-2">
          <Sub>workers: {S.ci.workers} · Per-role test users eliminate auth contention · Session caching minimizes API calls · 522 detection prevents false failures</Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 4 — All 16 Test Categories ─────────────── */}
      <Phase label={`Phase 4 — Test Categories (${S.totals.categories} types)`} color={C.green100g}>
        {/* Group headers + category cards */}
        {(['functional', 'security', 'performance', 'quality'] as const).map(group => {
          const cats = S.categories.filter(c => c.group === group)
          const color = GROUP_COLORS[group]
          return (
            <div key={group} className="mb-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color }}>
                {group} ({cats.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {cats.map(cat => <CategoryCard key={cat.id} cat={cat} />)}
              </div>
            </div>
          )
        })}

        <div className="mt-2 flex justify-center gap-2 flex-wrap">
          <Badge color={GROUP_COLORS.functional}>Functional {S.categories.filter(c => c.group === 'functional').length} categories</Badge>
          <Badge color={GROUP_COLORS.security}>Security {S.categories.filter(c => c.group === 'security').length} categories</Badge>
          <Badge color={GROUP_COLORS.performance}>Performance {S.categories.filter(c => c.group === 'performance').length} categories</Badge>
          <Badge color={GROUP_COLORS.quality}>Quality {S.categories.filter(c => c.group === 'quality').length} categories</Badge>
        </div>
      </Phase>

      <Arrow />

      {/* ── Per-App Coverage Matrix ──────────────────────── */}
      <Phase label={`Coverage Matrix — ${S.totals.apps} Apps × ${S.totals.categories} Categories`} color={C.accent}>
        <CoverageMatrix />

        {/* App summary row */}
        <div className="mt-3 flex justify-center gap-2 flex-wrap">
          {S.apps.map(a => (
            <div
              key={a.name}
              className="rounded border px-2.5 py-1.5 text-center"
              style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="text-[11px] font-semibold" style={{ color: C.textBright }}>{a.displayName}</div>
              <div className="text-[10px]" style={{ color: C.textDim }}>
                {a.specFiles} specs · {a.authMode === 'cookie' ? '🍪 SSR' : '💾 SPA'}
              </div>
              <div className="text-[9px] font-mono mt-0.5" style={{ color: C.textDim }}>{a.url}</div>
            </div>
          ))}
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 5 — Cross-Browser & Viewport Matrix ──── */}
      <Phase label="Phase 5 — Cross-Browser &amp; Viewport Matrix" color={C.red}>
        <div className="flex justify-center gap-3 flex-wrap mb-3">
          <BranchColumn label="CHROMIUM" color={C.green100g}>
            <Node icon="🌐" title="Primary Browser" detail="All test suites run here first. Playwright built-in Chromium engine. CDP access for memory/perf tests." variant="execute" />
          </BranchColumn>
          <BranchColumn label="FIREFOX" color={C.orange}>
            <Node icon="🦊" title="Firefox" detail="Full functional suite. Extra waitForLoadState('networkidle') needed for filter dropdowns." variant="guard" />
          </BranchColumn>
          <BranchColumn label="WEBKIT" color={C.blue}>
            <Node icon="🍎" title="WebKit (Safari)" detail="Full functional suite. Passes without modification. Validates cross-engine compatibility." variant="plan" />
          </BranchColumn>
        </div>

        <div className="h-2" />

        <div className="flex justify-center gap-3 flex-wrap">
          {S.ci.viewports.map(vp => (
            <BranchColumn key={vp.name} label={`${vp.name.toUpperCase()} (${vp.width}×${vp.height})`} color={vp.name === 'Mobile' ? C.pink : vp.name === 'Tablet' ? C.purple : C.teal}>
              <Node
                icon={vp.name === 'Mobile' ? '📱' : vp.name === 'Tablet' ? '📲' : '🖥️'}
                title={`${vp.name} Viewport`}
                detail={
                  vp.name === 'Mobile' ? 'isMobile: true. Touch targets (>24px), horizontal overflow (<115%), text readability (>10px), viewport meta tag.'
                  : vp.name === 'Tablet' ? 'isMobile: false. Layout responsiveness, sidebar collapse/toggle, content reflow, grid breakpoints.'
                  : 'Default viewport. Full sidebar, multi-column layouts, hover interactions, data tables.'
                }
                variant={vp.name === 'Mobile' ? 'report' : vp.name === 'Tablet' ? 'category' : 'observe'}
              />
            </BranchColumn>
          ))}
        </div>

        <div className="mt-2">
          <Sub>{S.ci.browsers.length} browsers × {S.ci.viewports.length} viewports × {S.totals.apps} apps = comprehensive cross-platform coverage · Dedicated responsive test files (not desktop tests at small viewports)</Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 6 — CI Pipeline ────────────────────────── */}
      <Phase label="Phase 6 — CI / CD Integration" color={C.red}>
        <HFlow>
          <Node icon="🔀" title="Trigger" detail="Push to main, pull request, or manual dispatch. GitHub Actions workflow with shared env block for secrets." file={S.ci.workflowFile} variant="ci" />
          <HArrow />
          <WideNode icon="⚡" title={`${S.ci.parallelJobs} Parallel Jobs`} detail={`${CI_JOBS.join(' · ')} — each job caches Playwright browsers independently.`} variant="ci" />
          <HArrow />
          <Node icon="📦" title="Artifacts" detail={`HTML report + failure screenshots/videos uploaded on every run. ${S.ci.artifactRetention.reports}-day retention for reports, ${S.ci.artifactRetention.results}-day for test results.`} variant="ci" />
        </HFlow>

        <div className="h-3" />

        {/* CI Jobs Grid */}
        <CIJobsGrid />

        <div className="h-3" />

        <HFlow>
          <Node icon="🔒" title="Secrets Management" detail={`${S.ci.envVarCount} environment variables for service_role + anon keys across all apps. Set as GitHub Secrets, injected via workflow env block.`} variant="guard" />
          <HArrow />
          <Node icon="🖼️" title="Visual Baselines" detail="Auto-generated on CI (Ubuntu). Linux snapshots created with --update-snapshots when fewer than 5 baselines exist." variant="report" />
          <HArrow />
          <Node icon="📊" title="Custom Reporter" detail="JSON summary with per-app/category stats, perf annotations, warnings, and failure details. Console summary at end of run." file="lib/json-summary-reporter.js" variant="observe" />
        </HFlow>

        <div className="mt-2">
          <Sub highlight={C.red}>
            <strong style={{ color: '#fca5a5' }}>CI Config:</strong>
            {` headless: CI=true · retries: ${S.ci.retries.ci} in CI (${S.ci.retries.local} locally) · workers: ${S.ci.workers} · timeout: ${S.ci.timeout}s · ${S.ci.runner} · pnpm ${S.ci.pnpmVersion} · Node ${S.ci.nodeVersion} · Browser cache by pnpm-lock.yaml hash`}
          </Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 7 — Quality Gates ──────────────────────── */}
      <Phase label="Phase 7 — Quality Gates &amp; Guard Rails" color={C.orange}>
        <div className="flex justify-center gap-3 flex-wrap mb-3">
          <Node icon="🎯" title="Data-or-Empty Assertion" detail="Every test accepts real data OR a valid empty state. Never assumes specific record counts. Resilient to data changes." variant="guard" />
          <Node icon="🧭" title="SPA Navigation" detail="Click-based nav (not page.goto) for single-page apps. JS click to bypass fixed-position element interception." variant="guard" />
          <Node icon="⏳" title="Auth Timeout Guard" detail="Promise.race with 12s timeout on auth injection. Detects 522 hangs and skips test instead of blocking the suite." variant="guard" />
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Node icon="🔄" title="Retry Logic" detail={`Auth retry once on expired/invalid magic link. No test-level retries locally (retries: ${S.ci.retries.local}). CI retries: ${S.ci.retries.ci} for flake tolerance.`} variant="guard" />
          <Node icon="🏷️" title="[E2E] Marker" detail="All test-created data prefixed with [E2E]. globalTeardown sweeps orphaned records from all app databases after suite completion." variant="guard" />
          <Node icon="📏" title="Perf Annotations" detail="Tests annotate perf metrics (load times, LCP, TTFB). Custom reporter collects annotations for trend analysis." variant="observe" />
        </div>

        <div className="h-3" />

        <div className="flex justify-center gap-3 flex-wrap">
          <Node icon="⏳" title="Content-Ready Waits" detail="waitForFunction() body content checks replace flaky networkidle. Sidebar isVisible(timeout:15s) for SPA apps. Eliminates loading spinner false failures." variant="guard" />
          <Node icon="🔬" title="API-Only Verification" detail="CRUD tests use Supabase API fallback when RLS blocks UI visibility of service_role-created records or Netlify 404 blocks SPA deep links." variant="guard" />
          <Node icon="📊" title="Per-App Thresholds" detail="Performance tests use app-specific thresholds (e.g., CRM 80% heap growth vs default 30%). Warm-up navigation + double GC before measurement." variant="observe" />
        </div>

        <div className="mt-2">
          <Sub>Zero false positives by design: 522 guards + content-ready waits + SPA-aware navigation + API verification fallbacks + per-app perf thresholds + cleanup guarantees</Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 8 — Reporting & Observability ──────────── */}
      <Phase label="Phase 8 — Reporting &amp; Observability" color={C.teal}>
        <HFlow>
          <Node icon="📄" title="HTML Report" detail="Playwright's built-in HTML reporter. Interactive, filterable, with screenshots/videos on failure. open: never in headless mode." variant="observe" />
          <HArrow />
          <Node icon="📋" title="List Reporter" detail="Real-time console output during test execution. Shows pass/fail/skip status as tests complete." variant="observe" />
          <HArrow />
          <WideNode icon="📊" title="JSON Summary Reporter" detail="Custom reporter: per-app stats (passed/failed/skipped), per-category breakdown, perf annotations, failure details." file="lib/json-summary-reporter.js → test-summary.json" variant="observe" />
        </HFlow>

        <div className="h-3" />

        <div className="flex justify-center gap-3 flex-wrap">
          <Node icon="📸" title="Failure Artifacts" detail="Screenshots on failure. Video retained on failure. Trace files retained on failure. Uploaded as CI artifacts." variant="report" />
          <Node icon="📈" title="Perf Trend Data" detail="perfAnnotations array in JSON summary. Tracks load times, LCP, TTFB, CLS, FCP across apps over time." variant="observe" />
          <Node icon="⚠️" title="Warning System" detail="perf-warn annotations bubble up to summary. Slow loads, large resources, high CLS flagged automatically." variant="guard" />
        </div>

        <div className="mt-2">
          <Sub highlight={C.teal}>
            <strong style={{ color: '#5eead4' }}>Output Pipeline:</strong>
            {' Playwright test run → 3 reporters (HTML + list + JSON) → CI artifact upload → test-summary.json for dashboards & trend analysis'}
          </Sub>
        </div>
      </Phase>

      <Arrow />

      {/* ── PHASE 9 — AI-Powered Testing Engine ────────── */}
      <Phase label="Phase 9 — AI-Powered Testing Engine" color="#818cf8">
        <div className="flex justify-center gap-3 flex-wrap mb-3">
          <Node icon="🩹" title="Self-Healing Locators" detail="Auto-adapts to UI changes with fallback selector chains. Heal cache remembers successful fallbacks for next run. HealingPage wrapper auto-generates fallbacks from DOM." file="lib/self-healing.js" variant="ai" />
          <Node icon="👁️" title="AI Visual Validation" detail="Perceptual visual comparison via Ollama llava:13b vision model on Sentinel GPU. Goes beyond pixel-diff — understands layout, spacing, and UX regressions." file="lib/ai-visual.js" variant="ai" />
          <Node icon="✍️" title="NLP Test Generator" detail="Plain English descriptions → production-ready Playwright specs via Claude API. Injects fixture data and conventions for accurate code generation." file="scripts/ai-test-generator.js" variant="ai" />
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Node icon="🔎" title="AI Coverage Analyzer" detail="Scans all 9 apps for untested routes, missing categories, role gaps, and low test density. Claude API primary, Ollama qwen3:32b fallback." file="scripts/ai-coverage-analyzer.js" variant="ai" />
          <Node icon="📉" title="Flakiness Analyzer" detail="Ingests test-summary.json runs, categorizes failures (env/timing/auth/data), tracks patterns over time. AI root cause analysis via Ollama." file="lib/flakiness-analyzer.js" variant="ai" />
        </div>

        <div className="h-3" />

        <div className="flex justify-center gap-2 flex-wrap">
          <Badge color="#818cf8">Ollama llava:13b on Sentinel (RTX 5090)</Badge>
          <Badge color="#818cf8">Claude API for code generation</Badge>
          <Badge color="#818cf8">Ollama qwen3:32b for analysis</Badge>
        </div>

        <div className="mt-2">
          <Sub highlight="#818cf8">
            <strong style={{ color: '#a5b4fc' }}>AI Infrastructure:</strong>
            {' Self-healing locators reduce maintenance burden · Vision model catches UX regressions pixel-diff misses · NLP generator accelerates test authoring · Coverage + flakiness analysis closes gaps automatically'}
          </Sub>
        </div>
      </Phase>

      {/* ── Script Reference Panel ────────────────────────── */}
      <div className="mt-4">
        <ScriptPanel />
      </div>

      {/* ── Process Flow Diagram ─────────────────────────── */}
      <div className="mt-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold" style={{ color: C.textBright }}>End-to-End Process Flow</h3>
          <p className="text-[10px] mt-1" style={{ color: C.textDim }}>Complete lifecycle from test creation to CI reporting</p>
        </div>

        <div className="rounded-xl border p-6" style={{ borderColor: C.border, background: 'rgba(255,255,255,0.02)' }}>
          {/* Row 1: Author → Fixture → Auth */}
          <div className="flex items-start justify-center gap-2 flex-wrap">
            <FlowStep step="1" title="Discover Routes" detail="Crawl live app" color={C.blue} />
            <FlowArrow />
            <FlowStep step="2" title="Populate Fixtures" detail="Real DB data → JSON" color={C.blue} />
            <FlowArrow />
            <FlowStep step="3" title="Scaffold Tests" detail="generate-tests.js" color={C.purple} />
            <FlowArrow />
            <FlowStep step="4" title="Customize Specs" detail="App-specific logic" color={C.purple} />
          </div>

          <div className="flex justify-center py-2">
            <div className="w-0.5 h-8" style={{ background: 'rgba(255,255,255,0.15)' }} />
          </div>

          {/* Row 2: Execute */}
          <div className="flex items-start justify-center gap-2 flex-wrap">
            <FlowStep step="5" title="Auth Injection" detail="Magic link → session" color={C.warning} />
            <FlowArrow />
            <FlowStep step="6" title="Run Tests" detail={`${S.ci.workers} workers parallel`} color={C.green100g} />
            <FlowArrow />
            <FlowStep step="7" title="Cross-Browser" detail="Chromium + FF + WK" color={C.red} />
            <FlowArrow />
            <FlowStep step="8" title="Responsive" detail="Mobile + tablet" color={C.pink} />
          </div>

          <div className="flex justify-center py-2">
            <div className="w-0.5 h-8" style={{ background: 'rgba(255,255,255,0.15)' }} />
          </div>

          {/* Row 3: AI + Report */}
          <div className="flex items-start justify-center gap-2 flex-wrap">
            <FlowStep step="9" title="AI Analysis" detail="Self-heal + visual AI" color="#818cf8" />
            <FlowArrow />
            <FlowStep step="10" title="Collect Results" detail="3 reporters" color={C.teal} />
            <FlowArrow />
            <FlowStep step="11" title="Upload Artifacts" detail="HTML + screenshots" color={C.teal} />
            <FlowArrow />
            <FlowStep step="12" title="Cleanup & Summary" detail="[E2E] sweep + JSON" color={C.orange} />
          </div>
        </div>
      </div>

      {/* ── Test Script Anatomy ──────────────────────────── */}
      <div className="mt-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold" style={{ color: C.textBright }}>Test Script Anatomy</h3>
          <p className="text-[10px] mt-1" style={{ color: C.textDim }}>Standard structure every spec file follows</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Structure */}
          <div className="rounded-xl border p-4" style={{ borderColor: C.purple + '30' }}>
            <div className="text-[11px] font-semibold mb-3" style={{ color: C.purple }}>FILE STRUCTURE</div>
            <div className="space-y-2">
              <CodeBlock label="1. IMPORTS" color={C.blue} lines={['require("@playwright/test")', 'require("../../lib/auth")', 'require("../../fixtures/app.json")']} />
              <CodeBlock label="2. SETUP" color={C.warning} lines={['createAuthState(app, role)', 'BASE = fixtures.baseUrl', 'AUTH_TIMEOUT_MS = 12000']} />
              <CodeBlock label="3. LIFECYCLE" color={C.green100g} lines={['beforeEach: injectSession + goto + assertions', 'afterEach: cleanup [E2E] entities (CRUD)', 'afterAll: sweep orphaned records']} />
              <CodeBlock label="4. TEST CASES" color={C.pink} lines={['test("description", async ({ page }) => { ... })', 'data-or-empty-state assertions', 'annotations for perf / skip / data']} />
            </div>
          </div>

          {/* Right: Conventions */}
          <div className="rounded-xl border p-4" style={{ borderColor: C.orange + '30' }}>
            <div className="text-[11px] font-semibold mb-3" style={{ color: C.orange }}>KEY CONVENTIONS</div>
            <div className="space-y-2.5">
              <ConventionRow icon="📁" title="File naming" detail="app-feature.spec.js (e.g., crm-accounts.spec.js)" />
              <ConventionRow icon="🔐" title="Auth pattern" detail="auth.injectSession(page) in beforeEach — never raw passwords" />
              <ConventionRow icon="🧭" title="Navigation" detail="Click-based for SPA routes. JS click to bypass overlapping elements" />
              <ConventionRow icon="✅" title="Assertions" detail="Data-or-empty-state. Every expect() has a descriptive message string" />
              <ConventionRow icon="🏷️" title="Tags" detail="@visual, @a11y, @edge-cases — grep-based test filtering" />
              <ConventionRow icon="⏭️" title="Skipping" detail="test.skip(true, reason) — never silent. 522 guard + feature-gate detection" />
              <ConventionRow icon="🧹" title="Cleanup" detail="[E2E] prefix + FK-aware deletion order + globalTeardown sweep" />
              <ConventionRow icon="📊" title="Annotations" detail="test.info().annotations.push() for perf data and metadata" />
              <ConventionRow icon="🧠" title="Perf measurement" detail="PerformanceObserver setup BEFORE interaction, read AFTER. Double GC + warm-up for heap tests" />
              <ConventionRow icon="🩹" title="Self-healing" detail="createHealingLocator() with fallback chains. .heal-cache.json persists across runs" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer (dynamic date) */}
      <div className="text-center pt-6 pb-2 text-[11px]" style={{ color: '#475569' }}>
        E2E Testing Architecture · Kaycha Labs · Updated {new Date(S.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </div>
    </div>
  )
}

/* ── Flow Diagram Components ────────────────────────────── */

function FlowStep({ step, title, detail, color }: { step: string; title: string; detail: string; color: string }) {
  return (
    <div className="flex flex-col items-center text-center w-[140px]">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-1.5" style={{ background: color + '20', border: `1px solid ${color}40`, color }}>
        {step}
      </div>
      <div className="text-[11px] font-semibold" style={{ color }}>{title}</div>
      <div className="text-[9.5px] mt-0.5" style={{ color: C.textDim }}>{detail}</div>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex items-center pt-2">
      <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
      <div className="w-0 h-0" style={{ borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid rgba(255,255,255,0.3)' }} />
    </div>
  )
}

/* ── Code Block + Convention Row ─────────────────────────── */

function CodeBlock({ label, color, lines }: { label: string; color: string; lines: string[] }) {
  return (
    <div className="rounded border p-2.5" style={{ borderColor: color + '20', background: color + '06' }}>
      <div className="text-[10px] font-semibold mb-1" style={{ color }}>{label}</div>
      {lines.map((line, i) => (
        <div key={i} className="text-[9.5px] font-mono" style={{ color: C.textDim }}>{line}</div>
      ))}
    </div>
  )
}

function ConventionRow({ icon, title, detail }: { icon: string; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-sm flex-shrink-0">{icon}</span>
      <div>
        <span className="text-[11px] font-semibold" style={{ color: C.textBright }}>{title}</span>
        <span className="text-[10px] ml-1.5" style={{ color: C.textDim }}>{detail}</span>
      </div>
    </div>
  )
}
