/**
 * Testing Stats — Data layer for TestingView
 *
 * Mirrors the output schema of kaycha-tests/lib/json-summary-reporter.js.
 * Update these numbers after CI runs or spec additions.
 * Eventually this will be auto-populated from test-summary.json.
 */

/* ── Types ────────────────────────────────────────────────── */

export interface AppTestStats {
  name: string
  displayName: string
  url: string
  authMode: 'localStorage' | 'cookie'
  specFiles: number
  categories: string[]
}

export interface CategoryStats {
  id: string
  label: string
  group: 'functional' | 'security' | 'performance' | 'quality'
  icon: string
  testCount: number
  description: string
}

export interface CIConfig {
  parallelJobs: number
  browsers: string[]
  viewports: { name: string; width: number; height: number }[]
  workers: number
  retries: { local: number; ci: number }
  timeout: number
  nodeVersion: string
  pnpmVersion: string
  runner: string
  artifactRetention: { reports: number; results: number }
  envVarCount: number
  repoUrl: string
  workflowFile: string
}

export interface TestSummary {
  /** ISO timestamp of last known summary generation */
  lastUpdated: string
  /** Overall totals */
  totals: {
    specFiles: number
    tests: number
    categories: number
    apps: number
  }
  apps: AppTestStats[]
  categories: CategoryStats[]
  ci: CIConfig
  /** Per-app × per-category spec file presence (true = file exists) */
  coverageMatrix: Record<string, Record<string, boolean>>
}

/* ── App Definitions ──────────────────────────────────────── */

const APPS: AppTestStats[] = [
  {
    name: 'crm',
    displayName: 'CRM',
    url: 'crm.kaycha.ai',
    authMode: 'localStorage',
    specFiles: 17,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
      /* app-specific */ 'accounts', 'contacts', 'opportunities', 'admin', 'portal',
    ],
  },
  {
    name: 'exec',
    displayName: 'Exec',
    url: 'exec.kaycha.ai',
    authMode: 'localStorage',
    specFiles: 17,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
      /* app-specific */ 'dashboard', 'projects', 'tickets', 'manual', 'pm-modules',
    ],
  },
  {
    name: 'hr',
    displayName: 'HR',
    url: 'hr.kaycha.ai',
    authMode: 'cookie',
    specFiles: 17,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
      /* app-specific */ 'pages', 'people', 'all-routes', 'admin', 'portal',
    ],
  },
  {
    name: 'logistics',
    displayName: 'Logistics',
    url: 'logistics.kaycha.ai',
    authMode: 'localStorage',
    specFiles: 17,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
      /* app-specific */ 'dashboard', 'pages', 'trips', 'vehicles', 'mobile',
    ],
  },
  {
    name: 'devhub',
    displayName: 'DevHub',
    url: 'devhub.kaycha.ai',
    authMode: 'localStorage',
    specFiles: 14,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
      /* app-specific */ 'posts', 'snippets',
    ],
  },
  {
    name: 'nodeplus',
    displayName: 'NodePlus',
    url: 'nodeplus.ai',
    authMode: 'cookie',
    specFiles: 12,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
    ],
  },
  {
    name: 'contracts',
    displayName: 'Contracts',
    url: 'contracts.kaycha.ai',
    authMode: 'cookie',
    specFiles: 12,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
    ],
  },
  {
    name: 'prd',
    displayName: 'PRD Factory',
    url: 'prdfactory.com',
    authMode: 'cookie',
    specFiles: 12,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
    ],
  },
  {
    name: 'kaychaai',
    displayName: 'Kaycha.AI',
    url: 'kaycha.ai',
    authMode: 'cookie',
    specFiles: 12,
    categories: [
      'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
      'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
    ],
  },
]

/* ── 16 Standard Categories ───────────────────────────────── */

