import { useState } from 'react'
import { PhysicalView } from './views/PhysicalView'
import { LogicalView } from './views/LogicalView'
import { PowerView } from './views/PowerView'

import { FooterStats } from './components/FooterStats'

type Tab = 'physical' | 'logical' | 'power'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'physical', label: 'Physical', icon: '⬡' },
  { id: 'logical', label: 'Logical', icon: '◈' },
  { id: 'power', label: 'Power', icon: '⚡' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('physical')

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Header */}
      <header className="border-b border-border bg-panel/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-accent to-green100g flex items-center justify-center text-bg font-bold text-sm">K</div>
            <div>
              <h1 className="text-sm font-semibold text-textBright tracking-wide">AI LAB NETWORK</h1>
              <p className="text-[10px] text-textDim tracking-widest uppercase">Kaycha Infrastructure</p>
            </div>
          </div>
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'text-textDim hover:text-textBright hover:bg-border/50 border border-transparent'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-6">
          {activeTab === 'physical' && <PhysicalView />}
          {activeTab === 'logical' && <LogicalView />}
          {activeTab === 'power' && <PowerView />}

        </div>
      </main>

      {/* Footer Stats */}
      <FooterStats />
    </div>
  )
}
