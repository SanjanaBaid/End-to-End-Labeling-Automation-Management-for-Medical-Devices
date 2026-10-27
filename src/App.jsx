import { useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Impact from './pages/Impact.jsx'
import Validate from './pages/Validate.jsx'
import Approve from './pages/Approve.jsx'

const NAV = [
  ['dash', 'Overview'],
  ['impact', 'Change and impact'],
  ['validate', 'Draft and validate'],
  ['approve', 'Approval and audit'],
]
const PAGES = { dash: Dashboard, impact: Impact, validate: Validate, approve: Approve }
const START = {
  analysed: false, checked: false, fixed: [], approved: false,
  audit: [{ t: '09:12', who: 'Regulatory Affairs', what: 'Created change request CR-2041' }],
}

export default function App() {
  const [page, setPage] = useState('dash')
  const [s, setS] = useState(START)
  const set = (p) => setS((o) => ({ ...o, ...p }))
  const log = (who, what) =>
    setS((o) => ({ ...o, audit: [{ t: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), who, what }, ...o.audit] }))
  const Page = PAGES[page]
  return (
    <div className="app">
      <aside>
        <div className="brand">Label<span>Guard</span></div>
        <div className="sub">Self-validating labeling pipeline</div>
        {NAV.map(([k, name], i) => (
          <button key={k} className={'nav' + (page === k ? ' on' : '')} onClick={() => setPage(k)}>
            <b>{i + 1}</b>{name}
          </button>
        ))}
        <button className="nav reset" onClick={() => { setS(START); setPage('dash') }}>Reset demo</button>
      </aside>
      <main><Page s={s} set={set} log={log} go={setPage} /></main>
    </div>
  )
}