const CATEGORIES: CategoryStats[] = [
  { id: 'auth',          label: 'Auth',           group: 'functional',  icon: '🔐', testCount: 9,  description: 'Login, session persistence, magic link, logout' },
  { id: 'crud',          label: 'CRUD',           group: 'functional',  icon: '📝', testCount: 9,  description: 'Create, read, update, delete lifecycle (API-first)' },
  { id: 'rbac',          label: 'RBAC',           group: 'security',    icon: '🛡️', testCount: 9,  description: 'Per-role access verification, permission guards' },
  { id: 'routes',        label: 'Routes',         group: 'functional',  icon: '🧭', testCount: 9,  description: 'Sidebar nav, page rendering, content assertions' },
  { id: 'negative',      label: 'Negative',       group: 'functional',  icon: '🚫', testCount: 9,  description: 'Invalid inputs, boundary conditions, error handling' },
  { id: 'journey',       label: 'Journey',        group: 'functional',  icon: '🗺️', testCount: 9,  description: 'Multi-step user workflows, end-to-end flows' },
  { id: 'search',        label: 'Search',         group: 'functional',  icon: '🔍', testCount: 9,  description: 'Search, filtering, sort, pagination' },
  { id: 'features',      label: 'Features',       group: 'functional',  icon: '✨', testCount: 9,  description: 'App-specific feature interactions, UI components' },
  { id: 'api-intercept', label: 'API Intercept',  group: 'functional',  icon: '📡', testCount: 9,  description: 'Network request interception, response validation' },
  { id: 'visual',        label: 'Visual',         group: 'quality',     icon: '📸', testCount: 9,  description: 'Screenshot regression, visual baseline comparison' },
  { id: 'responsive',    label: 'Responsive',     group: 'quality',     icon: '📱', testCount: 11, description: 'Mobile/tablet viewports, touch targets, overflow' },
  { id: 'a11y',          label: 'Accessibility',  group: 'quality',     icon: '♿', testCount: 9,  description: 'WCAG 2.1 AA via axe-core, landmark/aria checks' },
  { id: 'edge-cases',    label: 'Edge Cases',     group: 'quality',     icon: '🧪', testCount: 9,  description: 'Unicode, pagination, empty states, concurrent ops' },
  { id: 'perf',          label: 'Performance',    group: 'performance', icon: '⚡', testCount: 4,  description: 'Web Vitals, TTFB, LCP, CLS, resource counts, memory' },
  { id: 'security',      label: 'Security',       group: 'security',    icon: '🔒', testCount: 3,  description: 'CSP/HSTS headers, session handling, XSS/SQLi payloads' },
  { id: 'resilience',    label: 'Resilience',     group: 'performance', icon: '🔄', testCount: 2,  description: 'Offline mode, network errors, 429 rate limiting' },
]

/* ── CI Configuration ─────────────────────────────────────── */

const CI: CIConfig = {
  parallelJobs: 11,
  browsers: ['Chromium', 'Firefox', 'WebKit'],
  viewports: [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 },
  ],
  workers: 3,
  retries: { local: 0, ci: 1 },
  timeout: 30,
  nodeVersion: '20',
  pnpmVersion: '9',
  runner: 'ubuntu-latest',
  artifactRetention: { reports: 14, results: 7 },
  envVarCount: 24,
  repoUrl: 'https://github.com/AjaxJackjworworking/kaycha-tests',
  workflowFile: '.github/workflows/e2e.yml',
}

/* ── Coverage Matrix (standard 16 categories × 9 apps) ──── */

const STANDARD_CATEGORIES = [
  'auth', 'crud', 'rbac', 'routes', 'negative', 'journey', 'search',
  'features', 'api-intercept', 'visual', 'a11y', 'edge-cases',
  'responsive', 'perf', 'security', 'resilience',
]

function buildCoverageMatrix(): Record<string, Record<string, boolean>> {
  const matrix: Record<string, Record<string, boolean>> = {}

  // All 9 apps have the core 12 categories
  for (const app of APPS) {
    matrix[app.name] = {}
    for (const cat of STANDARD_CATEGORIES) {
      // responsive has per-app files for all 9
      // perf, security, resilience are shared (not per-app)
      if (['perf', 'security', 'resilience'].includes(cat)) {
        matrix[app.name][cat] = true // shared cross-app specs
      } else if (cat === 'responsive') {
        matrix[app.name][cat] = true // all 9 have responsive specs
      } else {
        matrix[app.name][cat] = app.categories.includes(cat)
      }
    }
  }

  return matrix
}

/* ── Computed Totals ──────────────────────────────────────── */

const totalSpecFiles = APPS.reduce((sum, a) => sum + a.specFiles, 0)
  + 9  // api (per-app)
  + 4  // perf (baselines, webvitals, resources, memory)
  + 3  // security (headers, session, input)
  + 2  // resilience (network, errors)
  + 11 // responsive (auth, layout, + 9 per-app)

