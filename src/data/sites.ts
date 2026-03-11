export type SiteId = 'boca-lab' | 'boca-colo' | 'atlanta' | 'remote-wm' | 'remote-happy'

export interface Site {
  id: SiteId
  label: string
  subtitle: string
  nodeIds: string[]
  colorKey: string
  location: string
}

export const SITES: Record<SiteId, Site> = {
  'boca-lab': {
    id: 'boca-lab',
    label: 'Boca Raton Lab',
    subtitle: '8 nodes • 3 switches • 100GbE AI Fabric',
    nodeIds: ['ironman', 'sentinel', 'ironpatriot', 'jericho', 'ms510txup', 'sn2100', 'gs752tpv2', 'er4'],
    colorKey: 'cyan10g',
    location: 'Boca Raton, FL',
  },
  'boca-colo': {
    id: 'boca-colo',
    label: 'Boca Raton Colo',
    subtitle: '3 servers • Revelex 6405 Congress Ave',
    nodeIds: ['jarvis', 'starkindustries', 'malibu'],
    colorKey: 'coloGreen',
    location: 'Boca Raton, FL (Colo)',
  },
  'atlanta': {
    id: 'atlanta',
    label: 'Atlanta Cloud',
    subtitle: '1 server • Primary Production',
    nodeIds: ['starktower'],
    colorKey: 'webPurple',
    location: 'Atlanta, GA',
  },
  'remote-wm': {
    id: 'remote-wm',
    label: 'War-Machine (Remote)',
    subtitle: "1 workstation • Jeremy's Dev",
    nodeIds: ['warmachine'],
    colorKey: 'blue',
    location: 'Remote',
  },
  'remote-happy': {
    id: 'remote-happy',
    label: 'Happy (Remote)',
    subtitle: '1 desktop • E2E Test Runner',
    nodeIds: ['happy'],
    colorKey: 'textDim',
    location: 'Remote',
  },
}

export const SITE_LIST: Site[] = Object.values(SITES)
