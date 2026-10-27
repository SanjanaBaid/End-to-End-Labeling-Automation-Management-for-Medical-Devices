import { CHANGE, FINDINGS, TOTAL_LABELS, score } from '../data.js'

export default function Dashboard({ s, go }) {
  const steps = [
    ['Change intake', 'Request structured', true],
    ['Impact engine', s.analysed ? TOTAL_LABELS + ' labels found' : 'Not analysed yet', s.analysed],
    ['GenAI authoring', s.analysed ? 'Drafts ready' : 'Waiting', s.analysed],
    ['Self-validation', s.checked ? 'Checks complete' : 'Not run yet', s.checked],
    ['Human approval', s.approved ? 'Signed off' : 'Awaiting sign-off', s.approved],
    ['Release and audit', s.approved ? 'Released' : 'Locked until approval', s.approved],
  ]
  const next = !s.analysed ? ['impact', 'Analyse the impact'] : !s.approved ? ['validate', 'Draft and validate'] : ['approve', 'View audit trail']
  const open = FINDINGS.length - s.fixed.length
  return (
    <>
      <h1>Good morning, labeling team</h1>
      <p className="lead">One open change request. LabelGuard finds what it affects, checks every label, and keeps a person in charge of the final release.</p>
      <div className="card hero">
        <div>
          <div className="muted">{CHANGE.id} - {CHANGE.product}</div>
          <h2>{CHANGE.text}</h2>
        </div>
        <button className="btn org" onClick={() => go(next[0])}>{next[1]}</button>
      </div>
      <div className="kpis">
        <div className="card kpi"><b>{s.analysed ? TOTAL_LABELS : '-'}</b><span>labels affected</span></div>
        <div className="card kpi"><b>{s.checked ? open : '-'}</b><span>open findings</span></div>
        <div className="card kpi"><b>{s.checked ? score(s.fixed) : '-'}</b><span>label risk score</span></div>
        <div className="card kpi"><b>{s.approved ? 'Released' : 'In progress'}</b><span>release status</span></div>
      </div>
      <div className="card">
        <h3>Where this change is in the pipeline</h3>
        <div className="flow">
          {steps.map(([n, d, done], i) => (
            <div key={n} className={'stp' + (done ? ' done' : '')}>
              <span className="dot">{done ? '\u2713' : i + 1}</span>
              <strong>{n}</strong>
              <small>{d}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
