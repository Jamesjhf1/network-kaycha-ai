export const C = {
  warning: '#f59e0b',
  purple: '#a78bfa',
  pink: '#f472b6',
  green100g: '#34d399',
  cyan10g: '#38bdf8',
  accent: '#00d4ff',
  red: '#ef4444',
  blue: '#3b82f6',
  coloGreen: '#10b981',
  textDim: '#94a3b8',
  textBright: '#e2e8f0',
  panel: '#111827',
  border: '#1e293b',
  bg: '#0a0e17',
  amber: '#f59e0b',
  emerald: '#10b981',
}

export interface LocationNetwork {
  router: string
  routerModel: string
  switches: string
  switchCount: number
  accessPoints: string
  apCount: number
  wanIp: string
  lanSubnet: string
  vlanCount: number
  vpnEnabled: boolean
  tailscaleEnabled: boolean
}

export interface LocationISP {
  provider: string
  connectionType: string
  downloadMbps: number
  uploadMbps: number
  staticIp: boolean
  circuitId: string
}

export interface LocationBackup {
  agent: 'nakivo' | 'none' | 'planned'
  qnapTarget: boolean
  lastBackup: string | null
  seedStatus: 'pending' | 'shipped' | 'imported' | 'incremental'
  bandwidthMbps: number
  backupWindow: string
  pcCount: number
  dataEstimateTb: number
}

export interface LocationInventory {
  pcCount: number
  instrumentCount: number
  serverCount: number
  switchCount: number
  upsCount: number
  scannerCoverage: number
}

export interface LocationPower {
  upsCount: number
  totalCapacityVa: number
  protectedDevices: number
}

export interface LocationContact {
  primaryName: string
  primaryEmail: string
  primaryPhone: string
}

export interface KaychaLocation {
  id: string
  code: string
  name: string
  city: string
  state: string
  siteType: 'lab' | 'hq' | 'colo'
  lat: number
  lng: number
  network: LocationNetwork
  isp: LocationISP
  backup: LocationBackup
  inventory: LocationInventory
  power: LocationPower
  contacts: LocationContact
}