const totalTests = CATEGORIES.reduce((sum, c) => sum + c.testCount, 0)
  // This is spec-file count per category. Actual test count is higher.
  // Use estimated multiplier of ~5 tests per spec file average
const estimatedTotalTests = totalSpecFiles * 5

/* ── Export ────────────────────────────────────────────────── */

export const TESTING_STATS: TestSummary = {
  lastUpdated: '2026-03-14T00:00:00Z',
  totals: {
    specFiles: 159,         // Verified count from kaycha-tests
    tests: 750,             // Approximate from reporter output
    categories: 16,
    apps: 9,
  },
  apps: APPS,
  categories: CATEGORIES,
  ci: CI,
  coverageMatrix: buildCoverageMatrix(),
}

/** Standard 16 categories for matrix display */
export const STANDARD_CATEGORY_IDS = STANDARD_CATEGORIES

/** Group color mapping */
export const GROUP_COLORS: Record<string, string> = {
  functional:  '#34d399',
  security:    '#a78bfa',
  performance: '#fb923c',
  quality:     '#f472b6',
}

/** CI job names for the 11 parallel jobs */
export const CI_JOBS = [
  'Chromium', 'Firefox', 'WebKit', 'Responsive',
  'API', 'Perf', 'Visual', 'A11y',
  'Security', 'Resilience', 'Edge-Cases',
] as const

/** Key pnpm scripts from kaycha-tests/package.json */
export const TEST_SCRIPTS: { cmd: string; description: string }[] = [
  { cmd: 'test:all',        description: 'Run all 9 apps (Chromium)' },
  { cmd: 'test:smoke',      description: 'Quick auth smoke tests (CRM, Exec, DevHub)' },
  { cmd: 'test:ci',         description: 'Full CI mode (all browsers + categories)' },
  { cmd: 'test:full',       description: 'Everything — all suites, all browsers, all modes' },
  { cmd: 'test:crm',        description: 'CRM app — all functional tests' },
  { cmd: 'test:exec',       description: 'Exec app — all functional tests' },
  { cmd: 'test:hr',         description: 'HR app — all functional tests' },
  { cmd: 'test:logistics',  description: 'Logistics app — all functional tests' },
  { cmd: 'test:devhub',     description: 'DevHub app — all functional tests' },
  { cmd: 'test:nodeplus',   description: 'NodePlus app — all functional tests' },
  { cmd: 'test:contracts',  description: 'Contracts app — all functional tests' },
  { cmd: 'test:prd',        description: 'PRD Factory app — all functional tests' },
  { cmd: 'test:kaychaai',   description: 'Kaycha.AI app — all functional tests' },
  { cmd: 'test:firefox',    description: 'Cross-browser — Firefox engine' },
  { cmd: 'test:webkit',     description: 'Cross-browser — WebKit (Safari) engine' },
  { cmd: 'test:responsive', description: 'Mobile + tablet viewport tests' },
  { cmd: 'test:api',        description: 'API request interception tests' },
  { cmd: 'test:visual',     description: 'Screenshot visual regression' },
  { cmd: 'test:visual:update', description: 'Update visual baselines (CI only)' },
  { cmd: 'test:perf',       description: 'Web Vitals, TTFB, memory, resources' },
  { cmd: 'test:a11y',       description: 'WCAG 2.1 AA accessibility audit' },
  { cmd: 'test:security',   description: 'Headers, session, input sanitization' },
  { cmd: 'test:resilience', description: 'Network errors, offline, rate limiting' },
  { cmd: 'test:edge-cases', description: 'Unicode, pagination, concurrent ops' },
  { cmd: 'test:ai-visual',  description: 'AI visual validation (Ollama llava:13b)' },
  { cmd: 'test:ai-visual:update', description: 'Update AI visual baselines' },
  { cmd: 'generate:test',   description: 'NLP→Playwright spec generator (Claude API)' },
  { cmd: 'analyze:coverage', description: 'AI coverage gap analysis (all 9 apps)' },
  { cmd: 'analyze:flakiness', description: 'Flakiness pattern analyzer with AI root cause' },
  { cmd: 'test:report',     description: 'Open last HTML report in browser' },
]