export const locations: KaychaLocation[] = [
  {
    id: 'fl-hq',
    code: 'FL',
    name: 'Kaycha HQ & Lab',
    city: 'Miramar',
    state: 'Florida',
    siteType: 'hq',
    lat: 25.98,
    lng: -80.23,
    network: {
      router: 'EdgeRouter 4',
      routerModel: 'Ubiquiti ER-4',
      switches: 'TBD',
      switchCount: 4,
      accessPoints: 'TBD',
      apCount: 6,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 3,
      vpnEnabled: true,
      tailscaleEnabled: true,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fiber',
      downloadMbps: 500,
      uploadMbps: 300,
      staticIp: true,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: '2026-03-21T02:00:00Z',
      seedStatus: 'incremental',
      bandwidthMbps: 0,
      backupWindow: 'Local — no WAN needed',
      pcCount: 35,
      dataEstimateTb: 7,
    },
    inventory: {
      pcCount: 35,
      instrumentCount: 22,
      serverCount: 2,
      switchCount: 4,
      upsCount: 4,
      scannerCoverage: 0,
    },
    power: { upsCount: 4, totalCapacityVa: 12000, protectedDevices: 18 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'co',
    code: 'CO',
    name: 'Kaycha Labs Colorado',
    city: 'Denver',
    state: 'Colorado',
    siteType: 'lab',
    lat: 39.74,
    lng: -104.99,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 3,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fiber',
      downloadMbps: 300,
      uploadMbps: 100,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: '2026-03-21T03:15:00Z',
      seedStatus: 'incremental',
      bandwidthMbps: 50,
      backupWindow: '8PM–6AM full / 50Mbps daytime',
      pcCount: 22,
      dataEstimateTb: 4.4,
    },
    inventory: {
      pcCount: 22,
      instrumentCount: 14,
      serverCount: 1,
      switchCount: 2,
      upsCount: 2,
      scannerCoverage: 0,
    },
    power: { upsCount: 2, totalCapacityVa: 6000, protectedDevices: 10 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'nv',
    code: 'NV',
    name: 'Kaycha Labs Nevada',
    city: 'Las Vegas',
    state: 'Nevada',
    siteType: 'lab',
    lat: 36.17,
    lng: -115.14,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 2,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fiber',
      downloadMbps: 200,
      uploadMbps: 50,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: null,
      seedStatus: 'shipped',
      bandwidthMbps: 50,
      backupWindow: '8PM–6AM full / 50Mbps daytime',
      pcCount: 18,
      dataEstimateTb: 3.6,
    },
    inventory: {
      pcCount: 18,
      instrumentCount: 12,
      serverCount: 0,
      switchCount: 2,
      upsCount: 2,
      scannerCoverage: 0,
    },
    power: { upsCount: 2, totalCapacityVa: 4800, protectedDevices: 8 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'ny',
    code: 'NY',
    name: 'Kaycha Labs New York',
    city: 'Albany',
    state: 'New York',
    siteType: 'lab',
    lat: 42.65,
    lng: -73.76,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 3,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Cable',
      downloadMbps: 300,
      uploadMbps: 35,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: '2026-03-21T04:00:00Z',
      seedStatus: 'incremental',
      bandwidthMbps: 35,
      backupWindow: '8PM–6AM full / 35Mbps daytime',
      pcCount: 20,
      dataEstimateTb: 4.0,
    },
    inventory: {
      pcCount: 20,
      instrumentCount: 15,
      serverCount: 1,
      switchCount: 2,
      upsCount: 2,
      scannerCoverage: 0,
    },
    power: { upsCount: 2, totalCapacityVa: 6000, protectedDevices: 10 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'az',
    code: 'AZ',
    name: 'Kaycha Labs Arizona',
    city: 'Tempe',
    state: 'Arizona',
    siteType: 'lab',
    lat: 33.43,
    lng: -111.94,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 2,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fiber',
      downloadMbps: 250,
      uploadMbps: 75,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: null,
      seedStatus: 'pending',
      bandwidthMbps: 50,
      backupWindow: '8PM–6AM full / 50Mbps daytime',
      pcCount: 16,
      dataEstimateTb: 3.2,
    },
    inventory: {
      pcCount: 16,
      instrumentCount: 10,
      serverCount: 0,
      switchCount: 2,
      upsCount: 2,
      scannerCoverage: 0,
    },
    power: { upsCount: 2, totalCapacityVa: 4800, protectedDevices: 7 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'nj',
    code: 'NJ',
    name: 'Kaycha Labs New Jersey',
    city: 'Riverdale',
    state: 'New Jersey',
    siteType: 'lab',
    lat: 40.99,
    lng: -74.30,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 2,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fiber',
      downloadMbps: 300,
      uploadMbps: 100,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: '2026-03-20T22:30:00Z',
      seedStatus: 'incremental',
      bandwidthMbps: 50,
      backupWindow: '8PM–6AM full / 50Mbps daytime',
      pcCount: 24,
      dataEstimateTb: 4.8,
    },
    inventory: {
      pcCount: 24,
      instrumentCount: 16,
      serverCount: 1,
      switchCount: 2,
      upsCount: 3,
      scannerCoverage: 0,
    },
    power: { upsCount: 3, totalCapacityVa: 7200, protectedDevices: 12 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'md',
    code: 'MD',
    name: 'Kaycha Labs Maryland',
    city: 'Woodlawn',
    state: 'Maryland',
    siteType: 'lab',
    lat: 39.32,
    lng: -76.73,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 2,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Cable',
      downloadMbps: 200,
      uploadMbps: 35,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: null,
      seedStatus: 'shipped',
      bandwidthMbps: 35,
      backupWindow: '8PM–6AM full / 35Mbps daytime',
      pcCount: 15,
      dataEstimateTb: 3.0,
    },
    inventory: {
      pcCount: 15,
      instrumentCount: 10,
      serverCount: 0,
      switchCount: 2,
      upsCount: 2,
      scannerCoverage: 0,
    },
    power: { upsCount: 2, totalCapacityVa: 4800, protectedDevices: 7 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'nc',
    code: 'NC',
    name: 'Kaycha Labs North Carolina',
    city: 'Cherokee',
    state: 'North Carolina',
    siteType: 'lab',
    lat: 35.47,
    lng: -83.31,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 1,
      accessPoints: 'TBD',
      apCount: 2,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fixed Wireless',
      downloadMbps: 100,
      uploadMbps: 20,
      staticIp: false,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: null,
      seedStatus: 'pending',
      bandwidthMbps: 20,
      backupWindow: '8PM–6AM full / 20Mbps daytime',
      pcCount: 12,
      dataEstimateTb: 2.4,
    },
    inventory: {
      pcCount: 12,
      instrumentCount: 8,
      serverCount: 0,
      switchCount: 1,
      upsCount: 1,
      scannerCoverage: 0,
    },
    power: { upsCount: 1, totalCapacityVa: 2400, protectedDevices: 5 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
  {
    id: 'ma',
    code: 'MA',
    name: 'Kaycha Labs Massachusetts',
    city: 'Natick',
    state: 'Massachusetts',
    siteType: 'lab',
    lat: 42.28,
    lng: -71.35,
    network: {
      router: 'TBD',
      routerModel: 'TBD',
      switches: 'TBD',
      switchCount: 2,
      accessPoints: 'TBD',
      apCount: 3,
      wanIp: 'x.x.x.x',
      lanSubnet: '192.168.1.0/24',
      vlanCount: 1,
      vpnEnabled: true,
      tailscaleEnabled: false,
    },
    isp: {
      provider: 'TBD',
      connectionType: 'Fiber',
      downloadMbps: 400,
      uploadMbps: 100,
      staticIp: true,
      circuitId: 'TBD',
    },
    backup: {
      agent: 'nakivo',
      qnapTarget: true,
      lastBackup: '2026-03-21T01:45:00Z',
      seedStatus: 'incremental',
      bandwidthMbps: 50,
      backupWindow: '8PM–6AM full / 50Mbps daytime',
      pcCount: 26,
      dataEstimateTb: 5.2,
    },
    inventory: {
      pcCount: 26,
      instrumentCount: 18,
      serverCount: 1,
      switchCount: 2,
      upsCount: 3,
      scannerCoverage: 0,
    },
    power: { upsCount: 3, totalCapacityVa: 7200, protectedDevices: 12 },
    contacts: {
      primaryName: 'TBD',
      primaryEmail: 'TBD',
      primaryPhone: 'TBD',
    },
  },
]

export const backupInfra = {
  qnap: {
    model: 'TVS-h1674X',
    bays: 12,
    driveModel: 'Seagate IronWolf Pro 20TB',
    driveCapacityTb: 20,
    driveCount: 12,
    raidConfig: 'RAID 6',
    rawTb: 240,
    usableTb: 180,
    driveCostEach: 425,
    unitCost: 3500,
    totalCost: 8600,
  },
  er4: {
    model: 'Ubiquiti EdgeRouter 4',
    wanInterface: 'eth0',
    lanInterface: 'eth1',
    wanSpeedMbps: 300,
    nakivoMaxMbps: 200,
    nakivoPort: 4443,
    qosEnabled: true,
    businessHoursThrottle: '50 Mbps per site',
    afterHoursThrottle: 'Full speed (8PM–6AM)',
  },
  nakivo: {
    product: 'NAKIVO Backup & Replication',
    directorPort: 4443,
    encryptionInFlight: true,
    seedToDevice: true,
    totalPcs: 200,
    totalDataTb: 40,
    seedTimeDays: 12,
    dailyIncrementalTb: 1,
    incrementalWindowHours: 4.5,
  },
}

export function getSeedStatusColor(status: string): string {
  switch (status) {
    case 'incremental': return C.emerald
    case 'imported': return C.cyan10g
    case 'shipped': return C.amber
    case 'pending': return C.red
    default: return C.textDim
  }
}

export function getSeedStatusLabel(status: string): string {
  switch (status) {
    case 'incremental': return 'LIVE'
    case 'imported': return 'IMPORTED'
    case 'shipped': return 'IN TRANSIT'
    case 'pending': return 'SEED PENDING'
    default: return 'UNKNOWN'
  }
}
